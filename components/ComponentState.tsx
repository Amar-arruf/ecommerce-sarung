"use client";

import React from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  id: string;
};

const ComponentState: React.FC<Props> = (prop) => {
  const [handleSelect, setHandleSelect] = React.useState<string>();
  const router = useRouter();

  const selectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    console.log(value);
    try {
      console.log(prop.id);
      let responseUpdate = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/updatepayment/${prop.id}?State=${value}`,
        {
          method: "PUT",
          cache: "no-store",
        }
      );
      if (!responseUpdate.ok) {
        console.log(await responseUpdate.text());
      }
      console.log(await responseUpdate.json());
    } catch (error) {
      console.error(error);
    }

    setHandleSelect(value);
    router.reload();
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
        <option value="Pending">pending</option>
        <option value="Success">shipping</option>
      </select>
    </>
  );
};

export default ComponentState;
