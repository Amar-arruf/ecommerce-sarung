"use client";

import { useRouter, usePathname } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function FormLogin() {
  const MySwal = withReactContent(Swal);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("connected");

    const email = document.getElementById("Email") as HTMLInputElement;
    const password = document.getElementById("Password") as HTMLInputElement;

    // body-content
    let BodyContent = `Email=${email.value}&Password=${password.value}`;

    try {
      let response = await fetch("http://localhost:5999/api/login/getUser", {
        method: "POST",
        body: BodyContent,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
      });

      if (response.ok) {
        MySwal.fire({
          title: "Good Job!",
          text: "berhasil login!",
          icon: "success",
        }).then((result) => {
          router.push("http://localhost:3000/");
        });
      } else {
        MySwal.fire({
          title: "Failed!",
          text: "gagal login",
          icon: "error",
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        text: `${error}`,
      });
    }
  };
  return (
    <>
      <div className="w-[323px]">
        <p className="text-2xl py-5">
          memulai untuk jual beli dengan cara terbaru
        </p>
        <form onSubmit={handleSubmit} method="POST">
          <div className="mb-3">
            <label htmlFor="Email" className="block py-3 ">
              Email Address
            </label>
            <input
              type="text"
              id="Email"
              name="Email"
              placeholder="Email"
              className="w-full border-0 p-2 bg-gray-200 rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block py-3 ">
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className="w-full border-0 p-2 bg-gray-200 rounded-md"
            />
          </div>
          <button
            name="submit"
            type="submit"
            className="mt-5 bg-green-400 text-white p-2 w-full"
          >
            Sign In to My Account
          </button>
        </form>
        {usePathname() !== "/loginDashboard" && (
          <button className="mt-5 bg-gray-200  text-gray-400 p-2 w-full">
            Sign up
          </button>
        )}
      </div>
    </>
  );
}
