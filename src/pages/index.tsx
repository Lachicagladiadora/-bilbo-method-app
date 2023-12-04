import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { LogDay, Cycle } from "@/components/Cycle";
import { json } from "stream/consumers";

const inter = Inter({ subsets: ["latin"] });

const CYCLES_KEY = "cycles";

type CycleData = {
  logs: LogDay[];
};

const NEW_DAY_LOG: LogDay = { repetition: 0, weight: 0 };
const NEW_CYCLE: CycleData = { logs: [{ repetition: 0, weight: 0 }] };

export default function Home() {
  const [cycles, setCycles] = useState<CycleData[]>([NEW_CYCLE]);
  const [expandedCycleIndex, setExpandedCycleIndex] = useState(0);

  useEffect(() => {
    console.log(window);

    const cycleStorage = window.localStorage.getItem(CYCLES_KEY);

    const getItemLocalStorage = () => {
      return cycleStorage ? JSON.parse(cycleStorage) : [NEW_CYCLE];
    };

    setCycles(getItemLocalStorage());
  }, []);

  const onAddNewCycle = () => {
    setCycles((prev) => [{ logs: [{ repetition: 0, weight: 0 }] }, ...prev]);
    setExpandedCycleIndex(0);
    localStorage.setItem(CYCLES_KEY, JSON.stringify(cycles));
  };

  const onAddNewDayLogByIdx = (cycleIdx: number) => () => {
    setCycles((prev) =>
      prev.map((c, i) =>
        i === cycleIdx ? { logs: [NEW_DAY_LOG, ...c.logs] } : c
      )
    );
    localStorage.setItem(CYCLES_KEY, JSON.stringify(cycles));
  };

  const onChangeReputationFromCycleByIdx =
    (cycleIdx: number) => (dayIdx: number) => (newRepetition: number) => {
      setCycles((prev) =>
        prev.map((cur, idx) =>
          idx === cycleIdx
            ? { logs: changeRepetitionByIdx(dayIdx, cur.logs, newRepetition) }
            : cur
        )
      );
      localStorage.setItem(CYCLES_KEY, JSON.stringify(cycles));
    };

  const onChangeWeightFromCycleByIdx =
    (cycleIdx: number) => (dayIdx: number) => (newWeight: number) => {
      setCycles((prev) =>
        prev.map((cur, idx) =>
          idx === cycleIdx
            ? { logs: changeWeightByIdx(dayIdx, cur.logs, newWeight) }
            : cur
        )
      );
      localStorage.setItem(CYCLES_KEY, JSON.stringify(cycles));
    };

  const onToggleExpandCycle = (cycleIdx: number) => () => {
    if (expandedCycleIndex < 0) setExpandedCycleIndex(cycleIdx);
    else setExpandedCycleIndex(expandedCycleIndex === cycleIdx ? -1 : cycleIdx);
  };

  return (
    <main className={`p-24 ${inter.className}`}>
      <div className="flex mb-1">
        <Button onClick={onAddNewCycle}>
          <FontAwesomeIcon icon={faPlus} /> Add cycle
        </Button>
      </div>
      <div className="flex max-w-4xl overflow-x-auto">
        {cycles.map((cur, idx, src) => (
          <div
            key={idx}
            className={`${expandedCycleIndex === idx && "min-w-[400px]"}`}
          >
            <Cycle
              title={`Cycle ${src.length - idx}`}
              logDays={cur.logs}
              addNewCycle={onAddNewDayLogByIdx(idx)}
              changeRepetitionByIdx={onChangeReputationFromCycleByIdx(idx)}
              changeWeightByIdx={onChangeWeightFromCycleByIdx(idx)}
              onToggleExpand={onToggleExpandCycle(idx)}
              expand={expandedCycleIndex === idx}
            />
          </div>
        ))}
      </div>
    </main>
  );
}

const changeRepetitionByIdx = (
  idx: number,
  logDays: LogDay[],
  newValue: number
) => logDays.map((c, i) => (i === idx ? { ...c, repetition: newValue } : c));

const changeWeightByIdx = (idx: number, logDays: LogDay[], newValue: number) =>
  logDays.map((c, i) => (i === idx ? { ...c, weight: newValue } : c));
