// helpers/permissions.ts
import type { RouteObject } from "react-router-dom";
import type { AppRoute } from "../types/AppRoute";

export const filterRoutesByPermission = (
    routes: AppRoute[],
    permissions: string[]
): RouteObject[] => {
    return routes
        .filter((route) => !route.permission || permissions.includes(route.permission))
        .map((route) => {
            const { permission, ...rest } = route;
            return {
                ...rest,
                children: route.children
                    ? filterRoutesByPermission(route.children as AppRoute[], permissions)
                    : undefined,
            } as RouteObject;
        });
};