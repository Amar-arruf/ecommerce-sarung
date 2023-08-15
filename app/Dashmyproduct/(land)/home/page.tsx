import ButtonCustom from "@/components/ButtonCustom";
import DefaultCard from "@/components/DefaultCard";
import Link from "next/link";

async function getData() {
  let response = await fetch("http://localhost:5999/api/produk", {
    method: "GET",
    cache: "no-cache",
  });

  let data = await response.json();
  return data;
}

export default async function MyProduct() {
  const data = await getData();
  console.log(data);
  return (
    <div className="mr-8 ml-8 mt-5">
      <ButtonCustom btnText="Add New Product" color="custom-color" />
      <div className="my-5 grid grid-cols-4 gap-x-3 overflow-y-auto h">
        {data.map(
          (items: { [key: string]: string | Number }, index: number) => {
            return (
              <Link
                href={`/Dashmyproduct/${
                  typeof items.Nama_Produk === "string" ? items.Nama_Produk : ""
                }`}
                key={index}
              >
                <DefaultCard className="!p-2">
                  <img
                    src={
                      typeof items.thumbnail === "string" ? items.thumbnail : ""
                    }
                    alt={
                      typeof items.Nama_Produk === "string"
                        ? items.Nama_Produk
                        : "undefined"
                    }
                    className="w-full h-auto"
                  />
                  <p className="p-3 font-semibold text-base">
                    {typeof items.Nama_Produk === "string"
                      ? items.Nama_Produk
                      : "undefined"}
                  </p>
                  <p className="p-3 text-gray-400 text-base">
                    {typeof items.Harga === "string" ? items.Harga : ""}
                  </p>
                </DefaultCard>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}
