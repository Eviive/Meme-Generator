import React from "react";

import Draggable from "react-draggable";

export default function Text(props) {
	return (
		<Draggable
			bounds={"parent"}
		>
			<span className="text">
				{props.text}
			</span>
		</Draggable>
	);
}