import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import "../styles/TablePage.css";
import { Table, Button, Popconfirm, message } from "antd";
import Services from "../API/Services";
const columns = [
	{
		key: "id",
		title: "ID",
		dataIndex: "id",
		width: "10%",
	},
	{
		key: "name",
		title: "Name",
		dataIndex: "name",
	},
	{
		key: "username",
		title: "Username",
		dataIndex: "username",
	},
	{
		key: "email",
		title: "Email",
		dataIndex: "email",
		width: "20%",
	},
];

const TablePage = () => {
	const [data, setData] = useState([]);
	const [buttonDisabled, disableButton] = useState(true);
	const [selectedRow, selectRow] = useState(-1);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 4,
		hideOnSinglePage: true,
	});

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			let row = selectedRows[0];
			selectRow(row.id);
			disableButton(false);
		},
	};

	const confirmDelete = (e) => {
		setData(data.filter((d) => d.id !== selectedRow));
		//! TODO: delete data using axios

		message.success("Deleted row: " + selectedRow);
		selectRow(-1);
	};

	async function axiosData(pageNumber) {
		setLoading(true);
		const response = await Services.getUsers(
			pagination.pageSize,
			pageNumber
		);
		let total = response.headers["x-total-count"];
		if (total !== undefined) {
			setPagination({
				...pagination,
				current: pageNumber,
				total: total,
			});
		} else {
			setPagination({ hideOnSinglePage: true });
		}
		let data = response.data;
		data.forEach((i) => (i.key = i.id));
		setData(data);
		setLoading(false);
	}

	useEffect(() => {
		axiosData(1);
	}, []);

	return (
		<div>
			<div className="buttons-area">
				<Button type="primary" ghost disabled={buttonDisabled}>
					Primary
				</Button>
				<Popconfirm
					title="Are you sure to delete this task?"
					placement="bottomRight"
					okButtonProps={{ danger: "true", size: "middle" }}
					onConfirm={confirmDelete}
					cancelButtonProps={{ size: "middle" }}
					okText="Yes"
					cancelText="No"
				>
					<Button
						type="primary"
						danger
						ghost
						disabled={buttonDisabled}
					>
						Danger
					</Button>
				</Popconfirm>
			</div>
			<div className="table-area">
				<Table
					pagination={pagination}
					rowSelection={{ type: "radio", ...rowSelection }}
					columns={columns}
					dataSource={data}
					loading={loading}
					onChange={(pagination) => {
						axiosData(pagination.current);
					}}
				/>
			</div>
		</div>
	);
};

export default TablePage;
