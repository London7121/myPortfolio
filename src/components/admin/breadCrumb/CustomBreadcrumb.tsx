// components/Breadcrumb.tsx
import React from "react"
import { useLocation, Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Breadcrumb, theme } from "antd"
import { HomeOutlined } from "@ant-design/icons"

const CustomBreadcrumb: React.FC = () => {
    const location = useLocation()
    const { t } = useTranslation()
    const { token } = theme.useToken()

    const pathnames = location.pathname.split("/").filter((x) => x && x !== "transactions-detail")

    const breadcrumbItems = [
        {
            title: (
                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <HomeOutlined style={{ marginRight: 4 }} />
                    {pathnames.length === 0 ? t('breadcrumb.home', 'Home') : ''}
                </Link>
            ),
        },
        ...pathnames.map((segment, index) => {
            const url = `/${pathnames.slice(0, index + 1).join("/")}`
            const isLast = index === pathnames.length - 1

            const translationKey = `breadcrumb.${segment}`
            const translated = t(translationKey, segment)

            if (isLast) {
                return {
                    title: <span style={{ color: token.colorTextDescription }}>{translated}</span>,
                }
            }

            return {
                title: (
                    <Link
                        to={url}
                        style={{ color: 'inherit', textDecoration: 'none' }}
                    >
                        {translated}
                    </Link>
                ),
            }
        }),
    ]

    return (
        <Breadcrumb
            items={breadcrumbItems}
            separator=">"
            style={{ margin: '16px 0' }}
        />
    )
}

export default CustomBreadcrumb