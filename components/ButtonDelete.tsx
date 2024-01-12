"use client";

import { useRouter } from "next/navigation";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  id: unknown;
};

export default function ButtonDelete(prop: Props) {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const handleDeleted = async (id: unknown) => {
    try {
      let responseHapus = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BACKEND}//api/deleteProdukImage/${id}`,
        { method: "DELETE" }
      );
      if (!responseHapus.ok) {
        MySwal.fire({
          title: "Failed!",
          text: `${await responseHapus.text()}`,
          icon: "error",
        });
      } else {
        MySwal.fire({
          title: "Berhasil!",
          text: "data Berhasil di hapus!",
          icon: "success",
        }).then((confirm) => {
          router.refresh();
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Failed!",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <button
        onClick={() => {
          handleDeleted(prop.id as string);
        }}
        className="absolute right-0 top-0"
      >
        <TiDelete className="text-2xl text-red-400 bg-white" />
      </button>
    </>
  );
}
