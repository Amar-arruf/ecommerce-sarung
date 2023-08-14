"use client";
import DefaultCard from "@/components/DefaultCard";

import {
  Label,
  TextInput,
  Select,
  Textarea,
  FileInput,
  Button,
} from "flowbite-react";
import React, { useReducer, useCallback, useState } from "react";
import { TiDelete } from "react-icons/ti";
type State = {
  Category: number;
  Deskripsi_Produk: string;
  Harga: string;
  Nama_Produk: string;
  Stock: number;
};

type Action = {
  type:
    | "CHANGE CATEGORY"
    | "CHANGE DESC"
    | "CHANGE HARGA"
    | "CHANGE NAME"
    | "CHANGE STOCK";
  payload: string;
};

// function reducer
function Reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE CATEGORY":
      return { ...state, Category: Number(action.payload) };
    case "CHANGE DESC":
      return { ...state, Deskripsi_Produk: action.payload };
    case "CHANGE HARGA":
      return { ...state, Harga: action.payload };
    case "CHANGE NAME":
      return { ...state, Nama_Produk: action.payload };
    case "CHANGE STOCK":
      return { ...state, Stock: Number(action.payload) };
    default:
      return state;
  }
}

function FormCustom({ Prop }: { Prop: { props: State; getId: string } }) {
  console.log("re render");

  const initialState: State = {
    Category: Prop.props.Category,
    Deskripsi_Produk: Prop.props.Deskripsi_Produk,
    Harga: Prop.props.Harga,
    Nama_Produk: Prop.props.Nama_Produk,
    Stock: Prop.props.Stock,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setSelectedImage((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const handleDeleteImage = (index: number) => {
    setSelectedImage((prevImages) =>
      prevImages.filter((file, i) => i !== index)
    );
  };

  const handleButtonAdd = async () => {
    if (selectedImage) {
      const bodyContent = new FormData();
      bodyContent.append("ProdukId", Prop.getId);
      selectedImage.forEach((image) => {
        bodyContent.append("file", image);
      });
      try {
        const response = await fetch(
          "http://localhost:5999/api/form/addImageProduk",
          {
            method: "POST",
            body: bodyContent,
          }
        );
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Error uploading image.");
        }
      } catch (error) {
        console.error("Error, ", error);
      }
    }
  };

  return (
    <>
      <DefaultCard className="!p-8">
        <form
          action={`http://localhost:5999/api/produk/Produk_ID/${Prop.getId}`}
          method="POST"
        >
          <div className="flex items-center gap-x-6 mb-5">
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="nama" value="nama produk" />
              </div>
              <TextInput
                id="nama"
                name="Nama_Produk"
                sizing="md"
                type="text"
                value={state.Nama_Produk}
                onChange={useCallback((e: any) => {
                  dispatch({ type: "CHANGE NAME", payload: e.target.value });
                }, [])}
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="harga" value="harga" />
              </div>
              <TextInput
                id="harga"
                name="Harga"
                sizing="md"
                type="text"
                value={state.Harga}
                onChange={useCallback((e: any) => {
                  dispatch({
                    type: "CHANGE HARGA",
                    payload: e.target.value,
                  });
                }, [])}
              />
            </div>
          </div>
          <div className="max-w-full mb-5" id="select">
            <div className="mb-2 block">
              <Label htmlFor="category" value="Category" />
            </div>
            <Select
              id="Category"
              name="Category"
              required
              value={state.Category}
              onChange={useCallback((e: any) => {
                dispatch({ type: "CHANGE HARGA", payload: e.target.value });
              }, [])}
            >
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
              name="Deskripsi_Produk"
              value={state.Deskripsi_Produk}
              onChange={useCallback((e: any) => {
                dispatch({ type: "CHANGE DESC", payload: e.target.value });
              }, [])}
            />
          </div>
          <div className="w-full mb-5">
            <div className="mb-2 block w-full">
              <Label htmlFor="stock" value="stock" />
            </div>
            <TextInput
              id="stock"
              name="Stock"
              sizing="md"
              type="text"
              value={state.Stock}
              onChange={useCallback((e: any) => {
                dispatch({ type: "CHANGE STOCK", payload: e.target.value });
              }, [])}
            />
          </div>
          <Button type="submit">update Product</Button>
        </form>
      </DefaultCard>
      <DefaultCard>
        <div>
          <div className="w-full flex items-center gap-x-6 h-[100px] bg-gray-100 p-3">
            {selectedImage.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                  className="w-[100px] h-auto"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="absolute right-0 top-0"
                >
                  <TiDelete className="text-2xl text-red-400 bg-white" />
                </button>
              </div>
            ))}
          </div>
          <div className="max-w-full mb-5" id="fileUpload">
            <div className="mb-2 block">
              <Label htmlFor="file" value="gambar" />
            </div>
            <FileInput
              id="file"
              multiple
              name="file"
              onChange={handleImageChange}
            />
          </div>
          <Button onClick={handleButtonAdd}>tambah add</Button>
        </div>
      </DefaultCard>
    </>
  );
}

export default React.memo(FormCustom);
