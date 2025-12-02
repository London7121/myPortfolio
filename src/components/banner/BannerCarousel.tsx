import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { bannerData, type BannerItem } from "../../constants/bannerData";

const BannerCarousel = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
      >
        {bannerData.map((banner: BannerItem) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[80vh] overflow-hidden flex items-center">

              {/* 1 — RASM HAR DOIM 100% COVER */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${banner.image})` }}
              ></div>

              {/* 2 — BUTUNLAY QORA OVERLAY (rasm rangini barqaror qiladi) */}
              <div className="absolute inset-0 bg-black/60"></div>

              {/* 3 — CHAPDAN O‘NGGA O‘TUVCHI GRADIENT */}
              <div className="absolute inset-0 bg-liner-to-r from-black via-black/50 to-transparent"></div>

              {/* Kontent */}
              <div className="relative z-10 max-w-xl pl-12 sm:pl-16 md:pl-24 md:mt-[280px] space-y-6">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
                  {banner.title}
                </h1>
                <p className="text-md sm:text-xl md:text-2xl text-gray-200 font-medium">
                  {banner.subtitle}
                </p>
                {banner.ctaText && banner.ctaLink && (
                  <Button
                    onClick={() => navigate(banner.ctaLink!)}
                    type="primary"
                    className="font-bold rounded-lg text-md sm:text-xl"
                  >
                    {banner.ctaText}
                  </Button>
                )}
              </div>
            </div>
          </SwiperSlide>

        ))}
        {/* Custom buttons */}
        <div className="swiper-button-prev text-white w-5! h-5! md:w-10! md:h-10! md:p-2 border p-1 rounded-full"></div>
        <div className="swiper-button-next text-white w-5! h-5! md:w-10! md:h-10! md:p-2 border p-1 rounded-full"></div>
      </Swiper>
    </section>
  );
};

export default BannerCarousel;
