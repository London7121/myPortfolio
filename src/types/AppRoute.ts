import type { ReactNode } from "react";

export interface AppRoute {
    index?: boolean;
    path?: string;
    element: ReactNode;
    permission?: string;
    label?: string;
    icon?: ReactNode;
    children?: AppRoute[];
}