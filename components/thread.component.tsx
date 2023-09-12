"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
	AiOutlineLike,
	AiFillLike,
	AiTwotoneDislike,
	AiOutlineDislike,
} from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import Link from "next/link";
import { convertTime } from "@/lib/utils";
import { Ithread } from "@/types";
import {
	upVoteThread,
	downVoteThread,
	neutralizeVoteThread,
} from "@/lib/thread";
import { toast } from "react-toastify";

const Thread = ({
	thread,
	userLoggedId,
	isLogged,
}: {
	thread: Ithread;
	userLoggedId: string;
	isLogged: boolean;
}) => {
	const Router = useRouter();
	const isLiked = isLogged ? thread.upVotesBy.includes(userLoggedId) : false;
	const isDisLike = isLogged
		? thread.downVotesBy.includes(userLoggedId)
		: false;
	const handleLikeThread = async () => {
		const { message } = await upVoteThread(thread.id.toString());
		toast.success(message);
		Router.refresh();
	};

	const handleDownLikeThread = async () => {
		const { message } = await downVoteThread(thread.id.toString());
		toast.success(message);
		Router.refresh();
	};

	const handleNeutralizeVoteThread = async () => {
		const { message } = await neutralizeVoteThread(thread.id.toString());
		toast.success(message);
		Router.refresh();
	};

	return (
		<div className="p-3 border-t border-brand-gray-100 flex gap-4 hover:bg-brand-gray-100 transition-colors">
			<Image
				alt="showing profile image"
				src="https://picsum.photos/100"
				width={48}
				height={48}
				className="object-cover rounded-full w-12 h-12"
			/>
			<div className="flex flex-col">
				<Link
					href={`/threads/${thread.id}`}
					className="flex gap-2 text-[15px] ">
					<h3 className="font-bold hover:text-brand-gray-300">
						{thread.ownerId}
					</h3>
					<p className="font-normal text-brand-gray-200">
						{" "}
						· {convertTime(thread.createdAt)}
					</p>
				</Link>
				<p className="font-normal max-w-[500px]"> {thread.title} </p>
				<div className="flex space-x-10 gap-x-1 mt-3">
					<button
						className="flex gap-3 items-center min-h-[20px] rounded-full  hover:bg-brand-gray-100 w-fit"
						onClick={isLiked ? handleNeutralizeVoteThread : handleLikeThread}>
						{isLiked ? (
							<AiFillLike className="text-brand-gray-200" />
						) : (
							<AiOutlineLike className="text-brand-gray-200" />
						)}
						<p className="text-[13px] text-brand-gray-200 ">
							{thread.upVotesBy.length} likes
						</p>
					</button>
					<button
						className="flex gap-3 items-center min-h-[20px] rounded-full  hover:bg-brand-gray-100 w-fit"
						onClick={
							isDisLike ? handleNeutralizeVoteThread : handleDownLikeThread
						}>
						{isDisLike ? (
							<AiTwotoneDislike className="text-brand-gray-200" />
						) : (
							<AiOutlineDislike className="text-brand-gray-200" />
						)}
						<div className="text-[13px] text-brand-gray-200 ">
							{thread.downVotesBy.length} Not likes
						</div>
					</button>
					<button className="flex gap-3 items-center min-h-[20px] rounded-full  hover:bg-brand-gray-100 w-fit">
						<BiComment className="text-brand-gray-200" />
						<p className="text-[13px] text-brand-gray-200 ">
							{thread.totalComments} comments
						</p>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Thread;
