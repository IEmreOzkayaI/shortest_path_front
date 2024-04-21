import {useState} from "react";

export const useButton = (handleType) => {
	const [button, setButton] = useState("distance");

	const handleClick = (e) => {
		setButton(e.target.id);
		handleType(e.target.id);
	};

	return {button, handleClick};
};
