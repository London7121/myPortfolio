import type { Middleware } from "@reduxjs/toolkit";
// import { notify } from "../../utils/notify";
import { logout } from "../../store/auth/authSlice";
import { notify } from "../../utils/notifay";

interface RejectedAction {
    type: string;
    payload?: unknown;
    error?: { message?: string; name?: string };
    meta?: {
        arg?: { endpointName?: string; originalArgs?: unknown };
        rejectedWithValue?: boolean;
    };
}

const isRejectedAction = (action: unknown): action is RejectedAction =>
    typeof action === "object" &&
    action !== null &&
    "type" in action &&
    typeof (action as { type: unknown }).type === "string" &&
    (action as { type: string }).type.endsWith("/rejected");

function extractServerMessage(action: RejectedAction): string | undefined {

    const payload = action.payload;

    const possibleMessages: string[] = [];

    if (payload !== undefined && payload !== null) {
        if (typeof payload === "string") {
            possibleMessages.push(payload);
        }

        if (typeof payload === "object") {
            const payloadObj = payload as Record<string, unknown>;
            console.log(' PAYLOAD KEYS:', Object.keys(payloadObj));

            for (const [key, value] of Object.entries(payloadObj)) {
                if (typeof value === "string" && value.trim() !== '') {
                    console.log(` FOUND STRING IN payload.${key}:`, value);
                    possibleMessages.push(value);
                }
            }

            if ('data' in payloadObj) {
                const data = payloadObj.data;

                if (typeof data === "string") {
                    possibleMessages.push(data);
                } else if (typeof data === "object" && data !== null) {
                    const dataObj = data as Record<string, unknown>;

                    for (const [key, value] of Object.entries(dataObj)) {
                        console.log(` data.${key}:`, value, typeof value);

                        if (typeof value === "string" && value.trim() !== '') {
                            possibleMessages.push(value);
                        }
                    }
                }
            }

            if ('error' in payloadObj) {
                const error = payloadObj.error;

                if (typeof error === "string") {
                    possibleMessages.push(error);
                } else if (typeof error === "object" && error !== null) {
                    const errorObj = error as Record<string, unknown>;
                    for (const [key, value] of Object.entries(errorObj)) {
                        if (typeof value === "string" && value.trim() !== '') {
                            console.log(` FOUND STRING IN error.${key}:`, value);
                            possibleMessages.push(value);
                        }
                    }
                }
            }

            if ('status' in payloadObj) {

                const statusRelatedFields = ['statusText', 'statusMessage', 'message', 'detail'];
                statusRelatedFields.forEach(field => {
                    if (field in payloadObj && typeof payloadObj[field] === "string") {
                        console.log(` FOUND STATUS-RELATED MESSAGE in ${field}:`, payloadObj[field]);
                        possibleMessages.push(String(payloadObj[field]));
                    }
                });
            }
        }
    }

    if (action.error?.message && action.error.message !== "Rejected") {
        possibleMessages.push(action.error.message);
    }



    if (possibleMessages.length > 0) {
        const codeMessages = possibleMessages.filter(msg =>
            msg.includes('_') && msg.toUpperCase() === msg
        );

        if (codeMessages.length > 0) {
            return codeMessages[0];
        }

        const firstMessage = possibleMessages[0];
        return firstMessage;
    }

    return undefined;
}

const getErrorTitle = (status: number | string): string => {
    if (typeof status === "number") {
        switch (status) {
            case 400: return `Noto'g'ri so'rov (${status})`;
            case 401: return `Avtorizatsiyadan o'tmagan (${status})`;
            case 403: return `Ruxsat yo'q (${status})`;
            case 404: return `Not found (${status})`;
            case 422: return `Ma'lumot xatosi (${status})`;
            case 429: return `Haddan ko'p so'rov (${status})`;
            case 500: return `Server xatosi (${status})`;
            default: return `Xatolik (${status})`;
        }
    }

    switch (status) {
        case "FETCH_ERROR": return "Tarmoq xatosi";
        case "PARSING_ERROR": return "Ma'lumot xatosi";
        case "TIMEOUT_ERROR": return "Vaqt tugashi";
        default: return "Noma'lum xatolik";
    }
};

