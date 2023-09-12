import React from "react";
import Image from "next/image";
import type { Metadata } from "next";

import Thread from "@/components/thread.component";
import { getAllThread } from "@/lib/thread";
import { cookies } from "next/headers";
import CreateThread from "@/modules/home/create-thread";
import { BASE_URL } from "@/constants";

export const metadata: Metadata = {
	title: "Home | Pod Space",
	description: "Home page that contain all feed from user",
};

const HomeDashboard = async () => {
	const isLogged = cookies().has("access_token");
	const result = await getAllThread();
	const threads = result.threads;
	const userRequest = await fetch(`${BASE_URL}/users/me`, {
		headers: {
			Authorization: `Bearer ${cookies().get("access_token")?.value}`,
		},
	});
	const { data } = await userRequest.json();
	const user = data.user;

	return (
		<div className="border-r border-brand-gray-100 xl:w-[600px] min-h-screen">
			{/* header home timeline */}
			<div className="sticky top-0 z-10">
				<div className="bg-black bg-opacity-5 backdrop-blur-md border-b border-brand-gray-100">
					<div className="flex flex-col h-full w-full">
						<div className="h-[53px] px-4 flex items-center">
							<h2 className="text-xl font-bold">Home</h2>
						</div>
						<div className="flex text-center justify-center h-[53px] min-h-[56px] text-[15px] font-bold">
							<button className="flex flex-1 justify-center relative hover:bg-brand-gray-100">
								<div className="py-4 relative">
									For You
									<div className="w-full absolute bottom-[2px] h-1 rounded-full bg-brand-blue-main"></div>
								</div>
							</button>
							<button className="flex flex-1 justify-center relative hover:bg-brand-gray-100">
								<div className="py-4 relative text-brand-gray-200">
									Following
									{/* <div className="w-full absolute bottom-[2px] h-1 rounded-full bg-brand-blue-main"></div> */}
								</div>
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* end header home timeline */}
			{isLogged && <CreateThread />}
			<div className="pb-20">
				{threads.map((thread: any) => (
					<Thread
						key={thread.id}
						thread={thread}
						userLoggedId={isLogged ? user.id : ""}
						isLogged={isLogged}
					/>
				))}
			</div>
		</div>
	);
};

export default HomeDashboard;
