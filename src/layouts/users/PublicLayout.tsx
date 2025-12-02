// import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Content } from "antd/es/layout/layout";
import { theme } from "antd";
import { Outlet } from "react-router-dom";


const PublicLayout = () => {
    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();
    return (
        <Content style={{ background: colorBgContainer, color: colorText }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Header />
                <Outlet />
                <Footer />
            </div>
        </Content>
    );
};

export default PublicLayout;