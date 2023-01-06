import Link from "next/link";

export default function Header() {
  return (
    <nav className="p-6 bg-gradient-to-r from-secondary2/50 to-secondary3/25  shadow-2xl">
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
            className="bg-secondary3 text-secondary1 px-4 py-2 rounded shadow-2xl font-changa"
          >
            Hire me
          </Link>
        </div>
      </div>
    </nav>
  );
}
