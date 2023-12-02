import React, { useState } from "react";
import { LogDayInputs } from "./LogDayInputs";
import {
  faAngleRight,
  faGear,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type LogDay = { weight: number; repetition: number };

type CicleProps = {
  title: string;
  logDays: LogDay[];
  changeRepetitionByIdx: (dayIdx: number) => (newValue: number) => void;
  changeWeightByIdx: (dayIdx: number) => (newValue: number) => void;
  addNewCycle: () => void;
};

export const Cicle = ({
  title,
  changeRepetitionByIdx,
  changeWeightByIdx,
  addNewCycle,
  logDays,
}: CicleProps) => {
  const [expand, setExpand] = useState(false);

  return (
    <div className="flex gap-2 border border-black w-full">
      <div className="flex flex-col items-center gap-2 font-bold p-4 bg-neutral-100  border-[5px] border-violet-500">
        <span className="h-16" style={{ writingMode: "vertical-rl" }}>
          {title}
        </span>
        <div className="flex flex-col items-center gap-1 w-6">
          <Button onClick={addNewCycle}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faGear} />
          </Button>
          <Button onClick={() => setExpand((prev) => !prev)}>
            <FontAwesomeIcon
              icon={faAngleRight}
              className={`${
                expand
                  ? "rotate-180 transition-[1s]"
                  : "rotate-0 transition-[1s]"
              }`}
            />
          </Button>
        </div>
      </div>
      {expand && (
        <>
          <div className="flex flex-col gap-2 font-bold p-4 justify-center">
            <span className="h-8">Weigth:</span>
            <span className="h-8">Repetitions:</span>
            <span className="h-8">RM:</span>
          </div>
          <div className="flex gap-3 overflow-x-auto p-4">
            {logDays.map((cur, idx, src) => (
              <LogDayInputs
                key={idx}
                weight={cur.weight}
                repetitions={cur.repetition}
                onChangeRepetitions={changeRepetitionByIdx(idx)}
                onChangeWeight={changeWeightByIdx(idx)}
                wrapperProps={{ style: { minWidth: "80px" } }}
                title={`Day ${src.length - idx}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
