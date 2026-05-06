import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { FaGlobe } from 'react-icons/fa6';
const { Option } = Select;

const LangSelect = () => {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();

    const langFromURL = searchParams.get('lang');
    const defaultLang = localStorage.getItem('lang') || 'uz';
    const currentLang = langFromURL || defaultLang;

    useEffect(() => {
        if (i18n.language !== currentLang) {
            i18n.changeLanguage(currentLang);
        }

        localStorage.setItem('lang', currentLang);

        if (!langFromURL) {
            const params = new URLSearchParams(searchParams);
            params.set('lang', currentLang);
            navigate(`${location.pathname}?${params.toString()}`, { replace: true });
        }
    }, [currentLang, i18n, langFromURL, navigate, location.pathname, searchParams]);

    const handleChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('lang', value);
        setSearchParams(params);
        i18n.changeLanguage(value);
        localStorage.setItem('lang', value);
    };

    return (
        <Select
            suffixIcon={<FaGlobe size={20} />}
            value={currentLang}
            onChange={handleChange}
            style={{ width: 74 }}
            size="large"
        >
            <Option value="uz">UZ</Option>
            <Option value="ru">RU</Option>
            <Option value="en">EN</Option>
        </Select>
    );
};

export default LangSelect;