import { BASE_URL } from "@/constants";
import { fetchWithToken } from "../utils";

export const getAllThread = async () => {
	try {
		const request = await fetch(`${BASE_URL}/threads`, {
			cache: "no-cache",
		});
		const response = await request.json();

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const getDetailThread = async (id: string) => {
	try {
		const request = await fetch(`${BASE_URL}/threads/${id}`, {
			method: "GET",
			cache: "no-cache",
		});
		const response = await request.json();

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const createThread = async (threadPayload: {
	title: string;
	body: string;
}) => {
	try {
		const request = await fetchWithToken(`${BASE_URL}/threads`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(threadPayload),
		});
		const response = await request.json();
		return {
			error: false,
			message: response.message,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const createComment = async (threadId: string, content: string) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/comments`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content,
				}),
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const upVoteComment = async (threadId: string, commentId: number) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const neutralizeCommentVote = async (
	threadId: string,
	commentId: number
) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const downVoteComment = async (threadId: string, commentId: number) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const upVoteThread = async (threadId: string) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/up-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};
export const downVoteThread = async (threadId: string) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/down-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};

export const neutralizeVoteThread = async (threadId: string) => {
	try {
		const request = await fetchWithToken(
			`${BASE_URL}/threads/${threadId}/neutral-vote`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		const response = await request.json();
		return {
			error: false,
			message: response.message,
			status: response.status,
		};
	} catch (error) {
		return {
			error: true,
			message: error,
		};
	}
};
