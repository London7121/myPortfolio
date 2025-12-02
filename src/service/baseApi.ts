//////////////////////////////////////////////////////////////BASE_API_REQUEST////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



import {
    fetchBaseQuery,
    type BaseQueryFn,
    type FetchArgs,
    type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQueryWithDynamicUrl: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    const url = typeof args === "string" ? args : args?.url;

    const authEndpoints = [
        "/auth/signin",
        "/auth/refresh",
        "/ads"
    ];

    const baseUrl = authEndpoints.some((path) => url.includes(path))
        ? import.meta.env.VITE_AUTH_BASE_URL
        : import.meta.env.VITE_API_BASE_URL;

    const rawBaseQuery = fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { endpoint }) => {
            const token = sessionStorage.getItem("token");
            if (token && !url.includes("/login")) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            if (endpoint !== "createAds" && endpoint !== "updateAds") {
                headers.set("Content-Type", "application/json");
            }
            return headers;
        },
    });

    return rawBaseQuery(args, api, extraOptions);
};

export default baseQueryWithDynamicUrl;