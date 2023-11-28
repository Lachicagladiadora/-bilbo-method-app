import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className="bg-neutral-50 rounded-full px-2 py-1 text-black hover:bg-neutral-200"
    >
      {props.children}
    </button>
  );
};
