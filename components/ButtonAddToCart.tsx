"use client";

import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

type Props = {
  Produkid: string;
};

export default function ButtonAddToCart(prop: Props) {
  const router = useRouter();
  const handleAddToCart = async (ProdukId: string) => {
    const MySwal = withReactContent(Swal);

    const Produk_ID = ProdukId;
    let bodyContent = JSON.stringify({
      Produk_ID: Produk_ID,
    });

    let response = await fetch(
      "http://localhost:5999/api/cart/addToCart/addItem/1",
      {
        method: "POST",
        body: bodyContent,
        headers: {
          "Content-Type": "application/JSON",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      MySwal.fire({
        title: "Good Job!",
        text: "berhasil di tambah di keranjang",
        icon: "success",
      }).then((confirm) => {
        window.location.reload();
      });
    } else {
      MySwal.fire({
        title: "Failed!",
        text: await response.text(),
        icon: "error",
      });
    }
  };
  return (
    <>
      <button
        className="bg-green-400 p-3 rounded w-[210px] text-white"
        onClick={() => handleAddToCart(prop.Produkid)}
      >
        Add To cart
      </button>
    </>
  );
}
