import log from '../assets/images/iamkamol.jpg'

export interface BannerItem {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
}

export const bannerData = [
    {
        id: 1,
        image: log,
        title: "Frontend Developer",
        subtitle: "React, TypeScript, Redux Toolkit, Tailwind",
        ctaText: "Contact Me",
        ctaLink: "/contact",
    },
    // {
    //     id: 2,
    //     image: "/images/kamol-2.jpg",
    //     title: "Modern UI Developer",
    //     subtitle: "Clean and fast web applications",
    //     ctaText: "My Projects",
    //     ctaLink: "/projects",
    // },
    // {
    //     id: 3,
    //     image: "/images/kamol-3.jpg",
    //     title: "Build Your Brand",
    //     subtitle: "Creative and functional interfaces",
    //     ctaText: "Hire Me",
    //     ctaLink: "/contact",
    // },
];
