"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { getCurrentUser } from "@/lib/auth";
import { createThread } from "@/lib/thread";

const CreateThread = () => {
	const Router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [threadPayload, setThreadPayload] = useState({
		title: "",
		body: "",
	});
	const [user, setUser] = useState<{
		id: string;
		name: string;
		email: string;
		avatar: string;
	}>();

	const handleOnChangeInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setThreadPayload({
			...threadPayload,
			[e.target.name]: e.target.value,
		});
	};

	const handleCreateThread = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		await toast.promise(createThread(threadPayload), {
			pending: "Processing",
			error: "Error",
			success: "Thread Created",
		});
		setThreadPayload({
			title: "",
			body: "",
		});
		Router.refresh();
	};

	useEffect(() => {
		const fetchUser = async () => {
			const result = await getCurrentUser();
			setUser(result.data.user);
			setIsLoading(false);
		};

		fetchUser();
	}, []);

	return (
		<div className="flex p-3 h-fit relative">
			{isLoading ? (
				<div className="w-12 h-12 rounded-full animate-pulse bg-brand-gray-200"></div>
			) : (
				<Image
					alt="showing profile image"
					src={user?.avatar as string}
					width={48}
					height={48}
					className="w-12 h-12 rounded-full object-cover"
				/>
			)}
			<form
				onSubmit={handleCreateThread}
				className="relative w-full h-full mx-auto max-w-[500px]">
				<input
					name="title"
					onChange={handleOnChangeInput}
					value={threadPayload.title}
					type="text"
					placeholder="Title"
					required
					className="w-full mb-5 placeholder:to-brand-gray-200 bg-transparent ctive:outline-none focus:outline-none text-[15px]"
				/>
				<textarea
					onChange={handleOnChangeInput}
					value={threadPayload.body}
					name="body"
					required
					placeholder="Whats is happening?!"
					className="text-white text-[15px] resize-none placeholder:text-brand-gray-200 w-full bg-transparent active:outline-none focus:outline-none"></textarea>
				<button
					type="submit"
					className="absolute right-2 bottom-2 font-bold text-[15px] bg-brand-blue-main h-9 px-4 rounded-full">
					Post
				</button>
			</form>
		</div>
	);
};

export default CreateThread;
