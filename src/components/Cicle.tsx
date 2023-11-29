import React, { useState } from "react";
import { LogDayInputs } from "./LogDayInputs";
import { faAngleLeft, faGear, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type LogDay = { weight: number; repetition: number };

type CicleProps = {};

export const Cicle = ({}: CicleProps) => {
  const [weight, setWeight] = useState(0);
  const [repetitions, setRepetitions] = useState(0);
  const [logDays, setLogDays] = useState<LogDay[]>([
    { repetition: 0, weight: 0 },
  ]);

  const onChangeRepetitionsByIdx = (idx: number) => (newValue: number) =>
    setLogDays((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, repetition: newValue } : c))
    );

  const onChangeWeightByIdx = (idx: number) => (newValue: number) =>
    setLogDays((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, weight: newValue } : c))
    );

  const onAddNewLogDay = () =>
    setLogDays((prev) => [{ repetition: 0, weight: 0 }, ...prev]);

  return (
    <div className="flex gap-2 border border-black w-full">
      <div
        className="flex items-center justify-between font-bold p-4 bg-neutral-100"
        style={{ writingMode: "vertical-rl" }}
      >
        <span>Cicle</span>
        <div className="flex gap-1">
          <Button onClick={onAddNewLogDay}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <FontAwesomeIcon icon={faGear} />
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      </div>
      <div className="flex flex-col gap-2 font-bold p-4 justify-center">
        <span className="h-8">Weigth:</span>
        <span className="h-8">Repetitions:</span>
        <span className="h-8">RM:</span>
      </div>
      <div className="flex gap-3 overflow-x-scroll p-4">
        {logDays.map((cur, idx) => (
          <LogDayInputs
            key={idx}
            weight={cur.weight}
            repetitions={cur.repetition}
            onChangeRepetitions={onChangeRepetitionsByIdx(idx)}
            onChangeWeight={onChangeWeightByIdx(idx)}
            wrapperProps={{ style: { minWidth: "80px" } }}
          />
        ))}
      </div>
    </div>
  );
};
