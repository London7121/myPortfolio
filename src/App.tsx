import { Suspense, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme as antdTheme, message, notification } from "antd";
import uzLocale from "antd/locale/uz_UZ";
import 'nprogress/nprogress.css';
import { NotificationProvider } from "./utils/notifay";
import AIHelper from "./helpers/AIHelper";
import SnowAnimation from "./components/snow/SnowAnimation";
import { ScrollToTopButton } from "./components/scrollBtn/ScrollToTopButton";
import NetworkStatus from "./components/network/NetworkStatus";
import PageLoader from "./components/ui/PageLoader";
import { ThemeContext } from "./context/ThemeContext";
import { AppRoutes } from "./routes";

const App = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light";
  const [notificationApi, contextHolder] = notification.useNotification();
  const [messageApi, messageContextHolder] = message.useMessage();

  const router = createBrowserRouter(AppRoutes(), {
    future: { v7_relativeSplatPath: true },
  });

  return (
    <ConfigProvider
      locale={uzLocale}
      theme={{
        algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      }}
    >
      <NotificationProvider api={notificationApi} messageApi={messageApi}>
        {contextHolder}
        {messageContextHolder}
        <AIHelper />
        {/* {snow?.snowAnimation && <SnowAnimation />} */}
        <SnowAnimation />
        <ScrollToTopButton />
        <NetworkStatus />
        <Suspense fallback={<PageLoader />}>
          <RouterProvider router={router}>
          </RouterProvider>
        </Suspense>
      </NotificationProvider>
    </ConfigProvider>
  );
};

export default App;