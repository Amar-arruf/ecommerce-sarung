"use client";

import { TextInput, Label, Radio } from "flowbite-react";
import DefaultCard from "./DefaultCard";
import React from "react";
import { useRouter } from "next/navigation";

export default function FormInput() {
  const [search, setSearch] = React.useState<string>("");
  const [radio, setRadio] = React.useState<number>(0);
  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    router.push(`http://localhost:3000/explorer?search=${value}`);
  };

  const handleSetRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRadio(Number(value));
    router.push(`http://localhost:3000/explorer?radio=${value}`);
  };
  console.log(search);
  console.log(radio);
  return (
    <div className="sticky top-0">
      <DefaultCard>
        <span className="font-bold pb-5">Produk</span>
        <TextInput
          id="search"
          name="search"
          sizing="md"
          type="text"
          placeholder="pencarian"
          value={search}
          onChange={handleSearch}
        />
      </DefaultCard>
      <DefaultCard>
        <span className="font-bold pb-5">kategori</span>
        <fieldset className="flex max-w-md flex-col gap-4" id="radio">
          <legend className="mb-4 text-sm">
            Pilih Favorite Sarung yang kamu sukai
          </legend>
          <div className="flex items-center gap-2">
            <Radio
              id="gajah-duduk"
              name="category"
              value={1}
              onChange={handleSetRadio}
            />
            <Label htmlFor="gajah-duduk">Gajah Duduk</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="batik"
              name="category"
              value={2}
              onChange={handleSetRadio}
            />
            <Label htmlFor="batik">Batik</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="donggala"
              name="category"
              value={3}
              onChange={handleSetRadio}
            />
            <Label htmlFor="donggala">Donggala</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="bhs"
              name="category"
              value={4}
              onChange={handleSetRadio}
            />
            <Label htmlFor="bhs">BHS</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="ardan"
              name="category"
              value={5}
              onChange={handleSetRadio}
            />
            <Label htmlFor="ardan">Ardan</Label>
          </div>
          <div className="flex items-center gap-2">
            <Radio
              id="wadimor"
              name="category"
              value={6}
              onChange={handleSetRadio}
            />
            <Label htmlFor="wadimor">Wadimor</Label>
          </div>
        </fieldset>
      </DefaultCard>
    </div>
  );
}
