import React from "react";
import { Input } from "./Input";

type LogDayInputsProps = {
  weight:number,
  repetitions:number,
  onChangeWeight: (newWeight: number) => void;
  onChangeRepetitions: (newRepetitions:number) => void;
};

export const LogDayInputs = ({
  weight,
  repetitions,
  onChangeWeight,
  onChangeRepetitions,
}: LogDayInputsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <Input type="number" value={weight} onChange={(e) => onChangeWeight(Number(e.target.value))} />
      <Input type="number" value={repetitions} onChange={e=>onChangeRepetitions(Number(e.target.value))}/>
      <Input disabled/>
    </div>
  );
};
