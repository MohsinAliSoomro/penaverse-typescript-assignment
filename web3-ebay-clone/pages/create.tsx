import {
  useAddress,
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  useNetwork,
  useNetworkMismatch,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import Header from "../components/Headers";
import Image from "next/image";
import React, { useState } from "react";
import { network } from "../utils/network";
import { NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
export default function Create() {
  const address = useAddress();
  const [selectNft, setSelectedNft] = useState<{
    metadata: {
      id: string;
    };
  }>(Object);

  const { contract: marketplace } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );
  const { contract: collections } = useContract(
    process.env.NEXT_PUBLIC_NFT_COLLECTIONS,
    "nft-collection"
  );
  const { isLoading, data } = useOwnedNFTs(collections, address);
  const networkMismatch = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const {
    mutate: createDirectListing,
    isLoading: isDirectLoading,
    isError: isDirectListingError,
    error: directError,
  } = useCreateDirectListing(marketplace);

  const {
    mutate: createAuctionListing,
    isLoading: isAuctionLoading,
    isError: isAuctionListingError,
    error: actionError,
  } = useCreateAuctionListing(marketplace);

  const handleMinting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (networkMismatch) {
      switchNetwork && switchNetwork(network);
      return;
    }
    if (!selectNft) return;
    //create type
    const target = e.target as typeof e.target & {
      elements: { listing: { value: string }; price: { value: string } };
    };
    const { listing, price } = target.elements;

    console.log({ listing: listing.value, price: price.value, selectNft });

    if (listing.value === "directListing") {
      if (process.env.NEXT_PUBLIC_NFT_COLLECTIONS) {
        createDirectListing(
          {
            assetContractAddress: process.env.NEXT_PUBLIC_NFT_COLLECTIONS,
            tokenId: selectNft.metadata.id,
            currencyContractAddress: NATIVE_TOKEN_ADDRESS,
            listingDurationInSeconds: 60 * 60 * 27 * 7,
            quantity: 1,
            buyoutPricePerToken: parseInt(price.value),
            startTimestamp: new Date(),
          },
          {
            onSuccess(error, variables, context) {
              console.log("ONSUCCESS", { error, variables, context });
            },
            onError(error, variables, context) {
              console.log("ONERROR", { error, variables, context });
            },
          }
        );
      }
    }
    if (listing.value === "auctionListing") {
      if (process.env.NEXT_PUBLIC_NFT_COLLECTIONS)
        createAuctionListing(
          {
            assetContractAddress: process.env.NEXT_PUBLIC_NFT_COLLECTIONS,
            tokenId: selectNft.metadata.id,
            currencyContractAddress: NATIVE_TOKEN_ADDRESS,
            listingDurationInSeconds: 60 * 60 * 27 * 7,
            buyoutPricePerToken: parseInt(price.value),
            startTimestamp: new Date(),
            quantity: 1,
            reservePricePerToken: 0,
          },
          {
            onSuccess(error, variables, context) {
              console.log("ONSUCCESS", { error, variables, context });
            },
            onError(error, variables, context) {
              console.log("ONERROR", { error, variables, context });
            },
          }
        );
    }
  };
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto mt-2 border p-5">
        <h1 className="text-xl font-bold">List an Items</h1>
        <p className="text-lg">Select an items you would like to sell</p>
        <hr />
        <p>Bellow you will find the NFT's you own in your wallet</p>
        {isLoading ? (
          <div className="animate-bounce text-blue-500 text-center">
            Loading...!
          </div>
        ) : (
          <div className="grid grid-flow-row grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto p-2 md:p-0">
            {data?.map((item) => (
              <div
                key={item.metadata.id}
                onClick={() => setSelectedNft(item)}
                className={`border p-2 shadow rounded-2xl w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white hover:scale-105 transition-all duration-150 ease-out ${
                  item.metadata.id === selectNft?.metadata?.id
                    ? "border-2 border-black"
                    : ""
                }`}
              >
                {item.metadata.image && (
                  <Image
                    className="w-full h-48 object-cover rounded-2xl"
                    src={item.metadata.image}
                    alt={item.metadata.image}
                    width={500}
                    height={500}
                  />
                )}
                <p className="my-2">{item.metadata.name}</p>
                <hr />
                <p className="text-xs">{item.metadata.description}</p>
              </div>
            ))}
          </div>
        )}
        {"metadata" in selectNft && (
          <form onSubmit={handleMinting}>
            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between border-b ">
                <label>Direct listing / Fixed Price</label>
                <input
                  className="w-5 h-5"
                  type="radio"
                  name="listing"
                  value={"directListing"}
                />
              </div>
              <div className="flex items-center justify-between border-b ">
                <label>Auction</label>
                <input
                  className="w-5 h-5"
                  type="radio"
                  name="listing"
                  value={"auctionListing"}
                />
              </div>
              <div className="flex justify-between">
                <p>Price (GOR)</p>
                <input
                  className="bg-gray-200 p-2 outline-none "
                  type="text"
                  placeholder="0.00"
                  id="price"
                  name="price"
                />
              </div>
              <button
                type="submit"
                className="flex flex-end ml-auto bg-gradient-to-r from-blue-500 to-rose-500 p-4 rounded-full mt-2 text-white"
              >
                Create Listing
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}
