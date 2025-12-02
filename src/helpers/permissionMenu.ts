import type { MenuProps } from "antd";
import type { MenuItemWithPermission } from "../pages/admin/menu/superAdminMenu";

export const filterMenuByPermission = (
    items: MenuItemWithPermission[],
    userPermissions: string[]
): MenuProps["items"] => {
    return items
        .filter(
            (item) =>
                !item.permission || item.permission.some((p) => userPermissions.includes(p))
        )
        .map((item) => ({
            ...item,
            children: item.children
                ? filterMenuByPermission(item.children, userPermissions)
                : undefined,
        })) as MenuProps["items"];
};