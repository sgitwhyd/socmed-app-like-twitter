"use client";

import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { IUser } from "@/types";
import { signOut } from "@/lib/auth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ButtonProfile = ({ user }: { user: IUser }) => {
	const Router = useRouter();
	const handleSignOut = () => {
		const { error, message } = signOut();
		toast.success(message);
		Router.replace("/");
	};

	return (
		<Popover className="relative xl:w-52 mt-auto ">
			{({ open }) => (
				<>
					<Popover.Button className="focus:outline-none mt-auto mb-10 flex  py-2 px-3 justify-start items-center rounded-full hover:bg-brand-gray-100 cursor-pointer bg-black">
						<div className="w-10 h-10 rounded-full relative overflow-hidden">
							<Image
								alt="showing profile image"
								src={user.avatar}
								fill
								className="object-cover"
							/>
						</div>
						<div className="hidden md:flex flex-col mx-5 ">
							<div className=" font-bold text-[15px] text-start">
								{user.name}
							</div>
							<div className="font-normal text-[13px] text-[rgb(231,233,234)]">
								{user.email}
							</div>
						</div>

						<div className="ml-auto hidden xl:inline">...</div>
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1">
						<Popover.Panel className="absolute left-1 -top-[80px] w-full lg:max-w-3xl">
							<div
								className="overflow-hidden rounded-lg  ring-1 ring-black ring-opacity-5"
								style={{
									boxShadow:
										"rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px",
								}}>
								<div className="bg-black h-fit py-3 flex items-center">
									<button
										className="hover:bg-brand-gray-200 w-full text-start py-2 pl-3 "
										onClick={handleSignOut}>
										Logout @{user.name}
									</button>
								</div>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	);
};

export default ButtonProfile;
