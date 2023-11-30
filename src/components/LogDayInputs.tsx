import React, { HTMLAttributes } from "react";
import { Input } from "./Input";

type LogDayInputsProps = {
  weight: number;
  repetitions: number;
  onChangeWeight: (newWeight: number) => void;
  onChangeRepetitions: (newRepetitions: number) => void;
  wrapperProps: HTMLAttributes<HTMLDivElement>;
  title: string;
};

export const LogDayInputs = ({
  weight,
  repetitions,
  onChangeWeight,
  onChangeRepetitions,
  wrapperProps,
  title,
}: LogDayInputsProps) => {
  return (
    <div
      className="flex flex-col justify-center gap-2 w-full"
      {...wrapperProps}
    >
      <h3 className="font-bold opacity-50">{title}</h3>
      <Input
        type="number"
        value={weight}
        onChange={(e) => onChangeWeight(Number(e.target.value))}
      />
      <Input
        type="number"
        value={repetitions}
        onChange={(e) => onChangeRepetitions(Number(e.target.value))}
      />
      <Input disabled value={weight * repetitions * 0.03 + weight} />
    </div>
  );
};
