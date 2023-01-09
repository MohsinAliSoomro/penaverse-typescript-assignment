import { motion } from "framer-motion";

export default function Circle() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="w-[1000px] flex items-center justify-center h-[1000px] rounded-full shadow-xl bg-secondary2/50 opacity-80 z-0"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          delay: 0.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-0 left-0 w-[800px] h-[800px rounded-full shadow-xl bg-secondary2/50 opacity-50 z-10"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          delay: 1,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] flex justify-center items-center rounded-full shadow-xl bg-secondary2/50 opacity-50 z-20"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 3,
          delay: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full shadow-xl bg-secondary2/50 opacity-50 z-30"
      ></motion.div>
    </div>
  );
}
