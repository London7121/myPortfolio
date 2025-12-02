import { useEffect } from "react";
import { ConfigProvider, Table, Spin } from "antd";
import type { TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { SyncOutlined } from "@ant-design/icons";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import uzUZ from "antd/locale/uz_UZ";

const CustomTable = <T extends object>(props: TableProps<T>) => {
    const { i18n } = useTranslation();

    const getLocale = () => {
        switch (i18n.language) {
            case "uz":
                return uzUZ;
            case "ru":
                return ruRU;
            default:
                return enUS;
        }
    };

    useEffect(() => {
        const el = document.querySelector<HTMLDivElement>(
            ".custom-scroll .ant-table-body"
        );
        if (!el) return;

        let isDown = false;
        let startX = 0;
        let startY = 0;
        let scrollLeft = 0;
        let scrollTop = 0;

        const mouseDown = (e: MouseEvent) => {
            isDown = true;
            el.style.cursor = "grabbing";
            startX = e.pageX;
            startY = e.pageY;
            scrollLeft = el.scrollLeft;
            scrollTop = el.scrollTop;
        };

        const mouseUp = () => {
            isDown = false;
            el.style.cursor = "grab";
        };

        const mouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const walkX = e.pageX - startX;
            const walkY = e.pageY - startY;
            el.scrollLeft = scrollLeft - walkX;
            el.scrollTop = scrollTop - walkY;
        };

        el.addEventListener("mousedown", mouseDown);
        el.addEventListener("mouseup", mouseUp);
        el.addEventListener("mouseleave", mouseUp);
        el.addEventListener("mousemove", mouseMove);

        el.style.cursor = "grab";

        return () => {
            el.removeEventListener("mousedown", mouseDown);
            el.removeEventListener("mouseup", mouseUp);
            el.removeEventListener("mouseleave", mouseUp);
            el.removeEventListener("mousemove", mouseMove);
        };
    }, []);

    return (
        <ConfigProvider locale={getLocale()}>
            <div className="custom-scroll">
                <Table
                    {...props}
                    bordered
                    pagination={false}
                    style={{ marginTop: 10 }}
                    rowKey={props.rowKey || "id"}
                    scroll={{ x: 1000, y: "auto" }}
                    className="custom-table"
                    loading={{
                        spinning: props.loading as boolean,
                        indicator: <Spin indicator={<SyncOutlined spin />} size="large" />,
                    }}
                />
            </div>
        </ConfigProvider>
    );
};

export default CustomTable;