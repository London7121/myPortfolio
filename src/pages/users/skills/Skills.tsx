import { Card, Progress } from "antd";
import { skillsData } from "../../../constants/skillsData";

export default function Skills() {
    return (
        <section className="w-full py-20">
            <div className="max-w-6xl mx-auto px-4">

                <h2 className="text-4xl font-bold text-gray-500 mb-12 text-center">
                    Skills & Technologies
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {skillsData.map((skill, index) => (
                        <Card
                            key={index}
                            className="shadow-md border-0 rounded-3xl transition-transform hover:-translate-y-1 hover:shadow-xl"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={skill.icon}
                                    alt={skill.name}
                                    className="w-12 h-12 object-contain"
                                />

                                <div>
                                    <h3 className="text-lg font-semibold text-gray-600">
                                        {skill.name}
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-4">
                                <Progress
                                    percent={skill.level}
                                    strokeWidth={12}
                                    showInfo={false}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
