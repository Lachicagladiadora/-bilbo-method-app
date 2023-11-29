import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/Input";
import { LogDayInputs } from "@/components/LogDayInputs";
import { useState } from "react";
import { LogDay, LogDays } from "@/components/LogDays";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const [weight,setWeight] = useState(0)
  const [repetitions,setRepetitions] = useState(0)
  const [logDays, setLogDays] = useState<LogDay[]>([{repetition:0,weight:0}])

  const onChangeRepetitionsByIdx = (idx:number)=>(newValue:number)=>setLogDays(prev=>prev.map((c,i)=>i===idx?({...c,repetition:newValue}):c))

  const onChangeWeightByIdx = (idx:number)=>(newValue:number)=>setLogDays(prev=>prev.map((c,i)=>i===idx?({...c,weight:newValue}):c))

  const onAddNewLogDay = ()=>setLogDays(prev=>([...prev,{repetition:0,weight:0}]))

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      hello
      <Input />

      <LogDays  logDays={logDays} onChangeRepetitions={onChangeRepetitionsByIdx} onChangeWeight={onChangeWeightByIdx} />
      <Button onClick={onAddNewLogDay}>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </main>
  );
}
