import { LinkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Work() {
  return (
    <div className="my-4 space-y-4">
      <h1 className="text-center font-changa text-6xl font-bold text-secondary1">
        Projects
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 grid-flow-row gap-5 px-5">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div
            key={item}
            className="bg-gradient-to-t relative from-secondary3 to-secondary2 p-5 rounded-xl shadow-2xl space-y-3 hover:scale-105 transition-all duration-300"
          >
            <img
              src="https://images.unsplash.com/photo-1670349148055-e11a0b3be242?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              alt="Project 1"
              className="rounded-xl"
            />

            {/* <div className="absolute top-0 left-0 bg-gradient-to-t opacity-30 h-full from-secondary3 to-secondary2 z-50 w-full rounded-xl "></div> */}
            <p className="text-secondary1 font-changa">Project Name</p>
            <p className="text-secondary1 font-changa">
              Project Description in 2 lines
            </p>
            <Link
              href="#"
              className="flex items-center text-secondary1 font-changa"
            >
              <LinkIcon className="h-4 mr-1" /> Link
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
