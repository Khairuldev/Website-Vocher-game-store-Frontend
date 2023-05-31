/* eslint-disable @next/next/no-img-element */
import Badge from "components/atoms/Badge";
import Sidebar from "components/organisms/Sidebar";
import TransactionsContent from "components/organisms/TransactionContent";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { JWTPayloadTypes, userTypes } from "services/data-types";

interface TranscationProps {
  activeBadge: "All Trx" | "Succsess" | "Pending" | "Failed";
}

export default function Index(Props: TranscationProps) {
  const { activeBadge } = Props;

  return (
    <section className="transactions overflow-auto">
      <Sidebar activeMenu="transactions" />
      <TransactionsContent />
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
