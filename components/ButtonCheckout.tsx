"use client";

import React, { useEffect } from "react";

const CheckoutNow = (userid: string) => {
  let response = fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/createInvoice/addorder?user_id=${userid}`,
    {
      method: "GET",
    }
  );

  response
    .then((response) => {
      if (!response.ok) {
        console.log("gagal mendapatkan pdf file");
      }
      return response.blob();
    })
    .then((blob) => {
      // Membuat URL objek Blob
      const blobUrl = URL.createObjectURL(blob);

      // Membuka tautan PDF dalam tab baru
      const newTab = window.open(blobUrl, "_blank");
      if (!newTab) {
        console.log(
          "Popup blocker might be preventing opening the PDF in a new tab."
        );
      }

      // Membersihkan URL objek Blob setelah tab baru dibuka
      URL.revokeObjectURL(blobUrl);
    })
    .catch((err) => console.log(err));
};

async function GetDataUserLogin() {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/auth/getAuth`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("failed fetch error Getauth");
  }

  const data = await response.json();

  return data;
}

export default function ButtonCheckout() {
  const [dataLogin, setDataLogin] = React.useState<any>();

  useEffect(() => {
    let isApiSubscribe = true;

    async function fetchData() {
      try {
        const GetAuth = await GetDataUserLogin();
        setDataLogin(GetAuth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    return () => {
      isApiSubscribe = false;
    };
  }, []);

  return (
    <div className="flex items-center justify-center mb-5">
      <button
        className="bg-green-400 p-3  rounded w-[210px] text-white"
        onClick={() => CheckoutNow(dataLogin.user.userID)}
      >
        Checkout Now
      </button>
    </div>
  );
}
