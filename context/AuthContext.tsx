"use client";

import { createContext, useEffect, useState, useMemo } from "react";
import { getCurrentUser } from "@/lib/auth";
import { getCookie } from "@/lib/utils";

export const AuthContext = createContext<{
	currentUser: any;
	setCurrentUser: (user: any) => void;
}>({
	currentUser: null,
	setCurrentUser: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState(null);

	const fetchUser = async () => {
		if (!getCookie("access_token")) {
			return;
		}

		const { data } = await getCurrentUser();

		if (typeof document !== "undefined") {
			document.cookie = `avatar=${data.user.avatar}; path=/`;
		}

		setCurrentUser(data.user);
	};

	useEffect(() => {
		fetchUser();
	}, []);

	const authValue = useMemo(() => {
		return {
			currentUser,
			setCurrentUser,
		};
	}, [currentUser]);

	return (
		<AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
	);
};
