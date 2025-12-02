import { Pagination, ConfigProvider, Tag } from "antd";
import enUS from "antd/locale/en_US";
import ruRU from "antd/locale/ru_RU";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PaginationComponent = ({ total }: { total: number }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { i18n } = useTranslation();

    const page = Number(searchParams.get("page")) || 0;
    const size = Number(searchParams.get("size")) || 10;

    const handleChange = (p: number, s: number) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", String(p - 1));
        newParams.set("size", String(s));
        setSearchParams(newParams);
    };

    const formatNumber = (num: number) =>
        new Intl.NumberFormat("ru-RU").format(num);

    const getLocale = () => {
        switch (i18n.language) {
            case "uz":
                return {
                    ...enUS,
                    Pagination: {
                        ...enUS.Pagination,
                        items_per_page: "/ sahifa",
                    },
                };
            case "ru":
                return ruRU;
            default:
                return enUS;
        }
    };

    return (
        <ConfigProvider locale={getLocale()}>
            <div className="flex items-center justify-end my-4 gap-4">
                <Tag color="blue" style={{ fontSize: "16px", padding: "4px" }}>
                    {i18n.t("pagination.total")}: {formatNumber(total)}
                </Tag>
                <Pagination
                    current={page + 1}
                    pageSize={size}
                    total={total}
                    onChange={handleChange}
                    showSizeChanger
                    itemRender={(page, type, originalElement) => {
                        if (type === "page") {
                            return (
                                <span>{formatNumber(page)}</span>
                            );
                        }
                        return originalElement;
                    }}
                />
            </div>
        </ConfigProvider>
    );
};

export default PaginationComponent;