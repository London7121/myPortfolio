import { Form, Input, Button, message } from "antd";

interface ContactFormValues {
    name: string;
    email: string;
    message: string;
}

const ContactSection = () => {
    const [form] = Form.useForm();

    const onFinish = (values: ContactFormValues) => {
        console.log("Form values:", values);
        message.success("Xabar muvaffaqiyatli yuborildi!");
        form.resetFields();
    };

    return (
        <section className="py-16">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <h2 className="text-3xl font-bold text-gray-600 mb-10 text-center">
                    Biz bilan bog‘lanish
                </h2>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Chap: Xarita */}
                    <div className="lg:w-2/3 h-130 rounded-xl overflow-hidden shadow-md">
                        <iframe
                            src="https://www.google.com/maps/search/%D1%87%D0%B8%D0%BB%D0%B0%D0%BD%D0%B7%D0%B0%D1%80-23+49a/@41.2868481,69.1757906,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MTEyMy4xIKXMDSoASAFQAw%3D%3D"
                            width="100%"
                            height="100%"
                            loading="lazy"
                        ></iframe>
                    </div>

                    {/* O‘ng: Form */}
                    <div className="lg:w-1/3 border border-gray-500 rounded-xl shadow-md p-8">
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={onFinish}
                            className="space-y-4"
                        >
                            <Form.Item
                                label="Ismingiz"
                                name="name"
                                rules={[{ required: true, message: "Iltimos, ismingizni kiriting!" }]}
                            >
                                <Input placeholder="Ismingiz" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    { required: true, message: "Iltimos, email kiriting!" },
                                    { type: "email", message: "Email noto‘g‘ri formatda!" },
                                ]}
                            >
                                <Input placeholder="Email" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Xabar"
                                name="message"
                                rules={[{ required: true, message: "Iltimos, xabar yozing!" }]}
                            >
                                <Input.TextArea placeholder="Xabar" rows={5} size="large" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="w-full lg:w-auto">
                                    Yuborish
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default ContactSection