import { useState, useEffect } from 'react';
import { FaAngleUp } from 'react-icons/fa6';

export const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        isVisible && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 z-10 right-4 rounded-full cursor-pointer w-12 h-12 bg-blue-500 text-lg shadow-md hover:bg-blue-600 transition-all duration-300 flex items-center justify-center"
            >
                <FaAngleUp size={25} color='white'/>
            </button>
        )
    );
};