import Footer from "@/app/componentsServer/Footer";
import Nav from "@/app/componentsServer/Nav";
import AvatarCustom from "@/components/AvatarCustom";
import ButtonAddToCart from "@/components/ButtonAddToCart";

async function getData(produkid: string) {
  const response = await fetch(
    `http://localhost:5999/api/produk/Produk_ID/${produkid}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await response.json();

  return data;
}

async function getDataImageProduk(produkId: string) {
  const responseProdukImage = await fetch(
    `http://localhost:5999/api/produkimage/ProdukId/${produkId}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const data = await responseProdukImage.json();

  return data;
}

async function userReviewDummy() {
  let responseGetUser = await fetch("https://reqres.in/api/users?page=2", {
    method: "GET",
    cache: "no-cache",
  });

  const data = await responseGetUser.json();
  return data;
}

export default async function DetailProduk({
  params,
}: {
  params: { produkid: string };
}) {
  const GetData = await getData(params.produkid);
  const GetDataImage = await getDataImageProduk(params.produkid);
  const userReview = await userReviewDummy();

  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <div className="py-3 mt-2 mb-3">
          <span className="text-lg text-gray-400">
            Produk Detail / <b className="text-black">{GetData[0].Produk_ID}</b>
          </span>
        </div>
        <div className="flex gap-6 mt-8">
          <img
            src={GetData[0].thumbnail}
            alt={GetData[0].Nama_Produk}
            className="rounded-2xl w-[100%] h-[400px]"
          />
          <div className="flex flex-col gap-y-5 w-[35%] items-center">
            {GetDataImage.map(
              (obj: { [key: string]: string }, index: number) => (
                <img
                  src={obj.url_image}
                  alt={obj.ProdukId}
                  className="rounded w-full h-[120px]"
                />
              )
            )}
          </div>
        </div>
        <div className=" mt-7 flex items-start justify-between gap-x-4">
          <div className="flex flex-col w-[60%] gap-y-2">
            <h1 className="text-3xl font-[500]">{GetData[0].Nama_Produk}</h1>
            <span className="inline-block text-lg text-gray-400 ">
              by Admin
            </span>
            <p className="py-5">{GetData[0].Deskripsi_Produk}</p>
            <span className="inline-block py-3 mb-5 font-semibold">
              {" "}
              Product Review ({userReview.data.length})
            </span>
            <div className="overflow-auto h-[300px] mb-14 w-full">
              {userReview &&
                userReview.data.map(
                  (obj: { [key: string]: string }, index: number) => (
                    <div key={index}>
                      <div className="flex items-center">
                        <AvatarCustom
                          src={obj.avatar}
                          alt={`${obj.first_name} ${obj.last_name}`}
                        />
                        <span className="text-sm px-3 font-semibold">
                          {`${obj.first_name} ${obj.last_name}`}
                        </span>
                      </div>
                      <p className="p-3 ms-7">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Accusantium libero consequuntur, soluta quam sint
                        dignissimos mollitia officia obcaecati reprehenderit
                        officiis ab iusto sed dolor quae saepe et, iste magni
                        possimus?
                      </p>
                    </div>
                  )
                )}
            </div>
          </div>
          <ButtonAddToCart Produkid={params.produkid} />
        </div>
      </div>
      <Footer />
    </>
  );
}
