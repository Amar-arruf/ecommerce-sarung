import ComponentState from "@/components/ComponentState";

import DefaultCard from "@/components/DefaultCard";

const getData = async (OrderId: string) => {
  // hit enpoint get detail transaction
  const Response = await fetch(
    `http://localhost:5999/api/get/getTransactionDetail/getData/${OrderId}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  const getResponse = await Response.json();
  return getResponse;
};

export default async function DetailProduk({
  params,
  searchParams,
}: {
  params: { detailTransaction: string };
  searchParams: { state: string };
}) {
  const data = await getData(params.detailTransaction);
  console.log(data);
  return (
    <div className="mr-8 ml-8">
      <DefaultCard className="!p-8">
        <div className="flex">
          <img
            src={data[0].url_image}
            alt="thumbnail"
            className="w-[230px] h-auto rounded-3xl "
          />
          <div className="px-5">
            <div className="flex items-center gap-x-6 mb-6">
              <div className="px-3 w-[400px]">
                <span className="block text-base text-gray-400 pb-2">
                  Customer Name
                </span>
                <span className="block text-base font-medium text-black pb-2">
                  {data[0].Nama}
                </span>
              </div>
              <div className="px-3 w-[300px]">
                <span className="block text-base text-gray-400 pb-2">
                  Product Name
                </span>
                <span className="block text-base font-medium text-black pb-2">
                  {data[0].Nama_Produk}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-6 mb-6">
              <div className="px-3 w-[400px]">
                <span className="block text-base text-gray-400 pb-2">
                  Date of Transaction
                </span>
                <span className="block text-base font-medium text-black pb-2">
                  {data[0].tanggal_order}
                </span>
              </div>
              <div className="px-3 w-[300px]">
                <span className="block text-base text-gray-400 pb-2">
                  Payment Status
                </span>
                <span
                  className={`block text-base ${
                    data[0].StatusPay === "Success"
                      ? "text-green-500 font-[700]"
                      : "text-red-500 font-[700]"
                  } font-medium pb-2`}
                >
                  {data[0].StatusPay === "Success" ? "Success" : "Pendng"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-x-6 mb-6">
              <div className="px-3 w-[400px]">
                <span className="block text-base text-gray-400 pb-2">
                  Total Amount
                </span>
                <span className="block text-base font-medium text-black pb-2">
                  {`RP. ${data[0].TotalHarga}`}
                </span>
              </div>
              <div className="px-3 w-[300px]">
                <span className="block text-base text-gray-400 pb-2">
                  Mobile
                </span>
                <span className="block text-base font-medium text-black pb-2">
                  {data[0].Telepon}
                </span>
              </div>
            </div>
          </div>
        </div>
        <h3 className="py-3 mb-2 font-medium ">Shipping Information</h3>
        <div className="flex items-center mb-2">
          <div className="px-3 w-[400px]">
            <span className="block text-base text-gray-400 pb-2">Addres I</span>
            <span className="block text-base font-medium text-black pb-2">
              {data[0].Alamat1}
            </span>
          </div>
          <div className="px-3 w-[300px]">
            <span className="block text-base text-gray-400 pb-2">
              Address II
            </span>
            <span className="block text-base font-medium text-black pb-2">
              {data[0].Alamat2}
            </span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="px-3 w-[400px]">
            <span className="block text-base text-gray-400 pb-2">Province</span>
            <span className="block text-base font-medium text-black pb-2">
              {data[0].provinsi}
            </span>
          </div>
          <div className="px-3 w-[300px]">
            <span className="block text-base text-gray-400 pb-2">City</span>
            <span className="block text-base font-medium text-black pb-2">
              {data[0].Kota}
            </span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <div className="px-3 w-[400px]">
            <span className="block text-base text-gray-400 pb-2">
              Post code{" "}
            </span>
            <span className="block text-base font-medium text-black pb-2">
              {data[0].kodepos}
            </span>
          </div>
          <div className="px-3 w-[300px]">
            <span className="block text-base text-gray-400 pb-2">Country</span>
            <span className="block text-base font-medium text-black pb-2">
              Indonesia
            </span>
          </div>
        </div>
        <span className="block text-base text-gray-400 pb-2">
          Shipping Status
        </span>
        <ComponentState id={params.detailTransaction} />
      </DefaultCard>
    </div>
  );
}
