import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { logout, setUserData } from "../../store/auth/authSlice";
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Dropdown, Skeleton, Space, theme, type MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useGetProfileQuery } from "../../service/api";
import ThemeToggle from "../../components/theme/ThemeToogle";
import LangSelect from "../../components/ui/LangSelect";

export default function AdminHeader() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const collapsed = useAppSelector(state => state.ui.collapsed);

  const { data, isLoading } = useGetProfileQuery({})
  const hasWelcomed = useRef(false);
  const { token: { colorBgContainer } } = theme.useToken()

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
      if (!hasWelcomed.current) {
        hasWelcomed.current = true;
      }
    }
  }, [data, dispatch]);

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const dropdownItems: MenuProps['items'] = [
    {
      key: 'profile',
      label: 'Profil',
      icon: <UserOutlined />,
      onClick: () => navigate('/admin/profile', { state: { profileData: data } }),
    },
    {
      key: 'logout',
      label: 'Chiqish',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
      danger: true
    },
  ]

  return (
    <Header
      className='m-0 p-0 rounded-lg'
      style={{
        background: colorBgContainer,
        display: 'flex',
        alignItems: 'center',
        justifyContent: "start",
        height: "65px",
        padding: 0,
        margin: 0,
        position: "fixed",
        top: 15,
        left: collapsed ? 130 : 285,
        right: 23,
        zIndex: 1000,
      }}
    >
      <Button
        type="primary"
        icon={collapsed ? <AiOutlineRight /> : <AiOutlineLeft />}
        onClick={handleToggle}
        style={{
          fontSize: 20, width: 32, height: 32, borderRadius: "50%",
          fontWeight: 500,
        }}
        className='right-10 top-6'
      />
      <div className='w-full' style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
        <CustomBreadcrumb />
        <div className='flex items-center justify-center gap-4 mr-4'>
          {/* <FancyClock /> */}
          <LangSelect />
          <SnowBtn />
          <ThemeToggle />
          <Dropdown className='pr-2' menu={{ items: dropdownItems }} placement="bottomRight" arrow>
            {
              isLoading ?
                <Space className='mt-2'>
                  <Skeleton.Avatar active size={50} shape="circle" />
                  <Skeleton.Input active style={{ width: 120, marginTop: "14px" }} size="small" />
                </Space> :
                <Space style={{ cursor: "pointer" }}>
                  <Avatar
                    size={50}
                    src={data?.image}
                    icon={<UserOutlined />}
                  />
                  <span style={{ fontWeight: 500 }}>
                    {data?.firstname} {data?.lastname}
                  </span>
                </Space>
            }
          </Dropdown>
        </div>
      </div>
    </Header>
  )
}