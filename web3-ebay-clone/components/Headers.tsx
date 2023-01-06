import { useDisconnect, useMetamask, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
import {
  BellIcon,
  ShoppingCartIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
const links = [
  "Home",
  "Electronics",
  "Computer",
  "Video Game",
  "Home & Garden",
  "Health & Beauty",
  "Collectible and art",
  "Books",
  "Music",
  "Deals",
  "Others",
];
export default function Header() {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useMetamask();
  return (
    <div className="max-w-6xl mx-auto p-2 shadow-lg w-full">
      <nav className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {address ? (
            <button className="connectWalletBtn" onClick={disconnect}>
              Hi, {address.slice(0, 5)}...{address.slice(-4)}
            </button>
          ) : (
            <button className="connectWalletBtn" onClick={connect}>
              Connect Wallet
            </button>
          )}
          <p className="hidden md:block">Dealy Deals</p>
          <p className="hidden md:block">help & Connect</p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="hidden md:block">Ship to</p>
          <p className="hidden md:block">Sell</p>
          <p className="hidden md:block">Wishlist</p>
          <Link href="/addItem" className="flex items-center hover:text-orange-800/50">
            Add to Inventory
            <ChevronDownIcon className="w-4 h-4 mr-2" />
          </Link>
          <BellIcon className="h-4 hover:link" />
          <ShoppingCartIcon className="h-4 hover:link" />
        </div>
      </nav>
      <section className="py-2 flex items-center space-x-2">
        <Link href="/">
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24">
            <Image
              src="/ebay.png"
              className=" w-full"
              alt="ebay"
              width={100}
              height={100}
            />
          </div>
        </Link>

        <button className="hidden md:flex items-center w-20 space-x-2 text-xs sm:text-base">
          Shop By Category <ChevronDownIcon className="h-4" />
        </button>
        <div className="flex flex-1 rounded space-x-2 items-center px-2 md:px-4 py-2 bg-white text-black">
          <MagnifyingGlassIcon className="h-6 text-orange-500" />
          <input
            type={"text"}
            className="flex-1 outline-none"
            placeholder="Search anything"
          />
        </div>
        <button className="hidden md:flex bg-blue-500 p-2 connectWalletBtn">Search</button>
        <Link href="/create" className="shadow-lg p-2 bg-gradient-to-r from-orange-500/50 to-rose-600/50 rounded hover:bg-blue-500/50">
          List Item
        </Link>
      </section>

      <hr />
      <section className="flex space-x-4 justify-center mt-2 cursor-pointer text-xs whitespace-nowrap flex-wrap">
        {links.map((item) => (
          <p className="py-2" key={item}>{item}</p>
        ))}
      </section>
    </div>
  );
}
