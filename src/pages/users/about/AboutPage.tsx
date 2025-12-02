import { useState } from "react";
import { Button, Card, Image } from "antd";
import { aboutData, educationData } from "../../../constants/aboutData";

const MAX_LENGTH = 200;

const AboutPage = () => {
    const [expanded, setExpanded] = useState(false);

    const isLong = aboutData.description.length > MAX_LENGTH;
    const visibleText = expanded
        ? aboutData.description
        : aboutData.description.slice(0, MAX_LENGTH) + (isLong ? "..." : "");

    return (
        <section className="w-full py-10">
            <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">

                {/* ABOUT CARD */}
                <Card className="shadow-lg border-0 rounded-3xl overflow-hidden">
                    <div className="flex items-start justify-center flex-wrap md:flex-nowrap">

                        {/* IMAGE */}
                        <div className="relative min-h-[300px]">
                            <Image
                                src={aboutData.image}
                                alt="Me"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="p-5 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-gray-500 mb-4 leading-snug">
                                {aboutData.title}
                            </h2>

                            <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">
                                {visibleText}
                            </p>

                            {/* Toggle Button */}
                            {isLong && (
                                <Button
                                    type="text"
                                    className="mt-2 p-0 text-blue-600"
                                    onClick={() => setExpanded(!expanded)}
                                >
                                    {expanded ? "Show Less" : "Show More"}
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>

                {/* EDUCATION CARD */}
                <Card className="shadow-md border-0 rounded-3xl overflow-hidden">
                    <div className="flex items-start justify-center flex-wrap md:flex-nowrap">

                        {/* Education Image */}
                        <div className="relative min-h-[250px] md:min-h-0">
                            <Image
                                src={educationData.image}
                                alt="Education"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content */}
                        <div className="p-10 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-500 mb-3">
                                🎓 O‘qigan joyim
                            </h3>

                            <p className="text-lg font-semibold text-gray-600 mb-1">
                                {educationData.university}
                            </p>

                            <p className="text-gray-500 text-base mb-1">
                                {educationData.faculty}
                            </p>

                            <p className="text-gray-400">{educationData.years}</p>
                        </div>

                    </div>
                </Card>

            </div>
        </section>
    );
};

export default AboutPage;
