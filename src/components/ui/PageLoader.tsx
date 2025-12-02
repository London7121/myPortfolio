// components/loaders/PageLoader.tsx
import "../../assets/styles/LogoLoader.css"

const PageLoader = () => {
    return (
        <div className="page-loader-wrapper">
            <div className="logo-loader-container">
                <svg className="rotating-ring" viewBox="0 0 100 100">
                    <circle
                        className="ring"
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1890ff"
                        strokeWidth="5"
                        strokeDasharray="75 25"
                    />
                </svg>

                {/* <img src={logo} className="logo-pulse" alt="logo" /> */}
            </div>
        </div>
    );
};

export default PageLoader;