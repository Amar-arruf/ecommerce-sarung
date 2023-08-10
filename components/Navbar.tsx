"use client";

import { Flowbite, Sidebar } from "flowbite-react";

import type { CustomFlowbiteTheme } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  sidebar: {
    logo: {
      img: "mr-3 sm:h-7 lg:mx-auto lg:w-[50%] lg:h-[110px]",
    },
    item: {
      base: "flex items-center justify-center p-2 my-8 text-base font-normal text-gray-400 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
    },
  },
};

export default function Navbar(params: { path: string }) {
  return (
    <Flowbite theme={{ theme: customTheme }}>
      <Sidebar className="h-screen">
        <Sidebar.Logo
          href="#"
          img="/logo.png"
          imgAlt="Ecommerce logo"
          className="h-[120px] mb-12"
        ></Sidebar.Logo>
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item
              href="#"
              className={
                "" +
                (params.path == "Dashboard"
                  ? "bg-gradient-to-r from-transparent from-50% to-[#FF7158] to-100% border-r-2 border-red-600 !font-semibold !text-black"
                  : "")
              }
            >
              <p>Dashboard</p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={
                "" +
                (params.path == "Products"
                  ? "bg-gradient-to-r from-transparent from-50% to-[#FF7158] to-100% border-r-2 border-red-600  !text-black"
                  : "")
              }
            >
              <p>My Products</p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={
                "" +
                (params.path == "Transactions"
                  ? "bg-gradient-to-r from-transparent from-50% to-[#FF7158] to-100% border-r-2 border-red-600  !text-black"
                  : "")
              }
            >
              <p>Transactions</p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={
                "" +
                (params.path == "Settings"
                  ? "bg-gradient-to-r from-transparent from-50% to-[#FF7158] to-100% border-r-2 border-red-600  !text-black"
                  : "")
              }
            >
              <p>Store Settings</p>
            </Sidebar.Item>
            <Sidebar.Item
              href="#"
              className={
                "" +
                (params.path == "Account"
                  ? "bg-gradient-to-r from-transparent from-50% to-[#FF7158] to-100% border-r-2 border-red-600  !text-black"
                  : "")
              }
            >
              <p>My Account</p>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </Flowbite>
  );
}
