import { DashboardPage } from "../../pages/admin";

export const superAdminRoutes = [
    {
        index: true,
        element: <DashboardPage />,
        permission: "ADMIN",
    },
    // {
    //     path: "news",
    //     element: <News />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "vacancy",
    //     element: <Vacancy />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "statistics",
    //     element: <Statistics />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "banner",
    //     element: <Banner />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "ads",
    //     element: <Ads />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "team",
    //     element: <Team />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "partners",
    //     element: <Promotions />,
    //     permission: "ADMIN",
    // },
    // {
    //     path: "profile",
    //     element: <ProfilePage />,
    //     permission: "",
    // }
];