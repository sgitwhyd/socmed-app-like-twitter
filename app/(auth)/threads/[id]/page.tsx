import React from "react";
import Image from "next/image";
import { cookies } from "next/headers";
import Link from "next/link";

import Comment from "@/components/comment.component";
import CreateComment from "@/modules/thread/create-comment";
import { getDetailThread } from "@/lib/thread";
import { BASE_URL } from "@/constants";
import { IDetailThread } from "@/types";
import { convertTime } from "@/lib/utils";

import { BsArrowLeftShort } from "react-icons/bs";
import { BiComment } from "react-icons/bi";
import {
	AiOutlineLike,
	AiFillLike,
	AiTwotoneDislike,
	AiOutlineDislike,
} from "react-icons/ai";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
	{ params, searchParams }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	// read route params
	const id = params.id;

	// fetch data
	const { detailThread } = await getDetailThread(id);

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title: detailThread.title,
		description: detailThread.title,
		// openGraph: {
		// 	images: [, ...previousImages],
		// },
	};
}

const ThreadDetails = async ({
	params,
}: {
	params: {
		id: string;
	};
}) => {
	const isLogged = cookies().has("access_token");
	const avatar = cookies().get("avatar")?.value;
	const result = await getDetailThread(params.id);
	const thread: IDetailThread = result.detailThread;
	const comments = thread.comments;

	// get current user
	const userRequest = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${cookies().get("access_token")?.value}`,
		},
	});
	const { data } = await userRequest.json();
	const user = data.user;

	return (
		<div className=" border-r border-brand-gray-100 w-full xl:w-[600px] min-h-screen">
			<div className="sticky top-0 z-10 min-h-[52px] flex items-center px-3 bg-black bg-opacity-5 backdrop-blur-md">
				<div className="flex gap-8 items-center min-h-[20px] ">
					<Link
						href="/home"
						className="rounded-full  hover:bg-brand-gray-100 w-fit">
						<BsArrowLeftShort className="text-white text-3xl" />
					</Link>
					<div className="text-xl font-bold  w-[calc(1em+24px)]">Post</div>
				</div>
			</div>
			<div className="p-4 border-b border-brand-gray-100 flex gap-4  transition-colors">
				<Image
					alt="showing profile image"
					src={thread.owner.avatar}
					width={48}
					height={48}
					className="object-cover w-12 h-12 rounded-full"
				/>
				<div className="flex flex-col">
					<div className="flex gap-2 text-[15px]">
						<div className="font-bold ">{thread.owner.name}</div>
						<div className="font-normal text-brand-gray-200">
							{" "}
							· {convertTime(thread.createdAt)}
						</div>
					</div>
					<div
						className="font-normal max-w-[500px]"
						dangerouslySetInnerHTML={{ __html: thread.body }}></div>
					<div className="flex space-x-10 gap-x-1 mt-3">
						<button className="flex gap-3 items-center min-h-[20px] rounded-full   w-fit">
							<AiOutlineLike className="text-brand-gray-200" />
							<div className="text-[13px] text-brand-gray-200 ">
								{thread.upVotesBy.length} likes
							</div>
						</button>
						<button className="flex gap-3 items-center min-h-[20px] rounded-full   w-fit">
							<AiOutlineDislike className="text-brand-gray-200" />
							<div className="text-[13px] text-brand-gray-200 ">
								{thread.downVotesBy.length} not likes
							</div>
						</button>
						<button className="flex gap-3 items-center min-h-[20px] rounded-full   w-fit">
							<BiComment className="text-brand-gray-200" />
							<div className="text-[13px] text-brand-gray-200 ">
								{thread.comments.length} comments
							</div>
						</button>
					</div>
				</div>
			</div>
			{isLogged && avatar && (
				<CreateComment id={params.id} userImage={avatar as string} />
			)}
			<div className="pb-20">
				{comments.map((comment) => (
					<Comment
						key={comment.id}
						threadId={params.id}
						userLoggedId={isLogged ? user.id : ""}
						isLogged={isLogged}
						comment={comment}
					/>
				))}
			</div>
		</div>
	);
};

export default ThreadDetails;
