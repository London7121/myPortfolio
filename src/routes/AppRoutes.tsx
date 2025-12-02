import { Navigate, type RouteObject } from "react-router-dom";
import { useAppSelector } from "../store/hook";
import PublicRoutes from "./PublicRoutes";
import { filterRoutesByPermission } from "../helpers/permission";
import { superAdminRoutes } from "./roles/superAdminRoutes";
import { PublicLayout } from "../layouts/users";
import Home from "../pages/users/home/Home";
import PrivateRoutes from "./PrivateRoutes";
import { DashboardLayout } from "../layouts/admin";
import { NotFound } from "../pages/page404";
import { publicRoutes } from "./routesConfige";

const AppRoutes = () => {
    const { token, userData } = useAppSelector((state) => state.auth);
    const userPermissions = userData?.permissions ?? [];
    const filteredRoutes: RouteObject[] = filterRoutesByPermission(
        superAdminRoutes,
        userPermissions
    );

    const routes: RouteObject[] = [
        {
            element: <PublicRoutes />,
            children: [
                {
                    element: <PublicLayout />,
                    children: [
                        {
                            index: true,
                            element: <Home />
                        },
                        ...publicRoutes
                    ],
                }
            ],
        }
        ,
        {
            element: <PrivateRoutes />,
            children: [
                {
                    path: "admin",
                    element: <DashboardLayout />,
                    children: [
                        ...filteredRoutes,
                        { path: "*", element: <NotFound /> },
                    ],
                },
            ],
        },
        {
            path: "*",
            element: token
                ? <Navigate to="/admin" replace />
                : <Navigate to="/home" replace />,
        },
    ];

    return routes;
};

export default AppRoutes;