import React from "react";
import { LogDayInputs } from "./LogDayInputs";

export type LogDay = { weight: number; repetition: number };

type LogDaysProps = {
  logDays: LogDay[];
  onChangeRepetitions: (idx: number) => (newRepetition: number) => void;
  onChangeWeight: (idx: number) => (newWeight: number) => void;
};

export const LogDays = ({
  logDays,
  onChangeRepetitions,
  onChangeWeight,
}: LogDaysProps) => {
  return (
    <div className="flex gap-3">
      {logDays.map((cur, idx) => (
        <LogDayInputs
          key={idx}
          weight={cur.weight}
          repetitions={cur.repetition}
          onChangeRepetitions={onChangeRepetitions(idx)}
          onChangeWeight={onChangeWeight(idx)}
        />
      ))}
    </div>
  );
};
