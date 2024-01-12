"use client";

import DefaultCard from "@/components/DefaultCard";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  Label,
  TextInput,
  Select,
  Textarea,
  FileInput,
  Button,
} from "flowbite-react";
import React from "react";

export default function createPage() {
  const MySwal = withReactContent(Swal);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    // ambil data dari form
    const BodyContent = new FormData();
    const nama = document.getElementById("nama") as HTMLInputElement;
    const harga = document.getElementById("harga") as HTMLInputElement;
    const category = document.getElementById("Category") as HTMLInputElement;
    const deskripsi = document.getElementById("descripsi") as HTMLInputElement;
    const fileimage = document.getElementById("file") as HTMLInputElement;
    const stock = document.getElementById("stock") as HTMLInputElement;
    // tambahkan ke body
    BodyContent.append("produkname", nama.value);
    BodyContent.append("produkharga", harga.value);
    BodyContent.append("category", category.value);
    BodyContent.append("deskripsi", deskripsi.value);
    BodyContent.append("stock", stock.value);

    let fileImage: File | null;

    fileImage =
      typeof fileimage.files?.item(0) !== null &&
      typeof fileimage.files?.item(0) !== undefined
        ? (fileimage.files?.item(0) as File)
        : null;

    if (typeof fileImage !== null) {
      BodyContent.append("file", fileImage as File);
    }

    console.log(fileImage);
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/form/addProduk`,
        {
          method: "POST",
          body: BodyContent,
        }
      );
      if (response.ok) {
        MySwal.fire({
          title: "Good Job!",
          text: "data berhasil ditambahkan",
          icon: "success",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "failed",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  return (
    <div className="mr-8 ml-8">
      <DefaultCard className="!p-8">
        <form onSubmit={handleSubmit} encType="multipart/from-data">
          <div className="flex items-center gap-x-6 mb-5">
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="nama" value="nama produk" />
              </div>
              <TextInput id="nama" name="produkname" sizing="md" type="text" />
            </div>
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="harga" value="harga" />
              </div>
              <TextInput
                id="harga"
                name="produkharga"
                sizing="md"
                type="text"
              />
            </div>
          </div>
          <div className="max-w-full mb-5" id="select">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <Select id="Category" name="category" required>
              <option value={1}>Gajah Duduk</option>
              <option value={2}>Batik</option>
              <option value={3}>Donggala</option>
              <option value={4}>BHS</option>
              <option value={5}>Ardan</option>
              <option value={6}>Wadimor</option>
            </Select>
          </div>
          <div className="max-w-full mb-5" id="textarea">
            <div className="mb-2 block">
              <Label htmlFor="descripsi" value="Deskripsi" />
            </div>
            <Textarea
              id="descripsi"
              placeholder="Deskripsi..."
              required
              rows={6}
              name="deskripsi"
            />
          </div>
          <div className="w-full mb-5">
            <div className="mb-2 block w-full">
              <Label htmlFor="stock" value="stock" />
            </div>
            <TextInput id="stock" name="stock" sizing="md" type="text" />
          </div>
          <div className="max-w-full mb-5" id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="thumbnail" />
            </div>
            <FileInput id="file" name="file" />
          </div>
          <Button type="submit">tambah Product</Button>
        </form>
      </DefaultCard>
    </div>
  );
}
