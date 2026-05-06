import { Form, Input, Button, message } from "antd";
import { useTranslation } from "react-i18next";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const {t} = useTranslation();
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
          {t("Biz bilan bog‘lanish")}
        </h2>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Chap: Xarita */}
          <div className="lg:w-2/3 h-130 rounded-xl overflow-hidden shadow-md">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.6!2d69.1757906!3d41.2868481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38aef5d...!2sChilonzor%2023!5e0!3m2!1sen!2s!4v0000000000"
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
                label={t("Ismingiz")}
                name="name"
                rules={[
                  { required: true, message: t("Iltimos, ismingizni kiriting!") },
                ]}
              >
                <Input placeholder={t("Ismingiz")} size="large" />
              </Form.Item>

              <Form.Item
                label={t("Email")}
                name="email"
                rules={[
                  { required: true, message: t("Iltimos, email kiriting!") },
                  { type: "email", message: t("Email noto‘g‘ri formatda!") },
                ]}
              >
                <Input placeholder={t("Email")} size="large" />
              </Form.Item>

              <Form.Item
                label={t("Xabar")}
                name="message"
                rules={[{ required: true, message: t("Iltimos, xabar yozing!") }]}
              >
                <Input.TextArea placeholder={t("Xabar")} rows={5} size="large" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full lg:w-auto"
                >
                  {t("Yuborish")}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ContactSection;
