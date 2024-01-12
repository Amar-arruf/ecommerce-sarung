import DefaultCard from "@/components/DefaultCard";
import Link from "next/link";

// dapatkan data dari backend
async function getData() {
  let getDataTransaction = await fetch(
    `${process.env.HOST_PUBLIC_BACKEND}/api/getTransaction/getData`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!getDataTransaction.ok) return [];

  const data = await getDataTransaction.json();
  return data;
}

async function getCustomer() {
  let getDataCustomer = await fetch(
    `${process.env.HOST_PUBLIC_BACKEND}/api/userakun`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!getDataCustomer.ok) return [];
  const data = await getDataCustomer.json();
  return data;
}

async function getRevenue() {
  let getDataRevenue = await fetch(
    "http://localhost:5999/api/revenue/getRevenue",
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (getDataRevenue.ok) return [];
  const data = await getDataRevenue.json();
  return data;
}

export default async function dashboard() {
  const data = await getData();
  const dataCustomer = await getCustomer();
  const dataRevenue = await getRevenue();
  return (
    <div className="ml-8 mr-8">
      <div className="flex content-center justify-between items-center mt-8 mb-5">
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            customer
          </p>
          <h4 className="font-bold text-3xl text-black">
            {dataCustomer.length}
          </h4>
        </div>
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            Revenue
          </p>
          <h4 className="font-bold text-3xl text-black dark:text-gray-400">
            Rp. {dataRevenue[0].TotalHarga}
          </h4>
        </div>
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            Transactions
          </p>
          <h4 className="font-bold text-3xl text-black dark:text-gray-400">
            {data.length}
          </h4>
        </div>
      </div>
      <h5 className="text-lg text-black font-[500]">Recent Transaction</h5>
      {data.map((data: { [key: string]: string }, index: number) => (
        <Link href={`/Dashtransaction/${data.OrderID}`} key={index}>
          <DefaultCard>
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
  );
}
