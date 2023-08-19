import Link from "next/link";

async function getData() {
  let responseProduk = await fetch(
    "http://localhost:5999/api/limits/getProduk/getData/produk?limit=5",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await responseProduk.json();
  return data;
}

export default async function ProdukList() {
  const GetData = await getData();
  console.log(GetData);
  return (
    <div className="mt-8">
      <span className="font-[500] p-5 mb-5 text-lg">New Produk</span>
      <div className=" py-5 grid grid-cols-5 justify-items-center items-center mb-8 gap-5">
        {GetData &&
          GetData.map((obj: { [key: string]: string }, index: number) => (
            <Link href={`/DetailProduk/${obj.Produk_ID}`} key={index}>
              <div className="bg-gray-200 rounded-md p-2 mx-5 w-[150px]">
                <img
                  src={obj.thumbnail}
                  alt={obj.NAMA_CATEGORY}
                  className="w-full h-auto"
                />
                <p className="py-3">{obj.Nama_Produk}</p>
                <p className="text-red-700 font-semibold">{obj.Harga}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
