import React, { useState, useEffect } from "react";
import { Table, Button, Upload, message, Empty, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Services from "../API/Services";

const nodata = "Нет данных";

const docListColumns = [
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
		key: "year",
		title: "Year",
		dataIndex: "year",
	},
];

const ModalFileList = ({ setFile, visible, setVisible }) => {
	const [data, setData] = useState([]);
	const [selectedRow, selectRow] = useState(-1);
	const [removeDisabled, disableRemove] = useState(true);
	const [selectDisabled, disableSelect] = useState(true);
	const [loading, setLoading] = useState(false);
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		hideOnSinglePage: true,
	});

	const uploadProps = {
		multiple: true,
		showUploadList: false,
		name: "file",
		//action: "https://upload_url...",

		onChange(info) {
			if (info.file.status !== "uploading") {
				console.log(info.file, info.fileList);
			}
			if (info.file.status === "done") {
				message.success(`[${info.file.name}] успешно загружен`);
			} else if (info.file.status === "error") {
				message.error(
					`Во время загрузки [${info.file.name}] произошла ошибка`
				);
			}
		},
	};

	const rowSelection = {
		onChange: (selectedRowKeys, selectedRows) => {
			let row = selectedRows[0];
			selectRow(row.id);
			disableRemove(false);
			setFile(row);
		},
	};

	async function axiosData(pageNumber) {
		setLoading(true);
		const response = await Services.getDocuments(
			pagination.pageSize,
			pageNumber
		);

		setPagination({
			...pagination,
			current: pageNumber,
			total: response.data.total,
		});

		let data = response.data.data;
		data.forEach((i) => (i.key = i.id));
		setData(data);
		setLoading(false);
	}

	useEffect(() => {
		axiosData(1);

		return () => {
			console.log("row -1 selected");
			selectRow(-1);
		};
	}, []);

	return (
		<Modal
			title="Выберите файл"
			centered
			visible={visible}
			okText="Выбрать"
			cancelText="Отмена"
			onOk={() => setVisible(false)}
			onCancel={() => {
				setVisible(false);
				setFile({});
			}}
			width={1000}
		>
			<div className="buttons-area">
				<Upload {...uploadProps}>
					<Button icon={<UploadOutlined />}>
						Загрузить документ
					</Button>
				</Upload>
				<Button type="primary" danger ghost disabled={removeDisabled}>
					Удалить документ
				</Button>
			</div>
			<div className="table-area">
				{data.length !== 0 ? (
					<Table
						pagination={pagination}
						rowSelection={{ type: "radio", ...rowSelection }}
						columns={docListColumns}
						dataSource={data}
						loading={loading}
						onChange={(pagination) => {
							axiosData(pagination.current);
						}}
					/>
				) : (
					<Empty description={nodata} />
				)}
			</div>
		</Modal>
	);
};
export default ModalFileList;
