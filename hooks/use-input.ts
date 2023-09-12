"use client";

import { useState } from "react";

export const useInput = () => {
	const [value, setValue] = useState<string>("");
	const onChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		console.log(e.target.value);

		setValue(e.target.value);
	};

	return {
		value,
		onChange,
	};
};
