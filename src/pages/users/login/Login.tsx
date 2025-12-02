import { Input, Button, Checkbox, Form } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
// import { useLoginMutation } from "../../../services/api";
// import { useNavigate } from "react-router-dom";
// import { useAppDispatch } from "../../../store/hook";
// import { setToken } from "../../../store/auth/authSlice";
// import { notify } from "../../../utils/notifay";

export default function Login() {
    // const dispatch = useAppDispatch();
    // const navigate = useNavigate();
    // const [login, { isLoading }] = useLoginMutation();


    type LoginFormValues = {
        username: string;
        password: string;
        remember?: boolean;
    };

    const onFinish = async (values: LoginFormValues) => {
        // try {
        //     const response = await login({
        //         username: values.username,
        //         password: values.password,
        //     }).unwrap();
        //     dispatch(setToken(response.token));
        //     notify.success("Kirish muvaffaqiyatli!");
        //     console.log("Login response:", response);
        //     navigate("/admin");
        //     if (values.remember) {
        //         localStorage.setItem("token", response.token);
        //     }

        // } catch (error: unknown) {
        //     if (typeof error === "object" && error !== null) {
        //         const err = error as Record<string, unknown>;
        //         const data = err["data"] as Record<string, unknown> | undefined;
        //         if (data && typeof data["message"] === "string") {
        //             message.error(data["message"]);
        //         } else {
        //             message.error("Kirishda xatolik yuz berdi!");
        //         }
        //     } else {
        //         message.error("Kirishda xatolik yuz berdi!");
        //     }
        //     console.error("Login error:", error);
        // }
        console.log(values)
    };

    return (
        <div className="flex items-center justify-center my-14 mx-4">
            <div className="p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-500">
                <h2 className="text-3xl font-bold text-center text-white mb-6">
                    Login
                </h2>

                <Form
                    name="login_form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        rules={[{ required: true, message: "Username kiriting!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="text-gray-400" />}
                            placeholder="Username"
                            size="large"
                            className="rounded-lg bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring focus:ring-blue-500/30"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: "Password kiriting!" }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="text-gray-400" />}
                            placeholder="Password"
                            size="large"
                            className="rounded-lg bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:border-purple-500 focus:ring focus:ring-purple-500/30"
                        />
                    </Form.Item>

                    <Form.Item className="flex justify-between items-center">
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox className="text-white">Remember me</Checkbox>
                        </Form.Item>
                        <a href="#" className="text-blue-400 hover:underline text-sm">
                            Forgot password?
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            size="large"
                            className="rounded-lg bg-linear-to-r from-blue-400 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            loading={false}
                        >
                            Log In
                        </Button>
                    </Form.Item>
                </Form>

                <p className="text-center text-gray-400 mt-4 text-sm">
                    Yoki <a href="#" className="text-blue-400 hover:underline">Ro'yxatdan o'ting</a>
                </p>
            </div>
        </div>
    );
}