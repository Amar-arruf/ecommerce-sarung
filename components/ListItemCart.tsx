"use client";

import { Button, Table } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ListItemCart() {
  const [data, setData] = useState<{ [key: string]: string | number }[]>([]);
  const mySwal = withReactContent(Swal);
  const router = useRouter();

  useEffect(() => {
    let isApiSubscribed = true;
    const response = fetch(
      `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/listcart/getData`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      }
    );
    response
      .then((response) => {
        if (isApiSubscribed) {
          return response.json();
        }
      })
      .then((data) => setData(data))
      .catch((errr) => console.error(errr));
    return () => {
      isApiSubscribed = false;
      console.log("disconnect");
    };
  }, []);

  const handleRemoveItem = async (CartID: string) => {
    try {
      let responseDelete = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/keranjang/CartID/${CartID}`,
        {
          method: "DELETE",
        }
      );
      if (!responseDelete.ok) {
        mySwal.fire({
          title: "Failed!",
          text: "data gagal di hapus!",
          icon: "error",
        });
      } else {
        mySwal
          .fire({
            title: "Berhasil!",
            text: "data Berhasil di hapus!",
            icon: "success",
          })
          .then((confirm) => {
            window.location.reload();
          });
      }
    } catch (error) {
      mySwal.fire({
        title: "Failed!",
        text: `${error}`,
        icon: "error",
      });
    }
  };
  return (
    <>
      <Table>
        <Table.Head>
          <Table.HeadCell>image</Table.HeadCell>
          <Table.HeadCell>Nama Produk</Table.HeadCell>
          <Table.HeadCell>Harga</Table.HeadCell>
          <Table.HeadCell>Quantity</Table.HeadCell>
          <Table.HeadCell>
            <span>Hapus</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data &&
            data.map((obj, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="w-[200px]">
                  <img
                    src={obj.url_image as string}
                    alt={obj.Produk_Name as string}
                    className="rounded-2xl w-full"
                  />
                </Table.Cell>
                <Table.Cell className="text-base font-[500] text-black">
                  {obj.Produk_Name as string}
                </Table.Cell>
                <Table.Cell className="text-base font-[500] text-black">
                  {obj.TotalHarga as string}
                </Table.Cell>
                <Table.Cell className="text-base font-[500] text-black">
                  {obj.Quantity as string}
                </Table.Cell>
                <Table.Cell className="!text-center">
                  <Button
                    className="bg-red-400 w-[50%]"
                    onClick={() => handleRemoveItem(obj.CartID as string)}
                  >
                    <p>Remove</p>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </>
  );
}
