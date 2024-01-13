import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const getSession = async (cookiesValues: string) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/auth/getSession`,
      {
        method: "GET",
        headers: {
          Cookie: `connect.sid=${cookiesValues};Secure; SameSite=None`,
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
  const Cookies = cookies().get("connect.sid");
  console.log(Cookies);
  const GetSession = await getSession(Cookies?.value as string);
  console.log(getSession);
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
