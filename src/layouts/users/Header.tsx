import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Layout, Drawer, Menu, theme, Button } from "antd";
import { RiMenu4Line } from "react-icons/ri";
import type { MenuProps } from "antd";
import ThemeToggle from "../../components/theme/ThemeToogle";
import { FaGithub } from "react-icons/fa6";
const { Header } = Layout;

const HeaderPage = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, colorText },
  } = theme.useToken();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const menuItems: MenuProps["items"] = [
    { key: "/home", label: "Bosh sahifa" },
    { key: "/home/about", label: "Biz haqimizda" },
    { key: "/home/skills", label: "Ko'nikmalar" },
    { key: "/home/experience", label: "Tajriba" },
    { key: "/home/contact", label: "Bog'lanish" },
    { key: "https://github.com/London7121", label: "Git Hub", icon: <FaGithub size={20} /> },

    {
      key: "/home/login",
      label: <Button type="primary">Login</Button>,
    },
  ];

  const onMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key.startsWith("http")) {
      window.open(e.key, "_blank"); 
    } else {
      navigate(e.key);
    }
  };


  return (
    <Header
      className="bg-white shadow-md sticky top-0 z-50"
      style={{
        background: colorBgContainer,
        color: colorText,
        height: "80px",
        padding: "0 16px",
      }}
    >
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex justify-between items-center h-16 pt-3">
        {/* Logo */}
        <span
          className="text-xl font- cursor-pointer flex items-center justify-center gap-2"
          onClick={() => navigate("/home")}
        >
          <p className="pt-4 logo-title">Kamol Juraev</p>
        </span>

        {/* Desktop Menu (Ant Design) */}
        <div className="hidden md:flex items-center gap-6 justify-between">
          <Menu
            mode="horizontal"
            items={menuItems}
            onClick={onMenuClick}
            className="flex items-center gap-6"

            style={{
              borderBottom: "none",
            }}
          />
          <ThemeToggle />
        </div>

        {/* Mobile Button */}
        <div className="md:hidden flex items-center space-x-2">
          <RiMenu4Line className="cursor-pointer hover:text-blue-600" onClick={() => setDrawerVisible(true)} size={32} />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <p className="logo-title1">Kamol Juraev</p>
          }
          placement="right"
          onClose={() => setDrawerVisible(false)}
          open={drawerVisible}
          // closeIcon={<CloseOutlined />}
          closable={false}
          width={240}
        >
          <Menu
            items={menuItems}
            onClick={(e) => {
              setDrawerVisible(false);
              onMenuClick(e);
            }}
            mode="inline"
            style={{ border: "none", backgroundColor: "transparent" }}
          />
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </Drawer>
      </div>
    </Header >

  );
};

export default HeaderPage;