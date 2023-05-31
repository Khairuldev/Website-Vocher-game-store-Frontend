import Button from "components/atoms/Button";
import Input from "components/atoms/Input";
import SignUpForm from "components/organisms/SignUpForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUp() {
  return (
    <section className="sign-up mx-auto pt-lg-100 pb-lg-100 pt-30 pb-47">
      <div className="container mx-auto">
        <form action="">
          <div className="pb-50">
            <Link href={"/"} className="navbar-brand">
              <Image src={"/icon/logo.svg"} width={60} height={60} alt="" />
            </Link>
          </div>
          <SignUpForm />
        </form>
      </div>
    </section>
  );
}
