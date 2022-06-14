import React, { useState } from "react";
import { Radio, Button, Table, Spin } from "antd";
import "antd/dist/antd.css";
import "../styles/CheckDocPage.css";
import ModalFileList from "./ModalFileList";
import Services from "../API/Services";

const choose_button = "Выбрать файл";
const class_button = "Классифицировать";

const checkResultColumns = [
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
		key: "percent",
		title: "Percent",
		dataIndex: "percent",
	},
];

const fakeCheckResultData = [
	{
		id: 1,
		name: "abc",
		percent: 12,
	},
	{
		id: 2,
		name: "bcd",
		percent: 13,
	},
	{
		id: 3,
		name: "cde",
		percent: 14,
	},
];

const ClassifyDocPage = () => {
	const [classifyDisabled, disableClassify] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [classFile, setClassFile] = useState({});

	const setFileForCheck = (file) => {
		disableClassify(false);
		setClassFile(file);
	};

	const [result, setResult] = useState([]);
	const [inProgress, setInProgress] = useState(false);
	const [isDone, setIsDone] = useState(false);

	const classify = () => {
		setInProgress(true);
		setTimeout(() => {
			setResult(fakeCheckResultData);
			setIsDone(true);
			setInProgress(false);
		}, 5000);
	};

	return (
		<div>
			<ModalFileList
				setFile={setFileForCheck}
				visible={modalVisible}
				setVisible={setModalVisible}
			/>

			<div className="buttons-area">
				<Button
					type="primary"
					ghost
					onClick={() => setModalVisible(true)}
				>
					{choose_button}
				</Button>
				<div>
					<Button
						type="primary"
						ghost
						disabled={classifyDisabled}
						onClick={() => classify()}
					>
						{class_button}
					</Button>
				</div>
			</div>
			<div className="text-area">
				{classFile.name !== undefined ? (
					<p> Выбран файл: {classFile.name} </p>
				) : (
					<p>Файл не выбран</p>
				)}
			</div>
			<div className="table-area">
				{inProgress ? (
					<Spin size="large" />
				) : isDone ? (
					result.length !== 0 ? (
						<Table
							columns={checkResultColumns}
							dataSource={result}
							pagination={{ position: ["none"] }}
						/>
					) : (
						<p> Плагиата не найдено </p>
					)
				) : (
					""
				)}
			</div>
		</div>
	);
};

export default ClassifyDocPage;