const getErrorDescription = (status: number | string, serverMessage?: string, pathname?: string): string => {
    if (serverMessage) {
        console.log(serverMessage);
        return serverMessage;
    }

    if (typeof status === "number") {
        switch (status) {
            case 400:
                if (pathname?.includes("ijtimoiy-keshbek")) {
                    return "UNEXPECTED_CONNECTION"
                } else if (pathname?.includes("transactions")) {
                    return "DATA_COUNT_IN_FILE_EXCEEDED"
                } else {
                    return "Noto‘g‘ri so‘rov bajarildi"
                }

            case 401: return "Tizimga kiring yoki sessiyangizni yangilang"
            case 403: return "Ushbu amalni bajarish uchun ruxsatingiz yo‘q"
            case 404: return "So‘ralgan ma’lumot topilmadi"
            case 422: return "Yuborilgan ma’lumotlar noto‘g‘ri"
            case 429: return "Haddan ko‘p so‘rov yuborildi, biroz kuting"
            case 500: return "Server xatosi, keyinroq qayta urinib ko‘ring"
            default: return "Kutilmagan xatolik yuz berdi"
        }
    }

    switch (status) {
        case "FETCH_ERROR": return "Internet aloqasini tekshiring va qayta urinib ko'ring";
        case "PARSING_ERROR": return "Server javobini o'qishda xatolik yuz berdi";
        case "TIMEOUT_ERROR": return "Server javob bermadi, qayta urinib ko'ring";
        default: return "Kutilmagan xatolik yuz berdi";
    }
};

export const errorMiddleware: Middleware = ({ dispatch }) => (next) => (action: unknown) => {
    const result = next(action);
    const pathname = window.location.pathname


    if (!isRejectedAction(action)) return result;

    const payloadObj = action.payload as Record<string, unknown> | undefined;

    let status: number | string | undefined;

    if (payloadObj && typeof payloadObj === "object") {
        const meta = payloadObj["meta"] as Record<string, unknown> | undefined;
        const response = payloadObj["response"] as Record<string, unknown> | undefined;

        const maybeHeaders =
            (meta?.response as Record<string, unknown> | undefined)?.["status"] ??
            response?.["status"] ??
            payloadObj["originalStatus"];

        if (typeof maybeHeaders === "number") {
            status = maybeHeaders;
        } else if (typeof payloadObj["status"] === "number" || typeof payloadObj["status"] === "string") {
            status = payloadObj["status"] as number | string;
        }
    }

    if (!status && typeof action === "object" && action !== null) {
        const error = (action as unknown as Record<string, unknown>)["error"];
        if (typeof error === "object" && error !== null && "status" in error) {
            status = (error as { status?: number | string }).status;
        }
    }


    const serverMessage = extractServerMessage(action as RejectedAction);

    const title = getErrorTitle(status ?? "UNKNOWN");
    const description = getErrorDescription(status ?? "UNKNOWN", serverMessage, pathname);

    let duration = 4;
    if (status === 401) duration = 3;
    else if (status === "FETCH_ERROR") duration = 4;
    else if (typeof status === "number" && status >= 500) duration = 4;
    else if (status === 429) duration = 5;

    notify.error(title, description, {
        placement: "top",
        duration,
        key: `middleware-error-${String(status)}-${Date.now()}`,
        role: "alert",
    });


    if (status === 401) {
        Promise.resolve().then(() => dispatch(logout()));
    }

    if (import.meta.env.DEV) {
        console.error(`API Error [${String(status)}]:`, {
            status,
            serverMessage,
            fullAction: action,
        });
    }

    return result;
};