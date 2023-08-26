import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("http://localhost:5999/api/auth/getAuth", {
    method: "GET",
    cache: "no-store",
    credentials: "include",
  });
  const data = await res.json();

  return NextResponse.json(data);
}
