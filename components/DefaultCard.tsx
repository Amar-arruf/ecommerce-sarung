"use client";

import { Card } from "flowbite-react";

export default function DefaultCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="w-full my-8">{children}</Card>;
}
