import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch("http://localhost:5999/api/getTransaction/getData", {
    cache: "no-store",
  });

  const data = await res.json();
  return NextResponse.json(data);
}
