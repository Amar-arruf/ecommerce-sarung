import DefaultCard from "@/components/DefaultCard";
import Link from "next/link";

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/getTransaction/getData`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!response.ok) return [];
  const getResponse = await response.json();
  return getResponse;
}

export default async function home() {
  const data = await getData();
  console.log(data);
  return (
    <div className="mr-8 ml-8 my-3">
      <span className="p-3 inline-block font-semibold underline underline-offset-4 decoration-2">
        Sell Product
      </span>
      <div>
        {data.map((data: { [key: string]: string }, index: number) => (
          <Link href={`/Dashtransaction/${data.OrderID}`}>
            <DefaultCard key={index}>
              <div className="flex items-center justify-between">
                <img
                  src={data.url_image}
                  className="rounded-lg w-[44px] h-[44px]"
                />
                <span className="px-3">{data.Nama_Produk}</span>
                <span className="px-3">{data.Nama}</span>
                <span className="px-3">{data.Jumlah_Item}</span>
                <span className="px-3">{data.tanggal_order}</span>
              </div>
            </DefaultCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
