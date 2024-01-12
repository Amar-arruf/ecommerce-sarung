import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const getSession = async (cookiesValues: string) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/auth/getSession`,
      {
        method: "GET",
        headers: {
          Cookie: `connect.sid=${cookiesValues}`,
        },
      }
    );

    if (!result.ok) {
      return await result.text();
    }

    return result.json();
  } catch (error) {
    return "failed fetching";
  }
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const Cookies = request.cookies.get("connect.sid")?.value as string;
  const GetSession = await getSession(Cookies);
  if (!GetSession.hasOwnProperty("username")) {
    return NextResponse.redirect(new URL("/loginDashboard", request.url));
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
