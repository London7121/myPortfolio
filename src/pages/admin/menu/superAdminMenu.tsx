import { type MenuProps } from "antd";
import type { TFunction } from "i18next";
import { IoHome } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { GiNewspaper } from "react-icons/gi";
import { FcAdvertising, FcNews, FcStatistics } from "react-icons/fc";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsMicrosoftTeams } from "react-icons/bs";
import type { ReactNode } from "react";

export interface MenuItemWithPermission {
    key: string;
    icon?: ReactNode;
    label: ReactNode;
    permission?: string[];
    children?: MenuItemWithPermission[];
}

export const superAdminMenu = (t: TFunction): MenuProps["items"] => {
    const items: MenuItemWithPermission[] = [
        {
            key: "/admin",
            icon: <IoHome size={21} />,
            label: t("menu.home"),
            permission: ['ADMIN'],
        },
        {
            key: "/admin/banner",
            icon: <FcNews size={21} />,
            label: t("menu.banner"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/news",
            icon: <GiNewspaper size={21} />,
            label: t("menu.news"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/ads",
            icon: <FcAdvertising size={21} />,
            label: t("menu.ads"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/partners",
            icon: <FaUsers size={21} />,
            label: t("menu.partners"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/statistics",
            icon: <FcStatistics size={21} />,
            label: t("menu.statistics"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/team",
            icon: <BsMicrosoftTeams size={21} />,
            label: t("menu.team"),
            permission: ["ADMIN"],
        },
        {
            key: "/admin/vacancy",
            icon: <MdOutlineWorkOutline size={21} />,
            label: t("menu.vacancy"),
            permission: ["ADMIN"],
        }
        // {
        //     key: "/admin/soliq-mobile",
        //     icon: <Avatar
        //         size={36}
        //         src={logo}
        //         className="absolute right-2"
        //         style={{
        //             boxShadow: "2px 6px 10px rgba(0, 0, 0, 0.15)",
        //             backgroundColor: "#fff",
        //         }}
        //     />,
        //     label: <p className="flex items-center justify-start pt-3">{t("menu.soliqMobile")}</p>,
        //     permission: ["YPAY_TRANSACTION_LIST"],
        //     children: [
        //         {
        //             key: "/admin/soliq-mobile/ijtimoiy-keshbek",
        //             icon: <BsCashCoin size={21} />,
        //             label: t("menu.ijtimoiyKeshbek"),
        //             permission: ["YPAY_TRANSACTION_LIST"],
        //         },
        //         {
        //             key: "/admin/soliq-mobile/quyoshli-xonadon",
        //             icon: <MdOutlineWbSunny size={21} />,
        //             label: t("menu.quyoshliXonadon"),
        //             permission: ["YPAY_TRANSACTION_LIST"],
        //         },
        //     ],
        // },
    ];

    return items as MenuProps["items"];
};