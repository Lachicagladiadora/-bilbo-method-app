import React, { HTMLAttributes } from "react";
import { Input } from "./Input";

type LogDayInputsProps = {
  weight: number;
  repetitions: number;
  onChangeWeight: (newWeight: number) => void;
  onChangeRepetitions: (newRepetitions: number) => void;
  wrapperProps: HTMLAttributes<HTMLDivElement>;
};

export const LogDayInputs = ({
  weight,
  repetitions,
  onChangeWeight,
  onChangeRepetitions,
  wrapperProps,
}: LogDayInputsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full" {...wrapperProps}>
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
