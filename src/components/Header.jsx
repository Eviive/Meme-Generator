import React from "react";

import logo from "../images/logo.svg";

export default function Header() {
	return (
		<header>
			<div>
				<img src={logo} alt="Troll logo" />
				<h1>Meme Generator</h1>
			</div>
			<h3>React Course</h3>
		</header>
	);
}