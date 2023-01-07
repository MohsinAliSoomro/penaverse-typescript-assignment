import { CommandLineIcon } from "@heroicons/react/24/outline";
import Circle from "./Circle";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 p-8 place-content-center gap-4 relative">
      <div className="flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          whileHover={{
            scale: 1.1,
          }}
        >
          <p className="text-secondary1 font-bold text-6xl font-changa">Hi</p>
          <p className="text-secondary1 font-bold text-6xl font-changa">
            Full Stack Developer
          </p>
        </motion.div>
      </div>
      <div>
        <svg
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-full md:w-10/12 text-secondary3"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
          />
        </svg>

        {/* <CommandLineIcon className="text-secondary3 w-10/12 hover:text-secondary2 transition-all duration-300" /> */}
        <div className="absolute top-0 left-0 -z-10">
          <Circle />
        </div>
      </div>
    </div>
  );
}
