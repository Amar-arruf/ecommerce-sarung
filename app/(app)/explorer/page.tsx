import Footer from "@/app/componentsServer/Footer";
import DefaultCard from "@/components/DefaultCard";
import FormInput from "@/components/FormInput";
import Nav from "../../componentsServer/Nav";

async function getData() {
  const response = await fetch("http://localhost:5999/api/produk", {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();
  return data;
}

export default async function explorer({
  searchParams,
}: {
  searchParams: { search?: string; radio?: number };
}) {
  let Data = await getData();

  if (searchParams.hasOwnProperty("search")) {
    console.log(searchParams.search);
    Data = Data.filter((x: { [key: string]: string | number }) => {
      if (typeof x.Nama_Produk === "string") {
        return x.Nama_Produk === searchParams.search;
      }
    });
  }
  if (searchParams.hasOwnProperty("radio")) {
    Data = Data.filter((x: { [key: string]: string | number }) => {
      console.log(x.Category);
      if (typeof x.Category === "number") {
        return x.Category === Number(searchParams.radio);
      }
    });
  }
  if (typeof searchParams.search === "string" && searchParams.search === "") {
    Data = await getData();
  }
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <div className="flex gap-x-10">
          <div className="w-[300px]">
            <FormInput />
          </div>
          <div className="mt-8">
            <span className="text-lg font-[500] inline-block mb-5">
              Produk Produk Sarung Kami
            </span>
            <div className="grid grid-cols-4 justify-items-center gap-8">
              {Data &&
                Data.map(
                  (obj: { [key: string]: string | Number }, index: number) => (
                    <div
                      className="bg-gray-200 rounded-md p-2 mx-5 w-[200px]"
                      key={index}
                    >
                      <img
                        src={obj.thumbnail as string}
                        alt={obj.NAMA_CATEGORY as string}
                        className="w-full h-auto"
                      />
                      <p className="pt-3 font-[700]">
                        {obj.Nama_Produk as string}
                      </p>
                      <span className="py-3 inline-block text-sm text-gray-600">
                        {obj.Category === 1
                          ? "Gajah Duduk"
                          : obj.Category === 2
                          ? "Batik"
                          : obj.Category === 3
                          ? "Donggala"
                          : obj.Category === 4
                          ? "HBS"
                          : obj.Category === 5
                          ? "Ardan"
                          : "Wadimor"}
                      </span>
                      <p className="text-red-700 font-semibold">
                        {obj.Harga as string}
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
