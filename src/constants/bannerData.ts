// import log from "../assets/images/iamkamol.jpg";
// import log2 from "../assets/images/banner2.png";
// import log3 from "../assets/images/banner3.png";
import log1 from "../assets/images/banner-hero.png";

export interface BannerItem {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const bannerData = [
  {
    id: 1,
    image: log1,
    title: "Frontend dasturchi",
    subtitle: "React, TypeScript, Redux Toolkit, Tailwind",
    description:
      "Zamonaviy va tez ishlaydigan web interfeyslar yarataman. Kod sifati, komponentlar arxitekturasi va responsiv dizayn asosiy e'tiborimda.",
    ctaText: "Men bilan bog'lanish",
    ctaLink: "/contact",
  },
  // {
  //   id: 2,
  //   image: log2,
  //   title: "Zamonaviy UI dasturchi",
  //   subtitle: "Toza va tez ishlaydigan web ilovalar",
  //   description:
  //     "Foydalanuvchi uchun qulay, minimalistik va estetik UI dizaynlar ishlab chiqaman. Har bir detal UX nuqtai nazaridan o'ylangan bo‘ladi.",
  //   ctaText: "Mening loyihalarim",
  //   ctaLink: "/projects",
  // },
  // {
  //   id: 3,
  //   image: log3,
  //   title: "Brendingizni yarating",
  //   subtitle: "Ijodiy va funksional interfeyslar",
  //   description:
  //     "Brendingizni kuchaytiradigan zamonaviy dizayn va interfeyslar yarataman. Maqsad — foydalanuvchini birinchi ko‘rishda jalb qilish.",
  //   ctaText: "Ishga taklif qilish",
  //   ctaLink: "/contact",
  // },
];
