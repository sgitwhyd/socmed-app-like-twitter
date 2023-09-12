import React from "react";
import Link from "next/link";
import Image from "next/image";

import { BsArrowLeftShort } from "react-icons/bs";

import { cookies } from "next/headers";
import { BASE_URL } from "@/constants";

const Page = async () => {
	const result = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${cookies().get("access_token")?.value}`,
		},
	});
	const { data } = await result.json();
	const user = data.user;

	return (
		<div className=" border-r border-brand-gray-100 xl:w-[600px] min-h-screen">
			<div className="sticky top-0 z-10 min-h-[52px] flex items-center px-3 bg-black bg-opacity-5 backdrop-blur-md">
				<div className="flex gap-8 items-center min-h-[20px] ">
					<Link
						href="/home"
						className="rounded-full  hover:bg-brand-gray-100 w-fit">
						<BsArrowLeftShort className="text-white text-3xl" />
					</Link>
					<div className="flex flex-col">
						<div className="text-xl font-bold  w-[calc(1em+24px)]">
							{user.name}
						</div>
						<div className="text-[13px] text-brand-gray-200">5 Post</div>
					</div>
				</div>
			</div>
			<div className="relative">
				<Image
					src="https://picsum.photos/500/500"
					alt="showing banner profile user"
					width={100}
					height={170}
					className="object-cover h-[170px] w-full"
				/>
				<div className="flex justify-between">
					<div className="bg-black w-[140px] h-[140px] absolute top-24 left-3 rounded-full ">
						<Image
							alt="showing profile image"
							src={user.avatar}
							fill
							className="object-cover rounded-full p-1"
						/>
					</div>
					{/* <button>edit profile</button> */}
				</div>
				<div className="flex flex-col mt-20 px-5 border-b border-brand-gray-100 min-h-[52px]">
					<div className="font-semibold text-[15px]">{user.name}</div>
					<div className="font-normal text-brand-gray-200 text-[13px]">
						{user.email}
					</div>
				</div>
			</div>
			{/* {Array.from({ length: 5 }).map((_, idx) => (
				<Thread key={idx} />
			))} */}
		</div>
	);
};

export default Page;
