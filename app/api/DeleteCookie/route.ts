import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const Cookies = request.cookies;
  let responseDeleteCookie;
  if (Cookies.has("connect.sid")) {
    responseDeleteCookie = Cookies.delete("connect.sid");
  } else {
    responseDeleteCookie = "cookie tidak ada";
  }

  return NextResponse.json({ responseDeleteCookie });
}
