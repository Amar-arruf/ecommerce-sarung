import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const dataLogin = async (cookievalue: string) => {
  const result = await fetch(`http://localhost:5999/api/auth/getAuth`, {
    method: "GET",
    headers: {
      Cookie: `connect.sid=${cookievalue}`,
    },
    credentials: "include",
  });

  return result.json();
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (!request.cookies.has("connect.sid")) {
    return NextResponse.redirect(new URL("/loginDashboard", request.url));
  } else {
    const cookie = request.cookies.get("connect.sid");
    const getDataAuth = await dataLogin(cookie?.value as string);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/Dashmyproduct/:path*",
    "/Dashsetting/:path*",
    "/Dashtransaction/:path*",
  ],
};
