"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { signUp } from "@/lib/auth";
import { toast } from "react-toastify";

const Register = () => {
	const Router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [registerPayload, setRegisterPayload] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterPayload({
			...registerPayload,
			[e.target.name]: e.target.value,
		});
	};

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const { message } = await signUp(registerPayload);
			toast.success(message);
			setRegisterPayload({
				name: "",
				email: "",
				password: "",
			});
			Router.replace("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="bg-brand-gray-100">
			<div className="relative xl:px-5 w-full max-w-5xl mx-auto flex justify-center min-h-screen items-center">
				<div className="w-2/4 h-fit bg-black p-6 rounded-xl">
					<form onSubmit={handleSignUp}>
						<h1 className="text-2xl text-center font-bold mb-5">
							Register Page
						</h1>
						<div className="relative w-full">
							<input
								required
								type="text"
								id="name"
								onChange={handleOnChange}
								name="name"
								className="block rounded-sm px-2.5 pb-2.5 pt-5 w-full text-[15px] text-white bg-black border border-brand-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand-blue-main peer"
								placeholder=""
							/>
							<label
								htmlFor="name"
								className="absolute text-[15px] text-brand-gray-200  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-brand-blue-main peer-focus:dark:text-brand-blue-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Name
							</label>
						</div>
						<div className="relative w-full mt-5">
							<input
								required
								type="email"
								id="email"
								onChange={handleOnChange}
								name="email"
								className="block rounded-sm px-2.5 pb-2.5 pt-5 w-full text-[15px] text-white bg-black border border-brand-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand-blue-main peer"
								placeholder=""
							/>
							<label
								htmlFor="email"
								className="absolute text-[15px] text-brand-gray-200  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-brand-blue-main peer-focus:dark:text-brand-blue-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Email
							</label>
						</div>
						<div className="relative w-full mt-5">
							<input
								required
								type={showPassword ? "text" : "password"}
								id="password"
								onChange={handleOnChange}
								name="password"
								className="block rounded-sm px-2.5 pb-2.5 pt-5 w-full text-[15px] text-white bg-black border border-brand-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-brand-blue-main peer"
								placeholder=""
							/>
							<label
								htmlFor="password"
								className="absolute text-[15px] text-brand-gray-200  duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-brand-blue-main peer-focus:dark:text-brand-blue-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Password
							</label>
							<div
								className="absolute right-2 top-4 cursor-pointer"
								onClick={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<AiOutlineEyeInvisible size={24} />
								) : (
									<AiOutlineEye size={24} />
								)}
							</div>
						</div>
						<button
							type="submit"
							className="rounded-full w-full py-4 bg-brand-white-100 text-black font-bold text-[15px] mt-5">
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Register;
