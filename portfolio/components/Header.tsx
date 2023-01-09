import Link from "next/link";

export default function Header() {
  return (
    <nav className="p-3 bg-gradient-to-r from-secondary2/50 to-secondary3/25 shadow-2xl">
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="text-secondary1 font-bold font-changa text-xl"
        >
          Mohsin Ali
        </Link>
        <div>
          <Link
            href="/contact"
            className="bg-secondary3 text-secondary1 px-4 py-2 rounded shadow-2xl font-changa flex items-center"
          >
            <span className="mr-2">Hire me</span>{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}
