"use client";

import DefaultCard from "@/components/DefaultCard";

import { Label, TextInput, Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface State {
  userid: string;
  nama: string;
  alamat1: string;
  alamat2: string;
  provinsi: string;
  city: string;
  postkode: string;
  telepon: string;
}

type Action = {
  type:
    | "CHANGE ALAMAT1"
    | "CHANGE ALAMAT2"
    | "CHANGE CITY"
    | "CHANGE NAME"
    | "CHANGE PROVINSI"
    | "CHANGE POSTKODE"
    | "CHANGE TELEPON"
    | "CHANGE USERID";
  payload: string;
};

type userLogin = {
  [key: string]: any;
};

// function reducer
function Reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE USERID":
      return { ...state, userid: action.payload };
    case "CHANGE NAME":
      return { ...state, nama: action.payload };
    case "CHANGE ALAMAT1":
      return { ...state, alamat1: action.payload };
    case "CHANGE ALAMAT2":
      return { ...state, alamat2: action.payload };
    case "CHANGE CITY":
      return { ...state, city: action.payload };
    case "CHANGE POSTKODE":
      return { ...state, postkode: action.payload };
    case "CHANGE PROVINSI":
      return { ...state, provinsi: action.payload };
    case "CHANGE TELEPON":
      return { ...state, telepon: action.payload };
    default:
      return state;
  }
}

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

async function GetDataUser(userid: number) {
  let response = await fetch(
    `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/user/AkunID/${userid}`,
    {
      method: "GET",
    }
  );
  if (!response.ok) {
    throw new Error(
      "gagal mendapatakan data data user dengan status response" +
        response.status
    );
  }
  const data = await response.json();
  return data;
}

