import { Layout, Typography } from 'antd';
import { useTranslation } from 'react-i18next';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const AdminFooter = () => {
    const { t } = useTranslation();

    const lastUpdated = new Date();
    const formattedDate = lastUpdated.toLocaleDateString('uz-UZ');
    const formattedTime = lastUpdated.toLocaleTimeString('uz-UZ', {
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <AntFooter className='' style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: 14 }}>
                {t('footer.copyright')} • {t('footer.last_update')} {formattedDate} {formattedTime}
            </Text>
        </AntFooter>
    );
};

export default AdminFooter;  