"use client";

import { Dropdown, Navbar, Avatar, Flowbite, Badge } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/navigation";

const theme: CustomFlowbiteTheme = {
  dropdown: {
    arrowIcon: "hidden ml-2 h-4 w-4",
  },
  badge: {
    root: {
      size: {
        custom: "text-4xl",
      },
    },
  },
};

async function getTransaction() {
  const response = await fetch(
    "http://localhost:5999/api/getTransaction/getData",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed Fetch Data Get transaction");
  }
  const data = await response.json();
  return data;
}

async function getuser() {
  const response = await fetch(
    "http://localhost:5999/api/user/AkunID/1231134",
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed Fetch Data getuser");
  }
  const data = await response.json();
  return data;
}

export default function TopBar(props: { Title: string; Desc: string }) {
  const [data, setData] = useState<{ [key: string]: any }[]>([]);
  const [user, setUser] = useState<{ [key: string]: any }[]>([]);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  useEffect(() => {
    let isApiSubscribed = true;
    async function fetchData() {
      try {
        const GetUser = await getuser();
        const getTransact = await getTransaction();

        if (isApiSubscribed) {
          setUser(GetUser);
          setData(getTransact);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    return () => {
      isApiSubscribed = false;
      console.log("disconnect");
    };
  }, []);
  console.log(user);

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
          router.push("/loginDashboard");
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
    <div className="ml-8 mr-8">
      <Flowbite theme={{ theme: theme }}>
        <Navbar fluid rounded className="!w-full  !bg-transparent">
          <div>
            <Navbar.Brand>
              <span className="self-center whitespace-nowrap text-xl py-3 font-semibold dark:text-white">
                {props.Title}
              </span>
            </Navbar.Brand>
            <p className="text-base text-gray-400 text-[16px]">{props.Desc}</p>
          </div>
          <div className="flex md:order-2 items-center">
            <Dropdown
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {user.length > 0 ? user[0].Nama : "default"}
                </span>
              </Dropdown.Header>
              <Dropdown.Item onClick={() => handleLogout()}>
                Logout
              </Dropdown.Item>
            </Dropdown>
            <div className="px-3 text-sm">
              Hi,{user.length > 0 ? user[0].Nama : "default"}{" "}
            </div>

            <button
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                {data.length}
              </div>
            </button>
          </div>
        </Navbar>
      </Flowbite>
    </div>
  );
}
