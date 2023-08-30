import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const Cookies = request.cookies;
  let message;
  if (Cookies.has("connect.sid")) {
    message = "cookie ada";
  } else {
    message = "cookie tidak ada";
  }

  return NextResponse.json({ message });
}
