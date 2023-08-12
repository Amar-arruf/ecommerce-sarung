import ButtonCustom from "@/components/ButtonCustom";
import DefaultCard from "@/components/DefaultCard";

async function getData() {
  let response = await fetch("http://localhost:5999/api/getsCategory/getData", {
    method: "GET",
  });

  let data = await response.json();
  return data;
}

export default async function MyProduct() {
  const data = await getData();
  console.log(data);
  return (
    <div className="mr-8 ml-8 mt-5">
      <ButtonCustom btnText="Add New Product" color="custom-color" />
      <div className="my-5 grid grid-cols-4">
        {data.map(
          (items: { [key: string]: string | Number }, index: number) => {
            return (
              <DefaultCard className="!p-2" key={index}>
                <img
                  src={
                    typeof items.thumbnail === "string" ? items.thumbnail : ""
                  }
                  alt={
                    typeof items.NAMA_CATEGORY === "string"
                      ? items.NAMA_CATEGORY
                      : "undefined"
                  }
                  className="w-full h-auto"
                />
                <p className="p-3 font-semibold text-base">
                  {typeof items.NAMA_CATEGORY === "string"
                    ? items.NAMA_CATEGORY
                    : "undefined"}
                </p>
              </DefaultCard>
            );
          }
        )}
      </div>
    </div>
  );
}
