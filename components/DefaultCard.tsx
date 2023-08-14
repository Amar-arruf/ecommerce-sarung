"use client";

import { Card, CustomFlowbiteTheme } from "flowbite-react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function DefaultCard(prop: Props) {
  const customTheme: CustomFlowbiteTheme["card"] = {
    root: {
      children: `flex h-full flex-col justify-center gap-4 p-6 ${prop.className}`,
    },
  };
  return (
    <Card theme={customTheme} className={`w-full my-8 `}>
      {prop.children}
    </Card>
  );
}
