import React, { useState } from "react";
import { Radio, Button, Table, Spin } from "antd";
import "antd/dist/antd.css";
import "../styles/CheckDocPage.css";
import ModalFileList from "./ModalFileList";
import Services from "../API/Services";

const choose_button = "Выбрать файл";
const check_button = "Проверить";

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

const CheckDocPage = () => {
	const [checkDisabled, disableCheck] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);
	const [checkedFile, setCheckedFile] = useState({});

	const setFileForCheck = (file) => {
		disableCheck(false);
		setCheckedFile(file);
	};

	const [checkMode, setCheckMode] = useState("service");
	const onChangeCheckMode = (e) => {
		setCheckMode(e.target.value);
	};

	const [checkResult, setCheckResult] = useState([]);
	const [checkInProgress, setCheckInProgress] = useState(false);
	const [checkDone, setCheckDone] = useState(false);

	const check = () => {
		setCheckInProgress(true);
		setTimeout(() => {
			setCheckResult(fakeCheckResultData);
			setCheckDone(true);
			setCheckInProgress(false);
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
					<Radio.Group onChange={onChangeCheckMode} value={checkMode}>
						<Radio value="service">Проверка через сервис</Radio>
						<Radio value="database">Проверка через базу</Radio>
					</Radio.Group>
					<Button
						type="primary"
						ghost
						disabled={checkDisabled}
						onClick={() => check()}
					>
						{check_button}
					</Button>
				</div>
			</div>
			<div className="text-area">
				{checkedFile.name !== undefined ? (
					<p> Выбран файл: {checkedFile.name} </p>
				) : (
					<p>Файл не выбран</p>
				)}
			</div>
			<div className="table-area">
				{checkInProgress ? (
					<Spin size="large" />
				) : checkDone ? (
					checkResult.length !== 0 ? (
						<Table
							columns={checkResultColumns}
							dataSource={checkResult}
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

export default CheckDocPage;
