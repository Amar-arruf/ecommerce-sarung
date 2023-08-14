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

export default function createPage() {
  return (
    <div className="mr-8 ml-8">
      <DefaultCard className="!p-8">
        <form
          action="http://localhost:5999/api/form/addProduk"
          method="POST"
          encType="multipart/form-data"
        >
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
      <DefaultCard>
        <div className="p-3">
          <div className="w-full h-9"></div>
        </div>
      </DefaultCard>
    </div>
  );
}
