import { message } from "antd";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { NotificationPlacement } from "antd/es/notification/interface";
import type { MessageInstance } from "antd/es/message/interface";
import * as React from "react";

let notificationApi: NotificationInstance | null = null;
let messageApi: MessageInstance | null = null;

const NotificationContext = React.createContext<NotificationInstance | null>(null);

interface NotificationProviderProps {
    api: NotificationInstance;
    messageApi?: MessageInstance;
    children: React.ReactNode;
}

export const NotificationProvider = (props: NotificationProviderProps) => {
    notificationApi = props.api;
    messageApi = props.messageApi || null;
    return React.createElement(
        NotificationContext.Provider,
        { value: props.api },
        props.children
    );
};

export const useNotification = () => {
    return React.useContext(NotificationContext);
};

interface NotifyOptions {
    placement?: NotificationPlacement;
    duration?: number;
    onClose?: () => void;
    onClick?: () => void;
    key?: string | number;
    btn?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    role?: 'alert' | 'status';
    showProgress?: boolean,
    pauseOnHover?: boolean;
}

export const notify = {
    success: (msg: string, desc?: string, options?: NotifyOptions) => {
        message.success(msg);
        if (notificationApi) {
            notificationApi.success({
                title: msg,
                description: desc,
                placement: options?.placement || 'topRight',
                duration: options?.duration || 4.5,
                onClose: options?.onClose,
                onClick: options?.onClick,
                key: options?.key,
                btn: options?.btn,
                className: options?.className,
                style: options?.style,
                role: options?.role,
                showProgress: true,
                pauseOnHover: true,
            });
        }
    },

    error: (msg: string, desc?: string, options?: NotifyOptions) => {
        message.error(msg);
        if (notificationApi) {
            notificationApi.error({
                title: msg,
                description: desc,
                placement: options?.placement || 'topRight',
                duration: options?.duration || 4.5,
                onClose: options?.onClose,
                onClick: options?.onClick,
                key: options?.key,
                btn: options?.btn,
                className: options?.className,
                style: options?.style,
                role: options?.role,
                showProgress: true,
                pauseOnHover: true,
            });
        }
    },

    info: (msg: string, desc?: string, options?: NotifyOptions) => {
        message.info(msg);
        if (notificationApi) {
            notificationApi.info({
                title: msg,
                description: desc,
                placement: options?.placement || 'topRight',
                duration: options?.duration || 4.5,
                onClose: options?.onClose,
                onClick: options?.onClick,
                key: options?.key,
                btn: options?.btn,
                className: options?.className,
                style: options?.style,
                role: options?.role,
                showProgress: true,
                pauseOnHover: true,
            });
        }
    },

    warning: (msg: string, desc?: string, options?: NotifyOptions) => {
        message.warning(msg);
        if (notificationApi) {
            notificationApi.warning({
                title: msg,
                description: desc,
                placement: options?.placement || 'topRight',
                duration: options?.duration || 4.5,
                onClose: options?.onClose,
                onClick: options?.onClick,
                key: options?.key,
                btn: options?.btn,
                className: options?.className,
                style: options?.style,
                role: options?.role,
                showProgress: true,
                pauseOnHover: true,
            });
        }
    },

    destroy: (key?: string | number) => {
        if (key) {
            notificationApi?.destroy(key);
        } else {
            notificationApi?.destroy();
        }
    },

    destroyAll: () => {
        notificationApi?.destroy();
    },

    open: (config: {
        message: React.ReactNode;
        description?: React.ReactNode;
        type?: 'success' | 'info' | 'warning' | 'error';
        placement?: NotificationPlacement;
        duration?: number;
        onClose?: () => void;
        onClick?: () => void;
        key?: string | number;
        btn?: React.ReactNode;
        className?: string;
        style?: React.CSSProperties;
        role?: 'alert' | 'status';
        icon?: React.ReactNode;
    }) => {
        if (notificationApi) {
            notificationApi.open({
                title: config.message,
                description: config.description,
                type: config.type,
                placement: config.placement || 'topRight',
                duration: config.duration || 4.5,
                onClose: config.onClose,
                onClick: config.onClick,
                key: config.key,
                btn: config.btn,
                className: config.className,
                style: config.style,
                role: config.role,
                icon: config.icon,
            });
        }
    },

    message: {
        success: (content: string, duration?: number) => {
            if (messageApi) {
                messageApi.success(content, duration);
            } else {
                message.success(content, duration);
            }
        },

        error: (content: string, duration?: number) => {
            if (messageApi) {
                messageApi.error(content, duration);
            } else {
                message.error(content, duration);
            }
        },

        info: (content: string, duration?: number) => {
            if (messageApi) {
                messageApi.info(content, duration);
            } else {
                message.info(content, duration);
            }
        },

        warning: (content: string, duration?: number) => {
            if (messageApi) {
                messageApi.warning(content, duration);
            } else {
                message.warning(content, duration);
            }
        },

        loading: (content: string, duration?: number) => {
            if (messageApi) {
                return messageApi.loading(content, duration);
            } else {
                return message.loading(content, duration);
            }
        },

        destroy: (key?: React.Key) => {
            if (messageApi) {
                messageApi.destroy(key);
            } else {
                message.destroy(key);
            }
        }
    }
};