// import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { TbBackground } from "react-icons/tb";

export default function HeroLight() {
  const { t } = useTranslation();
  return (
    <section className="h-[50vh] w-full flex flex-col items-center justify-center">
      {/* CONTENT */}

      <span className="mb-4 rounded-full bg-white/10 px-3 py-1 text-md backdrop-blur flex items-center gap-1">
        <TbBackground size={22} />
        {t("frontendExperience")}
      </span>

      <h1 className="text-3xl md:text-6xl font-semibold tracking-tight text-white leading-tight">
        {t("buildModernInterfaces")} <br />
        {t("withLightAndPrecision")}
      </h1>
    </section>
  );
}
