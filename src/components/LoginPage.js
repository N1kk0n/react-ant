import React from "react";
import "antd/dist/antd.css";
import "../styles/LoginPage.css";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const LoginPage = (props) => {
	const onFinish = (values) => {
		props.check(values.username, values.password);
	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
		>
			<Form.Item>
				<h2 className="login-form-header">HELLO</h2>
			</Form.Item>
			<Form.Item
				name="username"
				rules={[
					{
						required: true,
						message: "Пожалуйста введите имя пользователя!",
					},
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Пользователь"
				/>
			</Form.Item>
			<Form.Item
				name="password"
				rules={[
					{
						required: true,
						message: "Пожалуйста введите пароль!",
					},
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Пароль"
				/>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
					className="login-form-button"
				>
					Вход
				</Button>
			</Form.Item>
		</Form>
	);
};

export default LoginPage;
