import { fetchWithToken } from "../utils";
import { BASE_URL } from "@/constants";

export const getCurrentUser = async () => {
	try {
		const request = await fetchWithToken(`${BASE_URL}/users/me`);
		const response = await request.json();

		return response;
	} catch (error) {
		console.log(error);
	}
};

export const login = async (loginPayload: {
	email: string;
	password: string;
}) => {
	try {
		const request = await fetchWithToken(`${BASE_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginPayload),
		});
		const result = await request.json();

		const access_token = result.data.token;
		const currentDate = new Date();
		currentDate.setDate(currentDate.getDate() + 1);
		const expiresIn = currentDate.getTime() / 1000;

		if (!access_token) {
			return {
				error: true,
				message: result.message,
			};
		}

		if (typeof document !== "undefined") {
			document.cookie = `access_token=${access_token}; expiresIn=${expiresIn}; path=/`;
		}

		return {
			error: false,
			message: result.message,
		};
	} catch (error) {
		return {
			error: true,
			message: "Ups.. Something error",
		};
	}
};

export const signOut = () => {
	document.cookie = `access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
	document.cookie = `avatar=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
	return {
		error: false,
		message: "Sign out successfully",
	};
};

export const signUp = async (registerPayload: {
	name: string;
	email: string;
	password: string;
}) => {
	try {
		const request = await fetch(`${BASE_URL}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerPayload),
		});
		const result = await request.json();
		return {
			error: false,
			message: result.message,
		};
	} catch (error) {
		console.log(error);
	}
};
