import log from "../assets/images/iamkamol.jpg";
import edu from "../assets/images/myedu.jpg";

export interface AboutItem {
  title: string;
  description: string;
  image: string;
}

export const aboutData: AboutItem = {
  title:
    "Frontend Developer – Yaratishni, Loyihalarni Jonlantirishni Yaxshi Ko‘raman",
  description: `
Men React.js va TypeScript yo‘nalishida ishlaydigan frontend dasturchiman. 
4 yillik o‘qish jarayonida (TATU — IT Services Faculty) nafaqat bilim oldim, balki haqiqiy 
amaliy tajribani ham to‘pladim: real loyihalar, API integratsiyalari, responsive UI/UX 
yechimlar, Redux Toolkit Query, Firebase, Node.js backend asoslari va boshqalar.

Men uchun dasturlash — bu shunchaki kod yozish emas. Bu: muammo yechish, dizaynni 
jonlantirish, foydalanuvchi uchun qulay va tez ishlaydigan mahsulot yaratish demakdir.

Hozirgi maqsadim — zamonaviy frontend texnologiyalaridan maksimal darajada foydalanib, 
katta real loyihalarni yaratish, o‘rganishni davom ettirish va istiqbolda global kompaniyalarda 
ishlash. Shuningdek, o‘z portfolio loyihalarimni professional darajaga yetkazish ustida ish olib 
boryapman.

Men har doim yangi imkoniyatlarni qidiraman: jamoaviy ishlash, tez o‘rganish, kreativ 
fikrlash va qiyin funksiyalarni yoqimli yechim bilan hal qilish — bu mening kuchli 
tomonlarimdir.
`,
  image: log,
};

// O‘qigan joylar
export const educationData = {
  university: "Toshkent Axborot Texnologiyalari Universiteti (TATU)",
  faculty: "IT Services Faculty — Computer Engineering",
  years: "2021 – 2025",
  image: edu,
};
