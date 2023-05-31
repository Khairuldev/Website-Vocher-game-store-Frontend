/* eslint-disable @next/next/no-img-element */
import TransactionDetailContent from "components/organisms/TransactionDetailContent";
import jwtDecode from "jwt-decode";
import React from "react";
import {
  HistoryTransactionTypes,
  JWTPayloadTypes,
  userTypes,
} from "services/data-types";
import { getTransactionDetail } from "services/member";

interface TransactionDetailProps {
  transactionDetail: HistoryTransactionTypes;
}

export default function Detail_transcations(props: TransactionDetailProps) {
  const { transactionDetail } = props;
  // console.log("transaction detail :", transactionDetail);
  return (
    <section className="transactions-detail overflow-auto">
      <TransactionDetailContent data={transactionDetail} />
    </section>
  );
}

interface GetServerSideProps {
  req: {
    cookies: {
      token: string;
    };
  };
  params: {
    idTrx: string;
  };
}

export async function getServerSideProps({ req, params }: GetServerSideProps) {
  console.log("params :", params);
  const { idTrx } = params;
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
  const response = await getTransactionDetail(idTrx, jwtToken);
  // console.log("response :", response);
  return {
    props: {
      transactionDetail: response.data,
    },
  };
}
