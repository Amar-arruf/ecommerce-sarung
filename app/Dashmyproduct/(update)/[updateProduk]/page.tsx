import FormCustom from "@/components/FormCustom";

async function getData(namaProduk: string) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/produk/Nama_Produk/${namaProduk}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  let data = await response.json();
  return data;
}

export default async function updatePage({
  params,
}: {
  params: { updateProduk: string };
}) {
  const data = await getData(params.updateProduk);
  console.log(data);
  return (
    <div className="mr-8 ml-8">
      <FormCustom
        Prop={{
          props: {
            Category: Number(data[0].Category),
            Deskripsi_Produk: data[0].Deskripsi_Produk,
            Harga: data[0].Harga,
            Nama_Produk: data[0].Nama_Produk,
            Stock: Number(data[0].Stock),
          },
          getId: data[0].Produk_ID,
        }}
      />
    </div>
  );
}
