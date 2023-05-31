import Image from "next/image";
import React from "react";
import cx from "classnames";
import Link from "next/link";

interface MenuItemProps {
  onClick?: () => void;
  isActive?: boolean;
  title: string;
  href: string;
  icon:
    | "icon_menu_overview"
    | "icon_menu_transcation"
    | "icon_menu_message"
    | "icon_menu_card"
    | "icon_menu_reward"
    | "icon_menu_setting"
    | "icon_menu_logout";
}

export default function MenuItem(props: Partial<MenuItemProps>) {
  const { isActive, title, icon, href = "", onClick } = props;
  const classItem = cx({
    item: true,
    "mb-30": true,
    active: isActive,
  });

  return (
    <div className={classItem} onClick={onClick}>
      <div className="me-3">
        <Image src={`/icon/${icon}.svg`} width={25} height={25} alt="" />
      </div>
      <p className="item-title m-0">
        {onClick ? (
          <a className="text-lg text-decoration-none">{title}</a>
        ) : (
          <Link className="text-lg text-decoration-none" href={href}>
            {title}
          </Link>
        )}
      </p>
    </div>
  );
}
