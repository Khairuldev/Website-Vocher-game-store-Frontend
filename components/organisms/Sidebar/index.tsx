import Image from "next/image";
import React from "react";
import FooterSidebar from "./FooterSidebar";
import MenuItem from "./MenuItem";
import Profile from "./Profile";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

interface SidebarProps {
  activeMenu: "overview" | "transactions" | "settings";
}

export default function Sidebar(Props: SidebarProps) {
  const { activeMenu } = Props;
  const router = useRouter();

  // memghapus fungsi token yang tersimpan dicookies agar tidak bisa masuk ke suatu halaman sebelum login
  const onLogOut = () => {
    Cookies.remove("token");
    router.push("/sign-in");
  };

  return (
    <>
      <section className="sidebar">
        <div className="content pt-50 pb-30 ps-30">
          <Profile />
          <div className="menus">
            <MenuItem
              title="Overview"
              icon="icon_menu_overview"
              isActive={activeMenu === "overview"}
              href="/member"
            />
            <MenuItem
              title="Transcation"
              icon="icon_menu_transcation"
              href="/member/transactions"
              isActive={activeMenu === "transactions"}
            />
            <MenuItem
              title="Messages"
              icon="icon_menu_message"
              href="/member"
            />
            <MenuItem title="Card" icon="icon_menu_card" href="/member" />
            <MenuItem title="Rewards" icon="icon_menu_reward" href="/member" />
            <MenuItem
              title="Settings"
              icon="icon_menu_setting"
              href="/member/edit-profile"
              isActive={activeMenu === "settings"}
            />
            <MenuItem
              title="Log Out"
              icon="icon_menu_logout"
              onClick={onLogOut}
            />
          </div>
          <FooterSidebar />
        </div>
      </section>
    </>
  );
}
