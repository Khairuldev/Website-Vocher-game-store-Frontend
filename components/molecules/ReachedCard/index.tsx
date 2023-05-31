import React from "react";
interface PersentaseCardProps {
  title: string;
  category: string;
}

export default function Reachead(props: PersentaseCardProps) {
  const { title, category } = props;
  return (
    <div className="me-lg-35 ms-lg-35">
      <p className="text-4xl text-lg-start text-center color-palette-1 fw-bold m-0">
        {title}
      </p>
      <p className="text-lg text-lg-start text-center color-palette-2 m-0">
        {category}
      </p>
    </div>
  );
}
