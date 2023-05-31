/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import { JWTPayloadTypes, userTypes } from "services/data-types";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({
    avatar: "",
  });
  const router = useRouter();

  function isImageExist(url: string) {
    var img = new Image();
    img.src = url;
    return img.height != 0;
  }

  // cara untuk mengambil token
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: userTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      user.avatar = `${IMG}/${userFromPayload.avatar}`;
      console.log("jwt_decode :", user);

      setIsLogin(true);
      // setUser(user);
      setUser({
        ...userFromPayload,
        avatar: IMG + `/${userFromPayload.avatar}`,
      });
      // if (isImageExist(`${IMG}/${userFromPayload.avatar}`) == false) {
      //   setUser({
      //     ...userFromPayload,
      //     avatar: "/img/avatar-1.png",
      //   });
      // }
    }
  }, []);

  // memghapus fungsi token yang tersimpan dicookies agar tidak bisa masuk ke suatu halaman sebelum login 
  const onLogout = () => {
    Cookies.remove("token");
    router.push("/");
    setIsLogin(false);
  };

  if (isLogin) {
    return (
      <li className="nav-item my-auto dropdown d-flex">
        <div className="vertical-line d-lg-block d-none" />
        <div className="dropdown">
          <a
            className="dropdown-toggle ms-lg-40"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={user.avatar}
              className="rounded-circle"
              width="40"
              height="40"
              alt=""
            />
          </a>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <Link
                href="/member"
                className="dropdown-item text-lg color-palette-2"
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link href="/" className="dropdown-item text-lg color-palette-2">
                Wallet
              </Link>
            </li>
            <li>
              <Link
                href="/member/edit-profile"
                className="dropdown-item text-lg color-palette-2"
              >
                Account Settings
              </Link>
            </li>
            <li onClick={onLogout}>
              <a className="dropdown-item text-lg color-palette-2" href="#">
                Log Out
              </a>
            </li>
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li className="nav-item my-auto">
      <Link
        href="/sign-in"
        className="btn btn-sign-in d-flex justify-content-center ms-lg-2 rounded-pill"
        role="button"
      >
        Sign In
      </Link>
    </li>
  );
}
