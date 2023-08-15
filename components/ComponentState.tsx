"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

const ComponentState: React.FC<Props> = (prop) => {
  const [handleSelect, setHandleSelect] = React.useState<string>();
  const router = useRouter();

  const selectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    setHandleSelect(value);
    router.push(
      `http://localhost:3000/Dashtransaction/${prop.id}?state=${value}`
    );
  };
  return (
    <>
      <select
        name="stateshipping"
        id="st"
        className="w-[150px] bg-gray-200 border-0 rounded"
        value={handleSelect}
        onChange={selectChange}
      >
        <option value="pending" selected>
          pending
        </option>
        <option value="shipping">shipping</option>
      </select>
    </>
  );
};

export default ComponentState;
