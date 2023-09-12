import { BASE_URL } from "@/constants";

export const getCookie = (name: string) => {
	if (typeof document !== "undefined") {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts && parts.length > 1) {
			return parts[1].split(";")[0];
		}
	}
};

export const getAccesToken = () => getCookie("access_token");

export const fetchWithToken = async (
	url: string,
	options?: {
		body?: any;
		headers?: any;
		method?: string;
	}
) => {
	return fetch(url, {
		...options,
		headers: {
			...options?.headers,
			Authorization: `Bearer ${getAccesToken()}`,
		},
		cache: "no-cache",
		next: {
			revalidate: 1,
		},
		body: options?.body,
	});
};

export const convertTime = (time: string) => {
	return time.split("T")[1].split(".")[0];
};

export const getLeaderboards = async () => {
	try {
		const request = await fetch(`${BASE_URL}/leaderboards`);
		const response = await request.json();
		return {
			error: false,
			leaderboards: response.data.leaderboards,
		};
	} catch (error) {
		console.log(error);
	}
};
