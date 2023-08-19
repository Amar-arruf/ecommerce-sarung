"use client";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function FormSignUp() {
  const MySwal = withReactContent(Swal);

  const handleSubmit = async () => {
    console.log("connected");
    const Akun_ID = document.getElementById("AkunID") as HTMLInputElement;
    const fullname = document.getElementById("FullName") as HTMLInputElement;
    const email = document.getElementById("Email") as HTMLInputElement;
    const password = document.getElementById("Password") as HTMLInputElement;

    // body-content
    let BodyContent = `AkunID=${Akun_ID.value}&FullName=${fullname.value}&Email=${email.value}&Password=${password.value}`;

    try {
      let response = await fetch("http://localhost:5999/api/signup/addUser", {
        method: "POST",
        body: BodyContent,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.ok) {
        MySwal.fire({
          title: "Good Job!",
          text: "data berhasil di daftarkan!",
          icon: "success",
        });
        Akun_ID.value = "";
        fullname.value = "";
        email.value = "";
        password.value = "";
      } else {
        MySwal.fire({
          title: "Failed!",
          text: "data gagal di daftarkan!",
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
        <div className="mb-3">
          <label htmlFor="AkunID" className="block py-3 ">
            Akun ID
          </label>
          <input
            type="text"
            id="AkunID"
            name="AkunID"
            placeholder="akun ID"
            className="w-full border-0 p-2 bg-gray-200 rounded-md"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="FullName" className="block py-3 ">
            Full Name
          </label>
          <input
            type="text"
            id="FullName"
            name="Fullname"
            placeholder="full name"
            className="w-full border-0 p-2 bg-gray-200 rounded-md"
          />
        </div>
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
          <label htmlFor="Password" className="block py-3 ">
            Paswword
          </label>
          <input
            type="text"
            id="Password"
            name="Password"
            placeholder="paswword"
            className="w-full border-0 p-2 bg-gray-200 rounded-md"
          />
        </div>
        <button
          name="submit"
          className="mt-14 bg-green-400 text-white p-2 w-full"
          onClick={handleSubmit}
        >
          Sign up Now
        </button>
        <button
          name="submit"
          className="mt-8 bg-gray-200  text-gray-400 p-2 w-full"
        >
          Back to Sign
        </button>
      </div>
    </>
  );
}
