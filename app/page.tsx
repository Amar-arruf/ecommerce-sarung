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
        <div className="mt-8 divide-y-2" id="About">
          <span className="block font-[500] w-full pb-2 text-center">
            About me
          </span>
          <p className="text-center px-3 py-4 ">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            veniam quas fuga debitis sapiente vero optio hic at, non, explicabo
            accusantium saepe quam. Rerum nostrum et facilis dolorem, veniam
            voluptates! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Veritatis earum illum in vitae similique ullam quidem suscipit
            minus distinctio accusamus hic doloribus, nisi dolore nihil
            voluptate voluptas vel corporis possimus?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Quia harum placeat, excepturi atque
            tenetur alias, delectus ipsam vitae eveniet maiores, asperiores
            veritatis voluptas adipisci inventore. Distinctio voluptate magni
            quia non.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
