import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const token = request.cookies.get("access_token");

	// Membuat daftar path yang harus diotentikasi
	const protectedPaths = ["/profile", "/explore"];

	function isProtectedPath(pathname: string) {
		return protectedPaths.some((protectedPath) =>
			pathname.startsWith(protectedPath)
		);
	}

	// Jika pengguna tidak memiliki token dan mencoba mengakses path yang harus diotentikasi
	if (!token && isProtectedPath(request.nextUrl.pathname)) {
		// Redirect pengguna ke halaman login jika belum memiliki token
		return NextResponse.redirect(new URL("/", request.url));
	}

	// Jika pengguna memiliki token dan mencoba mengakses halaman utama ("/")
	if (token && request.nextUrl.pathname === "/") {
		// Redirect pengguna ke halaman home jika sudah memiliki token
		return NextResponse.redirect(new URL("/home", request.url));
	}
}
