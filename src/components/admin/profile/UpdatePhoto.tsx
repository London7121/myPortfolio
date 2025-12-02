import { Avatar, Button, Tooltip, Upload } from "antd";
import { useState } from "react";
import { theme } from "antd";
import { TbPhotoDown } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { useUpdateProfilePhotoMutation } from "../../../service/api";
import { notify } from "../../../utils/notifay";

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

export default function UpdatePhoto({ profile }: { profile: Profile }) {
    const { token } = theme.useToken();

    const [upd_phote, { isLoading: photoLoading }] = useUpdateProfilePhotoMutation();
    const [hovered, setHovered] = useState(false);
    const { t } = useTranslation();

    return (
        <div>
            <div
                className="relative group"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ width: 280, height: 280 }}
            >
                <Avatar
                    src={profile?.image}
                    size={295}
                    shape="circle"
                    style={{
                        border: `1px solid ${token?.colorPrimary || "#1677ff"}`,
                        boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                        cursor: "pointer",
                        transition: "0.3s",
                        opacity: hovered ? 0.8 : 1,
                        objectFit:"cover"
                    }}
                />

                <div
                    className={`absolute inset-0 w-[295px] h-[295px] flex items-end justify-center rounded-full transition-all duration-300 
                        ${hovered ? "bg-black/40 opacity-100" : "opacity-0"}`}
                >
                    <Tooltip title={t("buttons.edit")}>
                        <Upload
                            disabled={photoLoading}
                            listType="picture"
                            maxCount={1}
                            beforeUpload={async (file) => {
                                const isImage = file.type.startsWith("image/");
                                if (!isImage) {
                                    notify.message.error("Faqat rasm fayllari yuklash mumkin!");
                                    return Upload.LIST_IGNORE;
                                }

                                const formData = new FormData();
                                formData.append("file", file);

                                try {
                                    await upd_phote(formData).unwrap();
                                    notify.message.success("Rasm yuklandi!");
                                    setHovered(false)
                                } catch (error) {
                                    console.error("Xatolik:", error);
                                    notify.message.error("Rasm yuklashda xatolik!");
                                }

                                return false;
                            }}
                            showUploadList={false}
                        >
                            <Button
                                danger
                                type="primary"
                                shape="circle"
                                size="large"
                                loading={photoLoading}
                                icon={<TbPhotoDown size={26} className="mt-1.5" />}
                                style={{ marginBottom: 10, width: "55px", height: "55px" }}
                            />
                        </Upload>
                    </Tooltip>
                </div>
            </div>
        </div>
    )
}