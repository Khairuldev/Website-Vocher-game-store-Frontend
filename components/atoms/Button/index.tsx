import Link from "next/link";
import React from "react";

interface ButtonProps {
  to_address: string;
  name: string;
  class_style: string;
  type?: string;
}

export default function Button(props: ButtonProps) {
  const { to_address, name, class_style, type } = props;
  return (
    <>
      <Link className={class_style} href={to_address} role="button" type={type}>
        {name}
      </Link>
    </>
  );
}
