import Nav from "@/app/componentsServer/Nav";
import DefaultCard from "@/components/DefaultCard";
import FormLogin from "@/components/FormLogin";

export default function login() {
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <div className="flex flex-cols justify-center">
          <div className="flex items-center justify-between gap-x-20">
            <DefaultCard
              className2="!w-[50%] !rounded-tr-[50px] !rounded-bl-[50px]"
              className="!h-[400px]"
            >
              <img
                src="/login.jpeg"
                alt="login.jpeg"
                className="!rounded-tr-[25px] !rounded-bl-[25px] h-full"
              />
            </DefaultCard>
            <FormLogin />
          </div>
        </div>
      </div>
    </>
  );
}
