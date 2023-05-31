import React from "react";
interface ListFooterProps {
  name: string;
}

export default function List(Props: ListFooterProps) {
  const { name } = Props;
  return (
    <li className="mb-6">
      <a href="" className="text-lg color-palette-1 text-decoration-none">
        {name}
      </a>
    </li>
  );
}
