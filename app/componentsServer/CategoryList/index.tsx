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
          GetData.map((obj: { [key: string]: string }, index: number) => (
            <div
              className="bg-gray-200 rounded-md p-2 mx-5 w-[150px]"
              key={index}
            >
              <img
                src={obj.thumbnail}
                alt={obj.NAMA_CATEGORY}
                className="w-full h-auto"
              />
              <p className="py-3 text-center">{obj.NAMA_CATEGORY}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
