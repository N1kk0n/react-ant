import React, { useState } from "react";
import "antd/dist/antd.css";
import "../styles/MainPage.css";
import { Layout, Menu } from "antd";
import {
	LeftOutlined,
	RightOutlined,
	EditOutlined,
	CommentOutlined,
	SettingOutlined,
	LogoutOutlined,
	OrderedListOutlined,
} from "@ant-design/icons";
import TablePage from "./TablePage";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const menuItems = [
	{
		id: 1,
		text: "Список заявок",
		value: "request-list",
	},
	{
		id: 2,
		text: "Новая заявка",
		value: "new-request",
	},
];

const getMenuIcon = (value) => {
	if (value === "new-request") {
		return <EditOutlined />;
	}
	if (value === "request-list") {
		return <OrderedListOutlined />;
	}
};

const MainPage = (props) => {
	const [menuOpened, setMenuOpen] = useState(false);
	const [activeMenuItem, setActiveMenuItem] = useState("request-list");
	const [contentTitle, setContentTitle] = useState("Список заявок");

	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const setContent = () => {
		if (activeMenuItem === "new-request") {
			return <h2>Поле новой заявки</h2>;
		}
		if (activeMenuItem === "request-list") {
			return <TablePage />;
		}
	};

	return (
		<Layout className="page">
			<Sider trigger={null} collapsible collapsed={!menuOpened}>
				{menuOpened ? (
					<LeftOutlined className="trigger" onClick={closeMenu} />
				) : (
					<RightOutlined className="trigger" onClick={openMenu} />
				)}
				<Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
					{menuItems.map((item) => (
						<Menu.Item
							key={item.id}
							icon={getMenuIcon(item.value)}
							onClick={() => {
								setActiveMenuItem(item.value);
								setContentTitle(item.text);
							}}
						>
							{item.text}
						</Menu.Item>
					))}
				</Menu>
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{ padding: 0 }}
				>
					<div className="header">
						<div className="header-title">{contentTitle}</div>
						<div className="header-buttons">
							<Menu
								mode="horizontal"
								disabledOverflow
								selectedKeys={[]}
							>
								<Menu.Item
									key="button"
									icon={<CommentOutlined />}
								>
									Button
								</Menu.Item>
								<SubMenu
									key="submenu"
									icon={<SettingOutlined />}
									title="Submenu"
								>
									<Menu.ItemGroup title="Item 1">
										<Menu.Item key="setting:1">
											Option 1
										</Menu.Item>
										<Menu.Item key="setting:2">
											Option 2
										</Menu.Item>
									</Menu.ItemGroup>
									<Menu.ItemGroup title="Item 2">
										<Menu.Item key="setting:3">
											Option 3
										</Menu.Item>
										<Menu.Item key="setting:4">
											Option 4
										</Menu.Item>
									</Menu.ItemGroup>
								</SubMenu>
								<Menu.Item
									key="logout"
									icon={<LogoutOutlined />}
									onClick={() => {
										props.logout();
									}}
								>
									Выход
								</Menu.Item>
							</Menu>
						</div>
					</div>
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: "24px 16px",
						padding: 24,
						minHeight: 280,
					}}
				>
					{setContent()}
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainPage;
