import { InformationCircleIcon } from "@heroicons/react/24/outline";

export default function About({ data }: any) {
  console.log({ data });
  return (
    <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <div className="flex justify-center items-center">
        <div className="shadow-2xl w-48 h-48 md:w-96 md:h-96 bg-secondary3 hover:bg-secondary2 transition-all duration-300 rounded-full p-8 animate-spin-slow">
          <InformationCircleIcon className="text-secondary1/60" />
        </div>
      </div>
      <div className="space-y-5 p-4">
        <h1 className="font-changa text-6xl font-bold text-secondary1">
          {data?.fields?.about?.title}
        </h1>
        <p className="text-4xl font-changa text-secondary1">
          {data?.fields?.about?.professional?.split(" ")[0]}{" "}
          <span className="text-4xl font-changa text-secondary3">
            {data?.fields?.about?.professional?.split(" ")[1]}
          </span>
        </p>
        <p className="leading-8 text-secondary2 font-changa text-lg">
          {data?.fields?.about?.description}
        </p>
      </div>
    </div>
  );
}