const FormBio = () => {
  const MySwal = withReactContent(Swal);
  let initialState: State;
  initialState = {
    userid: "",
    nama: "",
    alamat1: "",
    alamat2: "",
    provinsi: "",
    city: "",
    postkode: "",
    telepon: "",
  };

  const [dataLogin, setDataLogin] = useState<any>();
  const [state, dispatch] = useReducer(Reducer, initialState);
  const router = useRouter();

  useEffect(() => {
    let isApiSubscribe = true;

    async function fetchData() {
      try {
        const GetAuth = await GetDataUserLogin();
        setDataLogin(GetAuth);
        const getDataUser = await GetDataUser(GetAuth.user.userID);

        if (getDataUser.length > 0) {
          dispatch({
            type: "CHANGE USERID",
            payload: String(getDataUser[0].UserID),
          });
          dispatch({
            type: "CHANGE NAME",
            payload: String(getDataUser[0].Nama),
          });
          dispatch({
            type: "CHANGE ALAMAT1",
            payload: String(getDataUser[0].Alamat1),
          });
          dispatch({
            type: "CHANGE ALAMAT2",
            payload: String(getDataUser[0].Alamat2),
          });
          dispatch({
            type: "CHANGE PROVINSI",
            payload: `${getDataUser[0].provinsi}` as string,
          });
          dispatch({
            type: "CHANGE CITY",
            payload: getDataUser[0].Kota as string,
          });
          dispatch({
            type: "CHANGE POSTKODE",
            payload: String(getDataUser[0].kodepos),
          });
          dispatch({
            type: "CHANGE TELEPON",
            payload: getDataUser[0].Telepon as string,
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    return () => {
      isApiSubscribe = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    let bodyContent;
    const getDataUser = await GetDataUser(dataLogin.user.userID);

    if (getDataUser.length > 0) {
      bodyContent = `Nama=${state.nama}&Telepon=${state.telepon}&Alamat1=${
        state.alamat1
      }&Alamat2=${state.alamat2}&provinsi=${state.provinsi}&Kota=${
        state.city
      }&kodepos=${Number(state.postkode)}`;
    } else {
      bodyContent = `UserID=${state.userid}&AkunID=${
        dataLogin.user.userID
      }&Nama=${state.nama}&Telepon=${state.telepon}&Alamat1=${
        state.alamat1
      }&Alamat2=${state.alamat2}&provinsi=${state.provinsi}&Kota=${
        state.city
      }&kodepos=${Number(state.postkode)}`;
    }

    // buat sebuah pengkondisian jika ada data
    // maka tidak perlu  di tambahkan

    if (getDataUser.length > 0) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/user/AkunID/${dataLogin.user.userID}`,
          {
            method: "POST",
            body: bodyContent,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.ok) {
          MySwal.fire({
            title: "Good Job!",
            text: "data berhasil di update / tambah!",
            icon: "success",
          }).then((confirm) => {
            window.location.reload();
          });
        } else {
          MySwal.fire({
            title: "Failed!",
            text: await response.text(),
            icon: "error",
          });
        }
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: `${error}`,
        });
      }
    } else {
      try {
        let response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST_BACKEND}/api/user/`,
          {
            method: "POST",
            body: bodyContent,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        if (response.ok) {
          MySwal.fire({
            title: "Good Job!",
            text: "data berhasil di update / tambah!",
            icon: "success",
          });
        } else {
          MySwal.fire({
            title: "Failed!",
            text: await response.text(),
            icon: "error",
          });
        }
      } catch (error) {
        MySwal.fire({
          icon: "error",
          text: `${error}`,
        });
      }
    }
  };

  return (
    <>
      <DefaultCard>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center gap-x-6 mb-5">
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="UserID" value="User ID" />
              </div>
              <TextInput
                id="nama"
                name="UserId"
                sizing="md"
                type="text"
                value={state.userid}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE USERID", payload: e.target.value })
                }
              />
            </div>{" "}
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="nama" value="Your Name" />
              </div>
              <TextInput
                id="nama"
                name="Nama"
                sizing="md"
                type="text"
                value={state.nama}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE NAME", payload: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="telepon" value="Your Telp" />
              </div>
              <TextInput
                id="telepon"
                name="Telepon"
                sizing="md"
                type="text"
                value={state.telepon}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE TELEPON", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-x-6 mb-5">
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="Address1" value="Address 1" />
              </div>
              <TextInput
                id="Address1"
                name="Alamat1"
                sizing="md"
                type="text"
                value={state.alamat1}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE ALAMAT1", payload: e.target.value })
                }
              />
            </div>
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="Address2" value="Address 2" />
              </div>
              <TextInput
                id="Address2"
                name="Alamat2"
                sizing="md"
                type="text"
                value={state.alamat2}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE ALAMAT2", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-x-6 mb-5">
            <div className="shrink w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="Province" value="Province" />
              </div>
              <TextInput
                id="Province"
                name="provinsi"
                sizing="md"
                type="text"
                value={state.provinsi}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE PROVINSI", payload: e.target.value })
                }
              />
            </div>
            <div className="shrink w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="city" value="City" />
              </div>
              <TextInput
                id="city"
                name="Kota"
                sizing="md"
                type="text"
                value={state.city}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE CITY", payload: e.target.value })
                }
              />
            </div>
            <div className="shrink w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="postalcode" value="postalcode" />
              </div>
              <TextInput
                id="postalcode"
                name="kodepos"
                sizing="md"
                type="text"
                value={state.postkode}
                onChange={(e: any) =>
                  dispatch({ type: "CHANGE POSTKODE", payload: e.target.value })
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-x-6 mb-5">
            <div className="w-full">
              <div className="mb-2 block w-full">
                <Label htmlFor="country" value="Country" />
              </div>
              <TextInput
                id="country"
                sizing="md"
                type="text"
                value="Indonesia"
                readOnly
              />
            </div>
          </div>
          <div className="w-fit ml-auto">
            <Button type="submit">Save Now</Button>
          </div>
        </form>
      </DefaultCard>
    </>
  );
};

export default FormBio;
