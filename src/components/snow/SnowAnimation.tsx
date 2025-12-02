import { useEffect, useState } from "react";

interface Snowflake {
    id: number;
    left: string;
    animationDuration: string;
    size: string;
    delay: string;
    color: string;
    opacity: number;
    rotation: number;
}

const SnowAnimation: React.FC = () => {
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

    useEffect(() => {
        const createSnowflake = () => {
            const id = Date.now();

            const snowColors = [
                "rgba(255, 255, 255, 0.8)",
                "rgba(200, 220, 255, 0.7)",
                "rgba(230, 240, 255, 0.6)",
                "rgba(255, 255, 255, 0.5)",
            ];

            const newSnowflake: Snowflake = {
                id,
                left: `${Math.random() * window.innerWidth}px`,
                animationDuration: `${Math.random() * 10 + 5}s`,
                size: `${Math.random() * 6 + 2}px`,
                delay: `${Math.random() * 5}s`,
                color: snowColors[Math.floor(Math.random() * snowColors.length)],
                opacity: Math.random() * 0.7 + 0.3,
                rotation: Math.random() * 360,
            };

            setSnowflakes((prev) => [...prev, newSnowflake]);

            setTimeout(() => {
                setSnowflakes((prev) => prev.filter((flake) => flake.id !== id));
            }, 15000);
        };

        const snowInterval = setInterval(createSnowflake, 200);

        return () => clearInterval(snowInterval);
    }, []);

    return (
        <div className="snow-container">
            {snowflakes.map((flake) => (
                <div
                    key={flake.id}
                    className="snowflake"
                    style={{
                        left: flake.left,
                        width: flake.size,
                        height: flake.size,
                        backgroundColor: flake.color,
                        opacity: flake.opacity,
                        animationDuration: flake.animationDuration,
                        animationDelay: flake.delay,
                        transform: `rotate(${flake.rotation}deg)`,
                    }}
                />
            ))}
        </div>
    );
};

export default SnowAnimation;