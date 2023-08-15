import DefaultCard from "@/components/DefaultCard";
import Link from "next/link";

// dapatkan data dari backend
async function getData() {
  let getDataTransaction = await fetch(
    "http://localhost:5999/api/getTransaction/getData",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await getDataTransaction.json();
  return data;
}

export default async function dashboard() {
  const data = await getData();
  console.log(data);
  return (
    <div className="ml-8 mr-8">
      <div className="flex content-center justify-between items-center mt-8 mb-5">
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            Customer
          </p>
          <h4 className="font-bold text-3xl text-black">15,209</h4>
        </div>
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            Revenue
          </p>
          <h4 className="font-bold text-3xl text-black dark:text-gray-400">
            Rp.8.000.000
          </h4>
        </div>
        <div className="block max-w-sm w-[280px] p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
          <p className="mb-2 text-sm tracking-tight text-gray-400 dark:text-white">
            Transactions
          </p>
          <h4 className="font-bold text-3xl text-black dark:text-gray-400">
            22.345.234
          </h4>
        </div>
      </div>
      <h5 className="text-lg text-black font-[500]">Recent Transaction</h5>
      {data.map((data: { [key: string]: string }, index: number) => (
        <Link href={`/Dashtransaction/${data.OrderID}`}>
          <DefaultCard key={index}>
            <div className="flex items-center justify-between">
              <img
                src={data.thumbnail}
                className="rounded-lg w-[44px] h-[44px]"
              />
              <span className="px-3">{data.Nama_Produk}</span>
              <span className="px-3">{data.Nama}</span>
              <span className="px-3">{data.tanggal_order}</span>
            </div>
          </DefaultCard>
        </Link>
      ))}
    </div>
  );
}
