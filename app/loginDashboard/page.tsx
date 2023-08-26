import DefaultCard from "@/components/DefaultCard";
import FormLoginAdmin from "@/components/FormLoginAdmin";

export default function loginDashboard() {
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <span className="p-5 block w-full text-center text-4xl font-semibold">
          Login Dashboard
        </span>
        <div className="flex flex-cols items-center h-[80vh] justify-center">
          <div className="flex items-center justify-between gap-x-20">
            <DefaultCard
              className2="!w-[50%] !rounded-tr-[50px] !rounded-bl-[50px]"
              className="!h-[400px]"
            >
              <img
                src="/logo.png"
                alt="login.png"
                className="!rounded-tr-[25px] !rounded-bl-[25px] h-full"
              />
            </DefaultCard>
            <FormLoginAdmin />
          </div>
        </div>
      </div>
    </>
  );
}
