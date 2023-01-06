import { CommandLineIcon } from "@heroicons/react/24/outline";
import Circle from "./Circle";
export default function Hero() {
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 p-8 place-content-center gap-4 relative">
      <div className="flex justify-center items-center">
        <div>
          <p className="text-secondary1 font-bold text-6xl font-changa">Hi</p>
          <p className="text-secondary1 font-bold text-6xl font-changa">
            Full Stack Developer
          </p>
        </div>
      </div>
      <div>
        <CommandLineIcon className="text-secondary3 w-10/12 hover:text-secondary2 transition-all duration-300" />
        <div className="absolute top-0 left-0 -z-10">
          <Circle />
        </div>
      </div>
    </div>
  );
}
