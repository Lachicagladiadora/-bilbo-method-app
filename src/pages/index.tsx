import Image from "next/image";
import { Inter } from "next/font/google";
import { Button } from "@/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input } from "@/components/Input";
import { LogDayInputs } from "@/components/LogDayInputs";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      hello
      <Button>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
      <Input />
      <LogDayInputs />
    </main>
  );
}
