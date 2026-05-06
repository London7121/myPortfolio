import { Layout, Row, Col, Typography, Space, theme } from "antd";
import {
    FacebookFilled,
    InstagramFilled,
    TwitterCircleFilled,
    LinkedinFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FaTelegram } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

const { Footer } = Layout;
const { Title, Text } = Typography;

const AppFooter = () => {
    const {t} = useTranslation();
    const {
        token: { colorBgContainer, colorText },
    } = theme.useToken();
    return (
        <Footer style={{ background: colorBgContainer, color: colorText, padding: "60px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <Row gutter={[32, 32]}>
                    {/* Brand */}
                    <Col xs={24} md={6}>
                        <Title className="logo-title" level={3} style={{ color: colorText, marginBottom: 16 }}>
                            Kamol Juraev
                        </Title>
                        <Text style={{ color: colorText }}>
                            Frontend development.
                        </Text>
                    </Col>

                    {/* Quick Links */}
                    <Col xs={12} md={6}>
                        <Title level={5} style={{ color: colorText, marginBottom: 16 }}>
                            {t("Tezkor havolalar")}
                        </Title>
                        <Space direction="vertical" size={8}>
                            <Link to="/" style={{ color: colorText }}>{t("Bosh sahifa")}</Link>
                            <Link to="/home/experience" style={{ color: colorText }}>{t("Tajriba")}</Link>
                            <Link to="/home/skills" style={{ color: colorText }}>{t("Ko'nikmalar")}</Link>
                            <Link to="/home/about" style={{ color: colorText }}>{t("Biz haqimizda")}</Link>
                            <Link to="/home/contact" style={{ color: colorText }}>{t("Bog'lanish")}</Link>
                        </Space>
                    </Col>

                    {/* Contact */}
                    <Col xs={12} md={6}>
                        <Title level={5} style={{ color: colorText, marginBottom: 16 }}>
                            {t("Bog'lanish")}
                        </Title>
                        <Space direction="vertical" size={8}>
                            <Text style={{ color: colorText }}>kamoljuraev7721@gmail.com</Text>
                            <Text style={{ color: colorText }}>Tel: +998 93 637 90 67</Text>
                            <Text style={{ color: colorText }}>Manzil: Toshkent shahar, chilonzor, 23-kvartal</Text>
                            {/* <Text style={{ color: colorText }}>Aloqa markazi: 1198</Text> */}
                        </Space>
                    </Col>

                    {/* Social */}
                    <Col xs={24} md={6}>
                        <Title level={5} style={{ color: colorText, marginBottom: 16 }}>
                            {t("Ijtimoiy tarmoqlar")}
                        </Title>
                        <Space size={18} style={{ fontSize: 22 }}>
                            <a href="https://t.me/kamoljurayev"><FaTelegram style={{ color: colorText }} /></a>
                            <a href="#"><FacebookFilled style={{ color: colorText }} /></a>
                            <a href="#"><InstagramFilled style={{ color: colorText }} /></a>
                            <a href="#"><TwitterCircleFilled style={{ color: colorText }} /></a>
                            <a href="#"><LinkedinFilled style={{ color: colorText }} /></a>
                        </Space>
                    </Col>

                </Row >

                {/* Bottom Text */}
                <div
                    style={{
                        borderTop: "1px solid #374151",
                        marginTop: 30,
                        paddingTop: 20,
                        textAlign: "center",
                    }}
                >
                    <Text style={{ color: colorText, fontSize: 13 }}>
                        © 2025 KamolJuraev. {t("Barcha huquqlar himoyalangan.")}
                    </Text>
                </div>
            </div >
        </Footer >
    );
};

export default AppFooter;