import React from "react";
import { Input } from "./Input";

type LogDayInputsProps = {
  onChangeWeight: (newWeight: number) => void;
  onChangeRepetitions: () => void;
  onChangeRM: () => void;
};

export const LogDayInputs = ({
  onChangeWeight,
  onChangeRepetitions,
  onChangeRM,
}: LogDayInputsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Input onChange={(e) => onChangeWeight(Number(e.target.value))} />
      {/* <Input onChange={onChangeRepetitions}/> */}
      {/* <Input onChange={onChangeRM}/> */}
    </div>
  );
};
