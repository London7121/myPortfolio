export interface ExperienceItem {
    company: string;
    position: string;
    startDate: string;
    endDate: string | "Hozirgi vaqt";
    description: string;
    project?: string;
    icon?: string;
}

export const experienceData: ExperienceItem[] = [
    {
        company: "Soliq xizmati",
        position: "Frontend dasturchi ",
        startDate: "2024 yil Iyun",
        endDate: "Hozirgi vaqt",
        description: "React.js va Redux Toolkit yordamida ichki dashboardlar va hisobot tizimlarini ishlab chiqdim. Skeleton va Ant Design komponentlaridan foydalanganman.",
        project: "Transaction Report Dashboard",
        icon: "https://cdn-icons-png.flaticon.com/512/2920/2920250.png",
    },
    {
        company: "TezBro (Freelance loyiha)",
        position: "Frontend dasturchi",
        startDate: "2025 yil Yanvar",
        endDate: "Hozirgi vaqt",
        description: "React + JS bilan onlayn do‘kon interfeysini yaratdim. Mahsulotlar, filtrlar, swiper karusel va i18next integratsiyasini amalga oshirdim.",
        project: "Onlayn Do‘kon",
        icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
    },
    {
        company: "TATU Universiteti",
        position: "Talaba / IT Service Fakulteti",
        startDate: "2021 yil Sentabr",
        endDate: "Hozirgi vaqt",
        description: "4-yil, Computer Engineering fakulteti. Loyiha va kurs ishlarida React, JS, TypeScript, Node.js, Git kabi texnologiyalarni qo‘llaganman.",
        icon: "https://cdn-icons-png.flaticon.com/512/2985/2985093.png",
    },
];
