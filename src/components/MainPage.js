import React, { useState } from "react";
import "antd/dist/antd.css";
import "../styles/MainPage.css";
import { Layout, Menu } from "antd";
import {
	LeftOutlined,
	RightOutlined,
	CopyrightOutlined,
	FileSearchOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import CheckDocPage from "./CheckDocPage";
import ClassifyDocPage from "./ClassifyDocPage";

const { Header, Sider, Content } = Layout;

const menuItems = [
	{
		id: 1,
		text: "Проверка документа",
		value: "doc-check",
	},
	{
		id: 2,
		text: "Классификация документа",
		value: "doc-classify",
	},
];

const getMenuIcon = (value) => {
	if (value === "doc-check") {
		return <CopyrightOutlined />;
	}
	if (value === "doc-classify") {
		return <FileSearchOutlined />;
	}
};

const MainPage = (props) => {
	const [menuOpened, setMenuOpen] = useState(false);
	const [activeMenuItem, setActiveMenuItem] = useState("doc-check");
	const [contentTitle, setContentTitle] = useState("Проверка документа");

	const openMenu = () => {
		setMenuOpen(true);
	};

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const setContent = () => {
		if (activeMenuItem === "doc-check") {
			return <CheckDocPage />;
		}
		if (activeMenuItem === "doc-classify") {
			return <ClassifyDocPage />;
		}
	};

	return (
		<Layout className="page">
			<Sider
				trigger={null}
				collapsible
				width={250}
				collapsed={!menuOpened}
			>
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
							{/* <Menu
								mode="horizontal"
								disabledOverflow
								selectedKeys={[]}
							>
								<Menu.Item
									key="logout"
									icon={<LogoutOutlined />}
									onClick={() => {
										props.logout();
									}}
								>
									Выход
								</Menu.Item>
							</Menu> */}
						</div>
					</div>
				</Header>
				<Content
					className="site-layout-background"
					style={{
						margin: "16px 16px",
						padding: 16,
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
