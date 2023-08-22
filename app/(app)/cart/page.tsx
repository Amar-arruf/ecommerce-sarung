import Footer from "@/app/componentsServer/Footer";
import Nav from "@/app/componentsServer/Nav";
import ButtonCheckout from "@/components/ButtonCheckout";
import FormBio from "@/components/FormBio";
import ListItemCart from "@/components/ListItemCart";

export default function cart() {
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <span className="inline-block py-3">
          Home / <b>Cart</b>
        </span>
        <div className="mt-5">
          <ListItemCart />
          <div className="mt-8 border-t-2">
            <span className="inline-block pt-6 mb-1 font-bold">
              Shipping Details
            </span>
          </div>
          <FormBio />
          <ButtonCheckout />
        </div>
      </div>
      <Footer />
    </>
  );
}
