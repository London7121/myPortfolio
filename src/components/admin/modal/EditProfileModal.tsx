import { Modal, Form, Input, message, Select } from 'antd';
import { useEffect } from 'react';
import type { UploadFile } from 'antd/es/upload/interface';
import { useGetUserRolesQuery, useUpdateProfileMutation } from '../../../service/api';

interface Profile {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    // roles: number[];
    role: string[];
    phone: string;
    pinfl: string | number;
    status: string;
    statusCode: number;
    image?: string;
}

interface EditProfileModalProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: Profile) => void;
    initialValues: Profile | null;
}

interface FormValues extends Omit<Profile, 'image'> {
    avatar?: UploadFile[];
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ open, onCancel, initialValues }) => {
    const [form] = Form.useForm<FormValues>();
    const [upd_profile, { isLoading: updLoading }] = useUpdateProfileMutation();
    const { data: rolesData, isLoading: rolesLoading } = useGetUserRolesQuery({});
    const [api, contextHolder] = message.useMessage();

    useEffect(() => {
        if (open && initialValues) {
            form.setFieldsValue(initialValues);
        } else if (open && !initialValues) {
            form.resetFields();
        }
    }, [open, initialValues, form]);

    const handleFinish = async (values: FormValues) => {
        if (!initialValues) {
            api.error("Profil ma'lumotlari mavjud emas!");
            return;
        }

        const updatedFields: Record<string, unknown> = {};
        if (values.firstname !== initialValues?.firstname) {
            updatedFields.firstName = values.firstname;
        }
        if (values.lastname !== initialValues?.lastname) {
            updatedFields.lastName = values.lastname;
        }
        if (values.username !== initialValues?.username) {
            updatedFields.username = values.username;
        }
        if (values.pinfl !== initialValues?.pinfl) {
            updatedFields.pinfl = values.pinfl;
        }
        if (values.phone !== initialValues?.phone) {
            updatedFields.phone = values.phone;
        }
        if (values.role?.toString() !== initialValues?.role?.toString()) {
            updatedFields.roles = values.role;
        }

        if (Object.keys(updatedFields).length > 0) {
            try {
                await upd_profile(updatedFields).unwrap();
                api.success("Profil yangilandi!");
                onCancel();
            } catch (err) {
                console.error("Profil update xatosi:", err);
                api.error("Profilni yangilashda xatolik!");
            }
        } else {
            api.info("Hech qanday o'zgarish aniqlanmadi!");
        }
        form.resetFields();
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="Profilni tahrirlash"
                open={open}
                onCancel={onCancel}
                onOk={() => form.submit()}
                okText="Saqlash"
                cancelText="Bekor qilish"
                okButtonProps={{ loading: updLoading }}
            >
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item name="firstname" label="Ism" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastname" label="Familiya" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="pinfl" label="PINFL" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Telefon" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select loading={rolesLoading} mode="multiple" placeholder="Role tanlang">
                            {rolesData?.data?.map((r: { id: number; name: string }) => (
                                <Select.Option key={r?.id} value={r?.id}>
                                    {r.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default EditProfileModal