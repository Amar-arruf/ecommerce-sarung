"use client";
import { Avatar } from "flowbite-react";

type Props = {
  alt: string;
  src: string;
};

export default function AvatarCustom(prop: Props) {
  return (
    <>
      <Avatar alt={prop.alt} img={prop.src} rounded />
    </>
  );
}
