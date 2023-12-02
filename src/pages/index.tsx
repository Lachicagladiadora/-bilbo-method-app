import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LogDay, Cicle } from "@/components/Cicle";

const inter = Inter({ subsets: ["latin"] });

type CycleData = {
  logs: LogDay[];
};

const NEW_DAY_LOG: LogDay = { repetition: 0, weight: 0 };

export default function Home() {
  const [cycles, setCycles] = useState<CycleData[]>([
    { logs: [{ repetition: 0, weight: 0 }] },
  ]);
  const [expandedCycleIndex, setExpandedCycleIndex] = useState(-1);

  const onAddNewCycle = () =>
    setCycles((prev) => [{ logs: [{ repetition: 0, weight: 0 }] }, ...prev]);

  const onAddNewDayLogByIdx = (cycleIdx: number) => () =>
    setCycles((prev) =>
      prev.map((c, i) =>
        i === cycleIdx ? { logs: [NEW_DAY_LOG, ...c.logs] } : c
      )
    );

  const onChangeReputationFromCycleByIdx =
    (cycleIdx: number) => (dayIdx: number) => (newRepetition: number) => {
      setCycles((prev) =>
        prev.map((cur, idx) =>
          idx === cycleIdx
            ? { logs: changeRepetitionByIdx(dayIdx, cur.logs, newRepetition) }
            : cur
        )
      );
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
    };

  const onToggleExpandCycle = (cicleIdx: number) => () => {
    if (expandedCycleIndex === -1) {
      setExpandedCycleIndex(cicleIdx);
    }
    if (expandedCycleIndex === cicleIdx) {
      setExpandedCycleIndex(-1);
    } else {
      setExpandedCycleIndex(cicleIdx);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex ">
        <Button onClick={onAddNewCycle}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <div className="flex max-w-4xl overflow-x-auto">
          {cycles.map((cur, idx, src) => (
            <div
              key={idx}
              className="min-w-[400px] border-[5px] border-orange-500"
            >
              <Cicle
                title={`Cicle ${src.length - idx}`}
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
