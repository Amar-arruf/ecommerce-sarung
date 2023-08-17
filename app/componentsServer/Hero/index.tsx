import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export default function Hero() {
  return (
    <div className="my-4">
      <div className="overflow-hidden w-[100%] h-[50vh] relative rounded-[55px]">
        <Image src="/heroImage.jpeg" fill alt={"heroImage"} />
        <div className="absolute l-0 flex h-full flex-columns items-center justify-center w-[356px]">
          <div className="p-5">
            <h1
              className={`${montserrat.className} font-medium text-white text-4xl`}
            >
              Discount 50% Off All Member
            </h1>
            <p
              className={`${montserrat.className} font-normal mt-4 text-white`}
            >
              Included tax pricing for U.S citizen or other countries
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
