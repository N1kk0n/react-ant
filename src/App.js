import React, { useState } from "react";
import "./styles/App.css";
import MainPage from "./components/MainPage.js";
import LoginPage from "./components/LoginPage.js";

function App() {
	const [accessGranted, setAccess] = useState(true);
	const checkAccess = (username, password) => {
		//! TODO: check access
		console.log("username: " + username + ", password: " + password);
		setAccess(true);
	};
	const logout = () => {
		setAccess(false);
	};
	return (
		<div>
			{accessGranted ? (
				<MainPage logout={logout} />
			) : (
				<LoginPage check={checkAccess} />
			)}
		</div>
	);
}

export default App;
