"use client";

type Props = {
  Produkid: string;
};

const handleAddToCart = (ProdukId: string) => {
  const Produk_ID = ProdukId;
  let bodyContent = JSON.stringify({
    Produk_ID: Produk_ID,
  });

  let response = fetch("http://localhost:5999/api/cart/addToCart/addItem/1", {
    method: "POST",
    body: bodyContent,
    headers: {
      "Content-Type": "application/JSON",
    },
    credentials: "include",
  });

  response
    .then((response) => {
      if (!response.ok) {
        console.log(response);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

export default function ButtonAddToCart(prop: Props) {
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
