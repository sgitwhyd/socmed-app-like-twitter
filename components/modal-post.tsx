"use client";

import React, { Fragment, useState, ChangeEvent, FormEvent } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { createThread } from "@/lib/thread";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const PostModal = ({ children }: { children: React.ReactNode }) => {
	const Router = useRouter();
	const [isOpen, setIsOpen] = useState(false);
	const [threadPayload, setThreadPayload] = useState({
		title: "",
		body: "",
	});

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
		setIsOpen(false);
		Router.refresh();
	};

	return (
		<>
			<div onClick={() => setIsOpen(true)}>{children}</div>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					open={isOpen}
					onClose={() => setIsOpen(false)}
					className="relative z-20">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0">
						<div className="fixed inset-0 bg-brand-gray-200 bg-opacity-50" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto  top-5">
						<div className="flex min-h-full justify-center ">
							<Transition.Child
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95">
								<Dialog.Panel
									as="div"
									className='"w-full max-w-xl h-fit relative text-white transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all '>
									<button
										onClick={() => setIsOpen(false)}
										className="absolute top-2 left-2 p-2">
										<AiOutlineClose />
									</button>
									<div className="flex gap-5 mt-5 relative">
										<Image
											alt="showing profile image"
											src="https://picsum.photos/100"
											width={48}
											height={48}
											className="w-12 h-12 rounded-full object-cover"
										/>
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
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default PostModal;
