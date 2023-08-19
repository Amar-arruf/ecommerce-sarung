import CategoryList from "./componentsServer/CategoryList";
import Footer from "./componentsServer/Footer";

import Hero from "./componentsServer/Hero";
import Nav from "./componentsServer/Nav";
import ProdukList from "./componentsServer/ProdukList";

export default async function Home() {
  let ElementCategory: JSX.Element;
  ElementCategory = await CategoryList();
  let ElementProdukList = await ProdukList();
  return (
    <>
      <div className="container custom-width:container mx-auto">
        <Nav />
        <Hero />
        {ElementCategory}
        {ElementProdukList}
      </div>
      <Footer />
    </>
  );
}
