"use client";

import { Button, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import React from "react";

type Props = {
  btnText: string;
  color?: string;
};

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      "custom-color": "text-white bg-green-500",
    },
  },
};

export default function ButtonCustom(props: Props) {
  let button: unknown;
  console.log(props.color);
  if (props.color === undefined) {
    button = <Button>{props.btnText}</Button>;
  } else {
    button = <Button color={props.color}>{props.btnText}</Button>;
  }

  return (
    <Flowbite theme={{ theme: customTheme }}>
      {button as React.JSX.Element}
    </Flowbite>
  );
}
