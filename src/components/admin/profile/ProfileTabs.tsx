import {
    Typography,
    Form,
    Button,
    Tag,
    Card,
    Divider,
    Modal,
    message,
    Input,
    theme,
} from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CheckCircleOutlined, EditOutlined, LockOutlined } from "@ant-design/icons";
import UpdatePhoto from "./UpdatePhoto";
import { useUpdateProfileMutation } from "../../../service/api";

interface Profile {
    id: number;
    firstname: string;
    lastname: string;
    phone: string;
    pinfl: string | number;
    role: string[];
    status: string;
    statusCode: number;
    username: string;
    image?: string;
}

const { Title, Text } = Typography;

interface PasswordValues {
    newPassword: string;
}

const ProfileTabs = ({
    profile,
    onEditClick,
}: {
    profile: Profile;
    onEditClick: () => void;
}) => {
    const { t } = useTranslation();
    const { token } = theme.useToken();

    const [form] = Form.useForm<PasswordValues>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changePassword, { isLoading }] = useUpdateProfileMutation();
    const [api, contextHolder] = message.useMessage();

    const handleFinish = async (values: PasswordValues) => {
        try {
            await changePassword({ password: values.newPassword }).unwrap();
            api.success(t("Password updated"));
            form.resetFields();
            setIsModalOpen(false);
        } catch {
            api.error(t("Error"));
        }
    };

    return (
        <Card
            style={{
                borderRadius: 24,
                padding: 28,
                margin: "0 auto",
                background: `linear-gradient(135deg, ${token.colorPrimary}10, ${token.colorBgContainer})`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            }}
        >
            {contextHolder}

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Profil rasmi */}
                <UpdatePhoto profile={profile} />

                {/* Ma'lumotlar */}
                <div className="flex-1 ml-5">
                    <div className="flex items-center justify-between">
                        <Title level={3} style={{ margin: 0, color: token.colorPrimary }}>
                            {profile?.firstname} {profile?.lastname}
                        </Title>
                        <div className="flex gap-2">
                            <Button
                                icon={<EditOutlined />}
                                type="primary"
                                onClick={onEditClick}
                            >
                                {t("buttons.edit")}
                            </Button>
                            <Button
                                icon={<LockOutlined />}
                                onClick={() => setIsModalOpen(true)}
                            >
                                {t("buttons.password")}
                            </Button>
                        </div>
                    </div>

                    <Divider style={{ margin: "12px 0" }} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Lastname */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                            >
                                {t("profile.lastName")}
                            </Text>
                            <Text style={{ color: token.colorPrimary }}
                                className="text-base font-medium"
                            >
                                {profile?.lastname}
                            </Text>
                        </div>
                        {/* Username */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                            >
                                {t("profile.username")}
                            </Text>
                            <Text style={{ color: token.colorPrimary }}
                                className="text-base font-medium"
                            >
                                {profile?.username}
                            </Text>
                        </div>
                        {/* Firstname */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                            >
                                {t("profile.firstName")}
                            </Text>
                            <Text style={{ color: token.colorPrimary }}
                                className="text-base font-medium"
                            >
                                {profile?.firstname}
                            </Text>
                        </div>

                        {/* Phone */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                            >
                                {t("profile.phone")}
                            </Text>
                            <Text copyable style={{ color: token.colorPrimary }}
                                className="text-base font-medium"
                            >
                                {profile?.phone}
                            </Text>
                        </div>

                        {/* Pinfl */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                            >
                                {t("profile.pinfl")}
                            </Text>
                            <Text copyable style={{ color: token.colorPrimary }}
                                className="text-base font-medium"
                            >
                                {profile?.pinfl}
                            </Text>
                        </div>

                        {/* Roles */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text style={{ color: token.colorTextSecondary }}>
                                {t("profile.roles")}
                            </Text>
                            {Array.isArray(profile?.role) && profile?.role?.map((r: string, index: number) => (
                                <Tag
                                    key={index}
                                    color="blue"
                                    style={{
                                        fontSize: 14,
                                        borderRadius: 6,
                                        padding: "5px",
                                        display: "flex"
                                        // color: token.colorText,
                                    }}
                                >
                                    {r || "---"}
                                </Tag>
                            ))}
                        </div>

                        {/* Status */}
                        <div className="gap-1 flex flex-col items-start">
                            <Text
                                style={{ color: token.colorTextSecondary }}
                                className="dark:text-gray-400"
                            >
                                {t("profile.status")}
                            </Text>
                            <Tag
                                color={profile.statusCode === 50 ? "green" : "red"}
                                style={{
                                    fontSize: 16,
                                    borderRadius: 6,
                                    padding: "5px"
                                    // color: token.colorText,
                                }}
                                icon={<CheckCircleOutlined />}
                            >
                                {profile.status}
                            </Tag>
                        </div>
                    </div>

                </div>
            </div>

            {/* Modal */}
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={() => form.submit()}
                cancelButtonProps={{ danger: true, type: "primary" }}
                okButtonProps={{ loading: isLoading }}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="newPassword"
                        label={t("Password")}
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input.Password placeholder={t("Password")} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default ProfileTabs;