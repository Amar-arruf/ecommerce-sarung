import Nav from "@/app/componentsServer/Nav";
import FormSignUp from "@/components/FormSignUp";

export default function SignUp() {
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <div className="flex flex-cols items-center p-3 justify-center">
          <FormSignUp />
        </div>
      </div>
    </>
  );
}
