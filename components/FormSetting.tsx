"use client";

import DefaultCard from "@/components/DefaultCard";

import { Label, TextInput, Button } from "flowbite-react";
import { useReducer } from "react";

interface State {
  nama: string;
  alamat1: string;
  alamat2: string;
  provinsi: string;
  city: string;
  postkode: number;
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
    | "CHANGE TELEPON";
  payload: string;
};

// function reducer
function Reducer(state: State, action: Action): State {
  switch (action.type) {
    case "CHANGE NAME":
      return { ...state, nama: action.payload };
    case "CHANGE ALAMAT1":
      return { ...state, alamat1: action.payload };
    case "CHANGE ALAMAT2":
      return { ...state, alamat2: action.payload };
    case "CHANGE CITY":
      return { ...state, city: action.payload };
    case "CHANGE POSTKODE":
      return { ...state, postkode: Number(action.payload) };
    case "CHANGE PROVINSI":
      return { ...state, provinsi: action.payload };
    case "CHANGE TELEPON":
      return { ...state, telepon: action.payload };
    default:
      return state;
  }
}

export const FormSetting = ({
  props,
}: {
  props: { Prop: State; getId: string };
}) => {
  const initialState: State = {
    nama: props.Prop.nama,
    alamat1: props.Prop.alamat1,
    alamat2: props.Prop.alamat2,
    provinsi: props.Prop.provinsi,
    city: props.Prop.city,
    postkode: props.Prop.postkode,
    telepon: props.Prop.telepon,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <>
      <DefaultCard>
        <form
          action={`http://localhost:5999/api/user/userID/${props.getId}`}
          method="POST"
        >
          <div className="flex items-center gap-x-6 mb-5">
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
