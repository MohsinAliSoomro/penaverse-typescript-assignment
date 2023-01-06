export default function Circle() {
  return (
    <div className="relative">
      <div className="w-[1000px] flex items-center justify-center h-[1000px] rounded-full shadow-xl bg-secondary2/50 opacity-80 z-0"></div>
      <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full shadow-xl bg-secondary2/50 opacity-50 z-10"></div>
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full shadow-xl bg-secondary2/50 opacity-50 z-20"></div>
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full shadow-xl bg-secondary2/50 opacity-50 z-30"></div>
    </div>
  );
}
