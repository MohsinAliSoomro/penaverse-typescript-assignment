import { useActiveListings, useContract } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import Header from "../components/Headers";
import Image from "next/image";
import { ListingType } from "@thirdweb-dev/sdk";
import { BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Home: NextPage = () => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  const { data, isLoading, isError } = useActiveListings(contract);
  console.log({ data, isLoading, isError });
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto mt-2">
        {isLoading ? (
          <div className="animate-bounce text-blue-500 text-center">
            Loading...!
          </div>
        ) : (
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-2 md:p-0">
            {data?.map((item) => (
              <Link href={`/nft/${item.id}`} key={item.id}>
                <div className="border p-2 shadow rounded-2xl w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:scale-105 transition-all duration-150 ease-out">
                  {item.asset.image && (
                    <Image
                      className="w-full h-48 object-cover rounded-2xl"
                      src={item.asset.image}
                      alt={item.asset.image}
                      width={500}
                      height={500}
                    />
                  )}
                  <p className="my-2">{item.asset.name}</p>
                  <hr />
                  <p className="text-xs">{item.asset.description}</p>

                  <p>
                    {item.buyoutCurrencyValuePerToken.displayValue}{" "}
                    {item.buyoutCurrencyValuePerToken.symbol}
                  </p>
                  <div className="flex justify-end items-center ml-auto w-fit p-2 border rounded-lg">
                    <p className="whitespace-nowrap mr-2 ">
                      {item.type === ListingType.Auction
                        ? "Auction"
                        : "Buy Now"}
                    </p>
                    {item.type === ListingType.Auction ? (
                      <ClockIcon className="h-4" />
                    ) : (
                      <BanknotesIcon className="h-4" />
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
