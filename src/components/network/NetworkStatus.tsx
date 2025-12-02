import { useEffect } from 'react';
import { notify } from '../../utils/notifay';

const NetworkStatus = () => {
    useEffect(() => {
        const handleOnline = () => {
            notify.success(
                'Internet tiklandi',
                'Siz onlinesiz!',
                {
                    placement: 'bottomLeft',
                    showProgress: true,
                    pauseOnHover: true
                }
            );

        };

        const handleOffline = () => {
            notify.error(
                'Internet uzildi',
                'Siz offlinesiz!',
                {
                    placement: 'bottomLeft',
                    showProgress: true,
                    pauseOnHover: true
                }
            );
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return null;
};

export default NetworkStatus;