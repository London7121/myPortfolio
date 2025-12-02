import type { MenuProps } from "antd";
import type { TFunction } from "i18next";
import { useAppSelector } from "../../store/hook";
import { superAdminMenu, type MenuItemWithPermission } from "../../pages/admin/menu/superAdminMenu";
import { filterMenuByPermission } from "../../helpers/permissionMenu";

export const useRoleMenu = (t: TFunction): MenuProps["items"] => {
    const userData = useAppSelector((state) => state.auth.userData);
    const permissions = userData?.permissions ?? [];
    const rawMenu: MenuItemWithPermission[] = superAdminMenu(t) as MenuItemWithPermission[];
    return filterMenuByPermission(rawMenu, permissions);
};