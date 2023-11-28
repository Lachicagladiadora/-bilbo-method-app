import React from "react";

type InputProps = {} & React.ComponentPropsWithoutRef<"input">;

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="bg-neutral-200 outline-none px-2 py-1 w-full"
    />
  );
};
