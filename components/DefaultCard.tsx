"use client";

import { Card, CustomFlowbiteTheme } from "flowbite-react";

type Props = {
  children: React.ReactNode;
  className?: string;
  className2?: string;
};

export default function DefaultCard(prop: Props) {
  const customTheme: CustomFlowbiteTheme["card"] = {
    root: {
      children: `flex h-full flex-col justify-center p-6 ${prop.className}`,
    },
  };
  return (
    <Card theme={customTheme} className={`my-8 ${prop.className2}`}>
      {prop.children}
    </Card>
  );
}
