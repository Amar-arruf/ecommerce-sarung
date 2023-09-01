"use client";

import { Dropdown } from "flowbite-react";
import AvatarCustom from "@/components/AvatarCustom";
import { usePathname, useRouter } from "next/navigation";

async function getAuth() {
  const response = await fetch("http://localhost:5999/api/auth/getAuth", {
    method: "GET",
    cache: "no-cache",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("failed Fetching data GetAuth");
  }

  const data = await response.json();
  return data;
}

async function getUser(userId: string) {
  const response = await fetch(
    `http://localhost:5999/api/user/AkunID/${userId}`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    throw new Error("failed Fetching data Get User");
  }

  const data = await response.json();
  return data;
}

async function GetCart(userId: string) {
  const response = await fetch(
    `http://localhost:5999/api/keranjang/User_ID/${userId}`
  );

  if (!response.ok) {
    throw new Error("failed Fetching data GetCart");
  }

  const data = await response.json();
  return data;
}

import React, { useEffect } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Nav() {
  const [data, setData] = React.useState<any>(null);
  const [cart, setCart] = React.useState<any>([]);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    let isApiSubscribed = true;
    async function fetchdata() {
      try {
        if (pathname !== "/login") {
          const getAuthData = await getAuth();
          const getUserData = await getUser(getAuthData.user.userID);
          // jika array kosong
          if (getUserData.length === 0) {
            setData(getAuthData);
          } else {
            setData(getUserData);
          }

          const getCart = await GetCart(getAuthData.user.userID);
          setCart(getCart);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchdata();
    return () => {
      isApiSubscribed = false;
      console.log("disconnect");
    };
  }, []);

  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      let responseLogout = await fetch(
        "http://localhost:5999/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (responseLogout.ok) {
        MySwal.fire({
          title: "Berhasil!",
          text: "berhasil logout!",
          icon: "success",
        }).then((confirm) => {
          document.cookie =
            "username=connect.sid; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          router.push("/login");
        });
      } else {
        MySwal.fire({
          title: "Gagal!",
          text: await responseLogout.text(),
          icon: "warning",
        });
      }
    } catch (error) {
      MySwal.fire({
        title: "Gagal!",
        text: `${error}`,
        icon: "error",
      });
    }
  };
  return (
    <div className="p-5 flex items-center">
      <img src="/logo.png" alt="logo" className="w-[50px] h-auto" />
      <nav className="px-5 ml-auto">
        <ul className="flex items-center gap-y-2 gap-x-8">
          <li className="p-2" onClick={() => router.push("/")}>
            Home
          </li>
          <li className="p-2" onClick={() => router.push("/explorer")}>
            Explore
          </li>
          <li className="p-2" onClick={() => router.push("/#About")}>
            About
          </li>
          {pathname === "/signup" || pathname === "/login" || data ? (
            <li className="p-2 hidden">Sign up</li>
          ) : (
            <li className="p-2" onClick={() => router.push("/signup")}>
              Sign up
            </li>
          )}
        </ul>
      </nav>
      {pathname === "/signup" || pathname === "/login" || data ? (
        <button className=" hidden bg-green-500 text-white p-3 w-[120px] rounded-lg">
          Sign in
        </button>
      ) : (
        <button
          className="bg-green-500 text-white p-3 w-[120px] rounded-lg"
          onClick={() => router.push("/login")}
        >
          Sign in
        </button>
      )}
      {data && (
        <div className="flex items-center gap-x-3">
          <Dropdown
            inline
            label={
              <div className="flex items-center ">
                <AvatarCustom
                  alt={
                    data.hasOwnProperty("user")
                      ? data.user.username
                      : data[0].Nama
                  }
                  src={"https://reqres.in/img/faces/8-image.jpg"}
                />
                <Dropdown.Header className="!p-0">
                  <span className="block text-sm w-[80px]">
                    {data.hasOwnProperty("user")
                      ? data.user.username
                      : data[0].Nama}
                  </span>
                </Dropdown.Header>
              </div>
            }
          >
            <Dropdown.Item onClick={() => router.push("/userprofile")}>
              About
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => handleLogout()}>Logout</Dropdown.Item>
          </Dropdown>
          <button
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => router.push("/cart")}
          >
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="shopping 1" clipPath="url(#clip0_209_74)">
                <g id="Group">
                  <g id="Group_2">
                    <path
                      id="Vector"
                      d="M24 14.8053V10.0136H21.0326L14.0085 3.52323C14.0873 3.3009 14.1307 3.06189 14.1307 2.81281C14.1307 1.63795 13.1749 0.682129 12 0.682129C10.8251 0.682129 9.86932 1.63795 9.86932 2.81281C9.86932 3.06187 9.91267 3.3009 9.99155 3.52323L2.96739 10.0136H0V14.8053H0.838911L3.75375 23.3182H20.2462L23.161 14.8053H24V14.8053ZM15.903 17.3538H12.8412V14.8285H16.1524L15.903 17.3538ZM11.1588 21.6357H8.5198L8.2631 19.0363H11.1588V21.6357ZM8.09698 17.3538L7.84763 14.8285H11.1588V17.3538H8.09698ZM12.4482 2.81281C12.4482 2.94273 12.3923 3.05956 12.3037 3.14149C12.2238 3.21542 12.1172 3.26102 12 3.26102C11.8828 3.26102 11.7763 3.21542 11.6963 3.14149C11.6077 3.05954 11.5518 2.94273 11.5518 2.81281C11.5518 2.68289 11.6077 2.56605 11.6963 2.48413C11.7762 2.4102 11.8828 2.3646 12 2.3646C12.1172 2.3646 12.2237 2.4102 12.3037 2.48413C12.3923 2.56608 12.4482 2.68289 12.4482 2.81281ZM11.1336 4.75869C11.3985 4.87711 11.6916 4.94351 12 4.94351C12.3084 4.94351 12.6015 4.87711 12.8664 4.75869L18.5535 10.0136H5.44657L11.1336 4.75869ZM1.68247 11.696H22.3175V13.1229H1.68247V11.696ZM6.15699 14.8285L6.40634 17.3538H3.4899L2.62525 14.8285H6.15699ZM4.95605 21.6357L4.06597 19.0363H6.57249L6.82916 21.6357H4.95605ZM12.8412 19.0362H15.7369L15.4802 21.6357H12.8412V19.0362ZM19.044 21.6357H17.1708L17.4275 19.0363H19.934L19.044 21.6357ZM20.5101 17.3538H17.5937L17.843 14.8285H21.3748L20.5101 17.3538Z"
                      fill="#0C0D36"
                    />
                  </g>
                </g>
              </g>
              <defs>
                <clipPath id="clip0_209_74">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span className="sr-only">Notifications</span>
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-1 border-white rounded-full top-2 -right-1">
              {cart.length}
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
