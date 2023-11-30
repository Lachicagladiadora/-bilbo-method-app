import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { LogDay, Cicle } from "@/components/Cicle";

const inter = Inter({ subsets: ["latin"] });

type CicleData = {
  logs: LogDay[];
};

export default function Home() {
  const [cicles, setCicles] = useState<CicleData[]>([
    { logs: [{ repetition: 0, weight: 0 }] },
  ]);

  const onAddNewCicle = () =>
    setCicles((prev) => [{ logs: [{ repetition: 0, weight: 0 }] }, ...prev]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="flex ">
        <Button onClick={onAddNewCicle}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <div className="flex max-w-4xl overflow-x-auto">
          {cicles.map((cur, idx, src) => (
            <div
              key={idx}
              className="min-w-[400px] border-[5px] border-orange-500"
            >
              <Cicle title={`Cicle ${src.length - idx}`} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
