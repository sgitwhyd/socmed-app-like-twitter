import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";

import { HiHome } from "react-icons/hi";

import PostModal from "@/components/modal-post";
import { getLeaderboards } from "@/lib/utils";
import { ILeaderboards } from "@/types";
import { linkData } from "@/constants";
import { BASE_URL } from "@/constants";
import ButtonProfile from "@/components/button-profile.component";

import { BsTwitter } from "react-icons/bs";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
	const isLogged = cookies().has("access_token");
	const userRequest = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${cookies().get("access_token")?.value}`,
		},
	});
	const { data } = await userRequest.json();
	const user = data.user;

	const result = await getLeaderboards();
	const leaderboards: ILeaderboards[] = result?.leaderboards;

	return (
		<div className="relative flex w-full max-w-[1440px] mx-auto">
			<header>
				<nav className="hidden sm:block  w-[81px] xl:w-[340px]  relative">
					<div className="fixed w-[81px]  h-full xl:w-[340px] sm:flex flex-col items-center xl:items-start border-r border-gray-400 pr-0 xl:pl-20 xl:pr-8">
						<Link
							href="/"
							className="w-14 h-14 flex justify-center items-center hover-effect ">
							<BsTwitter className="text-white text-[34px]" />
						</Link>
						{isLogged ? (
							<div className="flex flex-col mt-1 space-y-2 mb-2.5 ">
								{linkData.map((link, idx) => (
									<Link
										href={link.href}
										className="flex items-center justify-center xl:justify-start text-xl space-x-2 px-3 py-2 w-fit hover-effect"
										key={idx}>
										<div className="w-8 mr-5">{link.icon}</div>
										<p className="hidden xl:inline">{link.name}</p>
									</Link>
								))}
							</div>
						) : (
							<Link
								href="/home"
								className="flex items-center justify-center xl:justify-start text-xl space-x-3 px-4 py-2 w-fit hover-effect ">
								<div className="w-8 mr-5">
									<HiHome size="100%" />
								</div>
								<p className="hidden xl:inline">Home</p>
							</Link>
						)}
						{isLogged && (
							<PostModal>
								<button className="hidden xl:inline rounded-full w-52 h-[52px] px-4 py-2 text-lg font-bold bg-brand-blue-main">
									Post
								</button>
							</PostModal>
						)}

						<div className="absolute bottom-0">
							{isLogged && <ButtonProfile user={user} />}
						</div>
					</div>
				</nav>
			</header>
			<div className="flex">
				{children}
				<div className="w-[400px] p-10 hidden md:block relative">
					<div className="w-full rounded-2xl bg-brand-gray-400 h-fit pb-3 sticky top-5">
						<h1 className="font-extrabold text-xl text-brand-gray-300  p-3">
							Top 6 Leaderboard
						</h1>
						{leaderboards?.slice(0, 6).map((item) => (
							<div
								key={item.user.id}
								className="flex hover:bg-brand-gray-100 px-3 py-2 gap-5">
								<Image
									alt="showing profile image"
									src={item.user.avatar}
									width={48}
									height={48}
									className="object-cover w-12 h-12 rounded-full"
								/>
								<div>
									<div className="font-bold text-[15px]">{item.user.name}</div>
									<div className="font-normal text-brand-gray-200 text-[13px] mt-1">
										{item.score} Point
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
			{!isLogged && (
				<div className="fixed bottom-0 left-0 w-full">
					<div className="bg-brand-blue-main h-[72px]">
						<div className="grid grid-cols-4 py-2 items-center">
							<div className=""></div>
							<div className=" col-span-2">
								<h1 className="font-bold text-2xl">
									Don’t miss what’s happening
								</h1>
								<p className="font-normal text-[15px]">
									People on Twitter are the first to know.
								</p>
							</div>
							<div className="flex gap-5">
								<Link
									href="/"
									className="border border-white rounded-full px-3 py-2 font-bold text-[15px]">
									Sign In
								</Link>
								<Link
									href="/register"
									className="border border-white rounded-full px-3 py-2 bg-white text-black font-bold text-[15px]">
									Sign Up
								</Link>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default HomeLayout;
