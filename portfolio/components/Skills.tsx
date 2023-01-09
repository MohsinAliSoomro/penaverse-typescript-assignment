import skills from "../data/skills.json";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
export default function Skills({ data }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  console.log({ inView, data });

  return (
    <div className="my-8 space-y-4" ref={ref}>
      <h1 className="text-center font-changa text-6xl font-bold text-secondary1">
        Skills
      </h1>

      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
        {inView &&
          data?.fields?.skills?.map(
            (skill: { name: string; image: string }, index: number) => {
              return (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: (0.2 * index) % 2 }}
                  key={index}
                  className="w-full h-64 flex justify-center items-center"
                >
                  <div>
                    <motion.img
                      whileHover={{
                        scale: 1.2,
                      }}
                      className={`w-48 h-48 object-contain  ${
                        skill.name === "Reactjs" ? "animate-spin-slow" : ""
                      }`}
                      src={skill.image}
                      alt={skill?.name}
                    />

                    <motion.p
                      whileHover={{
                        scale: 1.2,
                        rotate: [0, 360],
                        borderRadius: "100%",
                      }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="rounded-tr-[70px] rounded-tl-[70px] rounded-md bg-gradient-to-t from-secondary2 py-4 to-secondary1 shadow-2xl text-center font-changa text-2xl font-light text-secondary3/80"
                    >
                      {skill.name}
                    </motion.p>
                  </div>
                </motion.div>
              );
            }
          )}
      </div>
    </div>
  );
}
