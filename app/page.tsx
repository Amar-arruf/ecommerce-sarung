import CategoryList from "./componentsServer/CategoryList";

import Hero from "./componentsServer/Hero";
import Nav from "./componentsServer/Nav";
import ProdukList from "./componentsServer/ProdukList";

export default async function Home() {
  let ElementCategory: JSX.Element;
  ElementCategory = await CategoryList();
  let ElementProdukList = await ProdukList();
  return (
    <>
      <Nav />
      <Hero />
      {ElementCategory}
      {ElementProdukList}
    </>
  );
}
