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

type CycleProps = {
  title: string;
  logDays: LogDay[];
  changeRepetitionByIdx: (dayIdx: number) => (newValue: number) => void;
  changeWeightByIdx: (dayIdx: number) => (newValue: number) => void;
  addNewCycle: () => void;
  onToggleExpand: () => void;
  expand: boolean;
};

export const Cycle = ({
  title,
  changeRepetitionByIdx,
  changeWeightByIdx,
  addNewCycle,
  logDays,
  onToggleExpand,
  expand,
}: CycleProps) => {
  return (
    <div className=" flex gap-2 w-full bg-slate-200">
      <div
        className={`flex flex-col items-center justify-between  font-bold p-4 bg-neutral-100 text-neutral-100 ${
          expand ? "bg-neutral-700" : "bg-neutral-500"
        } hover:bg-black cursor-pointer`}
        onClick={onToggleExpand}
      >
        <span className="h-16" style={{ writingMode: "vertical-rl" }}>
          {title}
        </span>
        <FontAwesomeIcon
          icon={faAngleRight}
          className={`${
            expand ? "rotate-180 transition-[1s]" : "rotate-0 transition-[1s]"
          }`}
        />
      </div>
      {expand && (
        <>
          <div className="flex flex-col gap-2 font-bold p-4 justify-center relative">
            <div className="absolute top-0 left-0">
              <Button onClick={addNewCycle}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
              <Button>
                <FontAwesomeIcon icon={faGear} />
              </Button>
            </div>
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
