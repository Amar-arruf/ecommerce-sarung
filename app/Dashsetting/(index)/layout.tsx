import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";
import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-Roboto",
  display: "swap",
  weight: ["400", "300", "700", "100", "200", "500"],
});

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className={`flex ${poppins.className} bg-[#F5F5FB]`}>
      {/* Include shared UI here e.g. a header or sidebar */}
      <Navbar path="Account" />
      <div className="w-full">
        <TopBar Title="My Account" Desc="Update Your Current profile" />
        {children}
      </div>
    </section>
  );
}
