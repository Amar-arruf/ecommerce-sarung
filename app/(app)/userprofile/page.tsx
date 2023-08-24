import Footer from "@/app/componentsServer/Footer";
import Nav from "@/app/componentsServer/Nav";
import FormBio from "@/components/FormBio";

export default function userprofile() {
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <span className="inline-block mt-8 w-[300px] text-base font-medium text-black">
          User Profile
        </span>
        <FormBio />
      </div>
      <Footer />
    </>
  );
}
