import OverViewContent from "components/organisms/OverViewContent";
import Sidebar from "components/organisms/Sidebar";
import jwtDecode from "jwt-decode";
import React from "react";
import { JWTPayloadTypes, userTypes } from "services/data-types";

export default function Member() {
  return (
    <section className="overview overflow-auto">
      <Sidebar activeMenu="overview" />
      <OverViewContent />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
}

export async function getServerSideProps({ req }: GetServerSideProps) {
  const { token } = req.cookies;
  if (!token) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const jwtToken = Buffer.from(token, "base64").toString("ascii");
  const payload: JWTPayloadTypes = jwtDecode(jwtToken);
  console.log("payload :", payload);
  const userFromPayload: userTypes = payload.player;
  const IMG = process.env.NEXT_PUBLIC_IMG;
  userFromPayload.avatar = `${IMG}/${userFromPayload.avatar}`;

  return {
    props: {
      user: userFromPayload,
    },
  };
}
