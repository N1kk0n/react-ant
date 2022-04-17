import React from "react";
import "antd/dist/antd.css";
import "../styles/MainPage.css";
import { Layout, Menu } from "antd";
import {
	LeftOutlined,
	RightOutlined,
	EditOutlined,
	OrderedListOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

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

class MainPage extends React.Component {
	state = {
		collapsed: true,
		activeMenuItem: "request-list",
		contentTitle: "Список заявок",
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	setMenuItem = (item) => {
		let title = "";
		if (item === "new-request") {
			title = "Поле новой заявки";
		}
		if (item === "request-list") {
			title = "Список заявок";
		}

		this.setState({
			activeMenuItem: item,
			contentTitle: title,
		});
	};

	setContentTitle = (title) => {
		this.setState({});
	};

	setContent = () => {
		// ! TODO: get content using axios
		if (this.state.activeMenuItem === "new-request") {
			console.log("new-request");
			return <h2>Поле новой заявки</h2>;
		}
		if (this.state.activeMenuItem === "request-list") {
			console.log("request-list");
			return <h2>Список заявок</h2>;
		}
	};

	render() {
		return (
			<Layout className="page">
				<Sider
					trigger={null}
					collapsible
					collapsed={this.state.collapsed}
				>
					{React.createElement(
						this.state.collapsed ? RightOutlined : LeftOutlined,
						{
							className: "trigger",
							onClick: this.toggle,
						}
					)}

					<Menu
						theme="dark"
						mode="inline"
						defaultSelectedKeys={["1"]}
					>
						{menuItems.map((item) => (
							<Menu.Item
								key={item.id}
								icon={getMenuIcon(item.value)}
								onClick={() => this.setMenuItem(item.value)}
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
						<h2 className="content-title">
							{this.state.contentTitle}
						</h2>
					</Header>
					<Content
						className="site-layout-background"
						style={{
							margin: "24px 16px",
							padding: 24,
							minHeight: 280,
						}}
					>
						{this.setContent()}
					</Content>
				</Layout>
			</Layout>
		);
	}
}

export default MainPage;
