import { FormSetting } from "@/components/FormSetting";

async function getData() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/user/userID/ID1231134`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("failed fetch data");
  }
  const data = await response.json();
  return data;
}

export default async function SettingPage() {
  const Data = await getData();
  console.log(Data);
  return (
    <div className="mr-8 ml-8">
      <FormSetting
        props={{
          Prop: {
            nama: Data[0].Nama,
            alamat1: Data[0].Alamat1,
            alamat2: Data[0].Alamat2,
            postkode: Data[0].kodepos,
            city: Data[0].Kota,
            provinsi: Data[0].provinsi,
            telepon: Data[0].Telepon,
          },
          getId: Data[0].UserID,
        }}
      />
    </div>
  );
}
