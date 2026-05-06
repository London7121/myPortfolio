import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { useNavigate } from "react-router-dom";
import { bannerData, type BannerItem } from "../../constants/bannerData";
import { FaGithub, FaLinkedinIn, FaTelegram } from "react-icons/fa";
import { SiVuedotjs, SiReact, SiJavascript } from "react-icons/si";
import { SendOutlined } from "@ant-design/icons";
import "./swiper.css";
import { Image } from "antd";

const techIcons = [
  {
    icon: <SiVuedotjs size={28} />,
    color: "#a8b8c8",
    bg: "#161d2a",
    label: "Vue",
  },
  {
    icon: <SiReact size={28} />,
    color: "#b8c8d8",
    bg: "#111827",
    label: "React",
  },
  {
    icon: <SiJavascript size={28} />,
    color: "#c8d0dc",
    bg: "#1a1f2e",
    label: "JS",
  },
];

const socialLinks = [
  { icon: <FaGithub size={20} />, href: "https://github.com", label: "GitHub" },
  {
    icon: <FaLinkedinIn size={18} />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  { icon: <FaTelegram size={20} />, href: "https://t.me", label: "Telegram" },
];

const BannerCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <Swiper
        className="hero-swiper"
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
      >
        {bannerData.map((banner: BannerItem) => (
          <SwiperSlide key={banner.id}>
            {/* Background */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                minHeight: "60vh",
              }}
            >
              {/* Dot grid texture */}
              <div className="absolute inset-0 hero-dot-grid" />

              {/* Teal glow bottom-left */}
              <div
                className="absolute"
                style={{
                  bottom: "-120px",
                  left: "-80px",
                  width: "400px",
                  height: "400px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(148,163,184,0.12) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
              {/* Blue glow top-right */}
              <div
                className="absolute"
                style={{
                  top: "100px",
                  right: "10%",
                  width: "350px",
                  height: "350px",
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />

              {/* Main content grid */}
              <div
                className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-10"
                style={{
                  minHeight: "60vh",
                  maxWidth: "1280px",
                  margin: "0 auto",
                  padding: "50px 32px",
                }}
              >
                {/* ---- LEFT SIDE ---- */}
                <div className="flex-1" style={{ maxWidth: "560px" }}>
                  {/* Name */}
                  <h1
                    className="fade-in-2"
                    style={{
                      fontSize: "clamp(48px, 6vw, 76px)",
                      fontWeight: 800,
                      color: "#f1f5f9",
                      lineHeight: 1.1,
                      marginBottom: "12px",
                      letterSpacing: "-1px",
                    }}
                  >
                    {banner.title}
                  </h1>

                  {/* Role */}
                  <h2
                    className="fade-in-3 btn-primary-hero"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      fontWeight: 600,
                      color: "#cbd5e1",
                      marginBottom: "20px",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {banner.subtitle}
                  </h2>

                  {/* Description */}
                  <p
                    className="fade-in-4 btn-outline-hero"
                    style={{
                      color: "#94a3b8",
                      fontSize: "16px",
                      lineHeight: 1.75,
                      marginBottom: "36px",
                      maxWidth: "440px",
                    }}
                  >
                    {banner.description ||
                      "I build modern and responsive web applications using Vue.js and modern technologies."}
                  </p>

                  {/* CTA Buttons */}
                  <div
                    className="fade-in-5"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flexWrap: "wrap",
                      marginBottom: "40px",
                    }}
                  >
                    <button
                      className="btn-primary-hero"
                      style={{
                        color: "white",
                      }}
                      onClick={() => navigate("/contact")}
                    >
                      {banner.ctaText || "Contact Me"}
                      <SendOutlined />
                    </button>
                  </div>

                  {/* Social Links */}
                  <div
                    className="fade-in-5"
                    style={{ display: "flex", gap: "12px" }}
                  >
                    {socialLinks.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                        aria-label={s.label}
                      >
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>

                {/* ---- RIGHT SIDE ---- */}
                <div
                  className="flex items-center justify-center relative flex-1 min-h-65 sm:min-h-80 md:min-h-125"
                  style={{ flex: 1, minHeight: "500px" }}
                >
                  {/* Character image */}
                  {banner.image && (
                    <Image
                      src={banner.image}
                      alt="Developer"
                      style={{
                        width: "100%",
                        maxWidth: "420px",
                        objectFit: "contain",
                        filter:
                          "drop-shadow(0 20px 60px rgba(148,163,184,0.15))",
                        animation: "float 6s ease-in-out infinite",
                        borderRadius: "12px",
                      }}
                    />
                  )}

                  {/* Floating tech icon cards */}
                  <div
                    style={{
                      position: "absolute",
                      right: "0px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    {techIcons.map((tech, i) => (
                      <div
                        key={tech.label}
                        className={`tech-icon-card float-${i}`}
                        style={{ background: tech.bg, color: tech.color }}
                        title={tech.label}
                      >
                        {tech.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Swiper pagination spacing */}
              <div style={{ height: "40px" }} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerCarousel;
