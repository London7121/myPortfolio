import { useEffect } from "react";
import { useNavigationType, useLocation } from "react-router-dom";
import NProgress from "nprogress";

export default function NavigationProgress() {
    const location = useLocation();
    const navigationType = useNavigationType();

    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, [location, navigationType]);

    return null;
}