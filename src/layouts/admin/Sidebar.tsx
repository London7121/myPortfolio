import { Menu, Skeleton, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hook";
import { t } from 'i18next'
import { useRoleMenu } from "../../hooks/menu/useRoleMenu";
import { useGetProfileQuery } from "../../service/api";


const SidebarSkeleton = ({ collapsed }: { collapsed: boolean }) => (
    <div
        style={{
            height: "calc(100% - 70px)",
            borderRight: 0,
            overflowY: "auto",
            margin: collapsed ? "0 10px" : "10px 10px",
            padding: "8px 0",
        }}
        className="custom-sidebar font-sans"
    >
        {Array.from({ length: 6 }).map((_, idx) => (
            <div
                key={idx}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 16px",
                }}
            >
                <Skeleton.Avatar active size="large" shape="circle" />
                {!collapsed && (
                    <Skeleton.Input
                        active
                        size="large"
                        style={{ width: "90%", minWidth: "135px" }}
                    />
                )}
            </div>
        ))}
    </div>
);

export default function Sidebar() {
    const navigate = useNavigate();
    const menuItems = useRoleMenu(t);
    const { isLoading } = useGetProfileQuery({});
    const { token: { colorPrimary, colorText } } = theme.useToken()
    const collapsed = useAppSelector(state => state.ui.collapsed);

    return (
        <Sider
            theme='light'
            collapsible
            collapsed={collapsed}
            trigger={null}
            width={256}
            collapsedWidth={86}
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
                height: '100vh',
            }}
        >
            <Link to="/home" className="logo flex items-center justify-center text-2xl font-semibold text-white p-2">
                {
                    collapsed ?
                        // <img className='w-13' src={"logo"} alt="admin" />
                        <div>
                            <span style={{ color: colorPrimary }}>A</span>
                            <span style={{ color: colorText }}>P</span>
                        </div>
                        :
                        <div className='flex items-center justify-center gap-2'>
                            {/* <img className='w-13' src={"logo"} alt="taxpay" /> */}
                            <div>
                                <span style={{ color: colorPrimary }}>Admin</span>
                                <span style={{ color: colorText }}>Panel</span>
                            </div>
                        </div>
                }

            </Link>
            {isLoading ? (
                <SidebarSkeleton collapsed={collapsed} />
            ) : (
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                    className="custom-sidebar font-sans"
                    style={{
                        height: "calc(100% - 70px)",
                        borderRight: 0,
                        overflowY: "auto",
                        margin: collapsed ? "0 10px" : "10px 0",
                    }}
                />
            )}
        </Sider>
    )
}