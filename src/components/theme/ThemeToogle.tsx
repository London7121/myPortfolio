// components/ThemeToggle.tsx
import { Segmented } from 'antd';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import type { ThemeContextType } from '../../context/ThemeContext';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useContext(ThemeContext) as ThemeContextType;

    return (
        <Segmented
            value={theme}
            shape="round"
            options={[
                {
                    value: 'light',
                    icon: <SunOutlined />,
                },
                {
                    value: 'dark',
                    icon: <MoonOutlined />,
                },
            ]}
            onChange={(val) => {
                if (val !== theme) toggleTheme();
            }}
        />
    );
};

export default ThemeToggle;