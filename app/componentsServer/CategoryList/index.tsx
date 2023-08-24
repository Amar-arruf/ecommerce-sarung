import Link from "next/link";

async function getData() {
  let responseCategory = await fetch(
    "http://localhost:5999/api/getsCategory/getData",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await responseCategory.json();
  return data;
}

export default async function CategoryList() {
  const GetData = await getData();
  return (
    <div className="mt-8">
      <span className="font-[500] p-5 mb-5 text-lg">Trend Categories</span>
      <div className=" py-5 flex items-center gap-5">
        {GetData &&
          GetData.map(
            (obj: { [key: string]: string | number }, index: number) => (
              <Link href={`/explorer?radio=${obj.ID as number}`} key={index}>
                <div className="bg-gray-200 rounded-md p-2 mx-5 w-[150px]">
                  <img
                    src={obj.thumbnail as string}
                    alt={obj.NAMA_CATEGORY as string}
                    className="w-full h-auto"
                  />
                  <p className="py-3 text-center">
                    {obj.NAMA_CATEGORY as string}
                  </p>
                </div>
              </Link>
            )
          )}
      </div>
    </div>
  );
}
