import { Progress } from "antd";
import { skillsData } from "../../../constants/skillsData";
import { useTranslation } from "react-i18next";

export default function Skills() {
    const {t} = useTranslation();
    return (
        <section className="relative w-full py-24  text-white overflow-hidden">

            {/* Section Title */}
            <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
                    {t("technicalExpertise")}
                </h2>
                <p className="mt-4 max-w-xl mx-auto">
                    {t("Technologies and tools I use to build scalable, modern, and high-performance applications.")}
                </p>
            </div>

            {/* Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
                {skillsData.map((skill, index) => (
                    <div
                        key={index}
                        className="
                                    group relative rounded-2xl p-px
                                    bg-linear-to-br from-white/10
                                  via-white/5 to-transparent
                                  hover:from-blue-500/30
                                  hover:via-purple-500/20
                                  hover:to-pink-500/20
                                    transition-all duration-500
                                  "
                    >
                        <div className="relative h-full rounded-2xl bg-black/70 backdrop-blur-xl p-6">

                            {/* Icon + Title */}
                            <div className="flex items-center gap-4 mb-5">
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10">
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="w-7 h-7 object-contain"
                                    />
                                </div>
                                <h3 className="text-lg font-semibold text-white">
                                    {skill.name}
                                </h3>
                            </div>

                            {/* Progress */}
                            <div className="relative">
                                <Progress
                                    percent={skill.level}
                                    strokeWidth={10}
                                    showInfo={false}
                                    strokeColor={{
                                        "0%": "#60a5fa",
                                        "50%": "#a78bfa",
                                        "100%": "#22d3ee"
                                    }}
                                    trailColor="rgba(255,255,255,0.08)"
                                />
                                <span className="absolute right-0 -top-6 text-sm text-gray-400">
                                    {skill.level}%
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
            
        </section>
    );
}
