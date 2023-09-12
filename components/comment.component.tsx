"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import {
	AiOutlineLike,
	AiFillLike,
	AiTwotoneDislike,
	AiOutlineDislike,
} from "react-icons/ai";
import { IComment } from "@/types";
import {
	upVoteComment,
	neutralizeCommentVote,
	downVoteComment,
} from "@/lib/thread";
import { convertTime } from "@/lib/utils";

const Comment = ({
	comment,
	threadId,
	userLoggedId,
	isLogged,
}: {
	comment: IComment;
	threadId: string;
	userLoggedId: string;
	isLogged: boolean;
}) => {
	const Router = useRouter();
	const isLiked = isLogged ? comment.upVotesBy.includes(userLoggedId) : false;
	const isDisLike = isLogged
		? comment.downVotesBy.includes(userLoggedId)
		: false;

	const handleUpVoteComment = async () => {
		const { message } = await upVoteComment(threadId, comment.id);
		toast.success(message);
		Router.refresh();
	};

	const handleNeutralizeVoteComment = async () => {
		const { message } = await neutralizeCommentVote(threadId, comment.id);
		toast.success(message);
		Router.refresh();
	};

	const handleDownVoteComment = async () => {
		const { message } = await downVoteComment(threadId, comment.id);
		toast.success(message);
		Router.refresh();
	};

	return (
		<div className="p-3 border-t border-brand-gray-100 flex gap-4 hover:bg-brand-gray-100 transition-colors">
			<Image
				alt="showing profile image"
				src={comment.owner.avatar}
				width={48}
				height={48}
				className="object-cover rounded-full w-12 h-12"
			/>
			<div className="flex flex-col">
				<div className="flex gap-2 text-[15px]">
					<div className="font-bold ">{comment.owner.name}</div>
					<div className="font-normal text-brand-gray-200">
						{" "}
						· {convertTime(comment.createdAt)}
					</div>
				</div>
				<div
					className="font-normal max-w-[500px]"
					dangerouslySetInnerHTML={{ __html: comment.content }}></div>
				<div className="flex space-x-10 gap-x-1 mt-3">
					<button
						className="flex gap-3 items-center min-h-[20px] rounded-full  hover:bg-brand-gray-100 w-fit"
						onClick={
							isLiked ? handleNeutralizeVoteComment : handleUpVoteComment
						}>
						{isLiked ? (
							<AiFillLike className="text-brand-gray-200" />
						) : (
							<AiOutlineLike className="text-brand-gray-200" />
						)}

						<div className="text-[13px] text-brand-gray-200 ">
							{comment.upVotesBy.length} likes
						</div>
					</button>
					<button
						className="flex gap-3 items-center min-h-[20px] rounded-full  hover:bg-brand-gray-100 w-fit"
						onClick={
							isDisLike ? handleNeutralizeVoteComment : handleDownVoteComment
						}>
						{isDisLike ? (
							<AiTwotoneDislike className="text-brand-gray-200" />
						) : (
							<AiOutlineDislike className="text-brand-gray-200" />
						)}

						<div className="text-[13px] text-brand-gray-200 ">
							{comment.downVotesBy.length} Not Likes
						</div>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Comment;
