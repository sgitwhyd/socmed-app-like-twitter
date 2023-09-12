"use client";

import React, { useState } from "react";
import Image from "next/image";
import { createComment } from "@/lib/thread";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateComment = ({
	id,
	userImage,
}: {
	id: string;
	userImage: string;
}) => {
	const router = useRouter();
	const [content, setContent] = useState("");
	const handleCreateComment = async () => {
		const { error, message } = await createComment(id, content);
		toast.success(message);
		setContent("");
		router.refresh();
	};

	return (
		<div className="flex items-center p-4 h-fit relative border-b border-brand-gray-100">
			<Image
				alt="showing profile image"
				src={userImage}
				width={48}
				height={48}
				className="object-cover w-12 h-12 rounded-full"
			/>
			<div className="w-full h-full mx-auto max-w-[500px]">
				<textarea
					onChange={(e) => setContent(e.target.value)}
					value={content}
					placeholder="Post your reply!"
					className="text-white text-[15px]  placeholder:text-brand-gray-200 w-full bg-transparent active:outline-none focus:outline-none"></textarea>
			</div>
			<button
				className="absolute right-2 font-bold text-[15px] py-2 bg-brand-blue-main h-9 px-4 rounded-full"
				onClick={handleCreateComment}>
				Reply
			</button>
		</div>
	);
};

export default CreateComment;
