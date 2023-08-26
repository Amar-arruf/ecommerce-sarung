import ButtonCustom from "@/components/ButtonCustom";
import ButtonDelete from "@/components/ButtonDelete";
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
      <Link href={"/Dashmyproduct/createPage"}>
        <ButtonCustom btnText="Add New Product" color="custom-color" />
      </Link>
      <div className="my-5 grid grid-cols-4 gap-x-3 overflow-y-auto h">
        {data.map(
          (items: { [key: string]: string | Number }, index: number) => {
            return (
              <DefaultCard className="!p-2 !relative" key={index}>
                <Link
                  href={`/Dashmyproduct/${
                    typeof items.Nama_Produk === "string"
                      ? items.Nama_Produk
                      : ""
                  }`}
                >
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
                </Link>
                <p className="p-3 font-semibold text-base">
                  {typeof items.Nama_Produk === "string"
                    ? items.Nama_Produk
                    : "undefined"}
                </p>
                <p className="px-3 text-gray-400 text-base">
                  {typeof items.Harga === "string" ? items.Harga : ""}
                </p>
                <p className="px-3 text-gray-400 text-base">
                  Stock : {typeof items.Stock === "number" ? items.Stock : 0}
                </p>
                <ButtonDelete id={items.Produk_ID as string} />
              </DefaultCard>
            );
          }
        )}
      </div>
    </div>
  );
}
