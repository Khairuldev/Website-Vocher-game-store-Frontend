/* eslint-disable @next/next/no-img-element */
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { JWTPayloadTypes, userTypes } from "services/data-types";
import Cookies from "js-cookie";

export default function Profile() {
  const [user, setUser] = useState({
    avatar: "",
    username: "",
    email: "",
  });

  function isImageExist(url: string) {
    var img = new Image();
    img.src = url;
    return img.height != 0;
  }

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const jwtToken = atob(token);
      const payload: JWTPayloadTypes = jwtDecode(jwtToken);
      const userFromPayload: userTypes = payload.player;
      const IMG = process.env.NEXT_PUBLIC_IMG;
      // user.avatar = `${IMG}/${user.avatar}`;
      setUser({
        ...userFromPayload,
        avatar: IMG + `/${userFromPayload.avatar}`,
      });
      if (isImageExist(`${IMG}/${userFromPayload.avatar}`) == false) {
        setUser({
          ...userFromPayload,
          avatar: "/img/avatar-1.png",
        });
      }
    }
  }, []);

  return (
    <div className="user text-center pb-50 pe-30">
      <img
        src={user.avatar}
        alt="profile"
        width="100"
        height="100"
        className="rounded-circle"
      />
      <h2 className="fw-bold text-xl color-palette-1 m-0">{user.username}</h2>
      <p className="color-palette-2 m-0">{user.email}</p>
    </div>
  );
}
