import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import { Layout, theme } from "antd";
import { useAppSelector } from "../../store/hook";
const { Content } = Layout


const AdminLayout = () => {
    const { token: { borderRadiusLG } } = theme.useToken()
    const collapsed = useAppSelector(state => state.ui.collapsed);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout style={{ marginLeft: collapsed ? 80 : 235 }}>
                <AdminHeader />
                <Content
                    style={{
                        maxHeight: "88vh",
                        margin: '95px 25px 0 50px',
                        padding: 15,
                        background: 'rgba(255, 255, 255, 0.12)',
                        backdropFilter: 'blur(25px)',
                        WebkitBackdropFilter: 'blur(25px)',
                        borderRadius: borderRadiusLG,
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        height: "calc(100vh - 70px)",
                        overflowY: "auto",
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    }}

                >
                    <Outlet />
                </Content>
                <AdminFooter />
            </Layout>
        </Layout>
    );
};

export default AdminLayout;