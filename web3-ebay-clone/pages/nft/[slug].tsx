import { UserCircleIcon, UserIcon } from "@heroicons/react/24/outline";
import {
  MediaRenderer,
  useAcceptDirectListingOffer,
  useAddress,
  useBuyNow,
  useContract,
  useListing,
  useMakeBid,
  useMakeOffer,
  useNetwork,
  useNetworkMismatch,
  useOffers,
} from "@thirdweb-dev/react";
import { ListingType, NATIVE_TOKENS } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Headers";
import { network } from "../../utils/network";
import { toastError, toastLoading, toastSuccess } from "../../utils/toast";

export default function Nft() {
  const router = useRouter();
  const [bidAmount, setBidAmount] = useState("");
  const [minimunNextBid, setMinimumNextBid] = useState<{
    displayValue: string;
    symbol: string;
  }>();

  const { slug } = router.query as { slug: string };

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_CONTRACT,
    "marketplace"
  );

  const { data, isLoading, isError, error } = useListing(contract, slug);
  console.log({ data, isLoading, isError, error });

  const placeholderFormat = () => {
    if (!data) return;

    if (data.type === ListingType.Auction) {
      if (minimunNextBid?.displayValue && minimunNextBid.displayValue === "0") {
        return "Enter Offer Amount";
      } else {
        return `${minimunNextBid?.displayValue} ${minimunNextBid?.symbol} or more`;
      }
    }

    if (data.type === ListingType.Direct) {
      return "Enter Offer Amount";
    }
  };

  useEffect(() => {
    if (!data || !contract || !slug) return;

    if (data.type === ListingType.Auction) {
      fetchMinimumNextBid();
    }
  }, [slug, contract, data]);

  const fetchMinimumNextBid = async () => {
    if (!data || !contract || !slug) return;
    const { displayValue, symbol } = await contract.auction.getMinimumNextBid(
      slug
    );
    setMinimumNextBid({
      displayValue,
      symbol,
    });
  };
  const [_, switchNetwork] = useNetwork();
  const networkMissMatch = useNetworkMismatch();
  const { mutate: buyNowNFT } = useBuyNow(contract);
  const { mutate: makeOffer } = useMakeOffer(contract);
  const { data: Offers } = useOffers(contract, slug);
  const { mutate: makeBid } = useMakeBid(contract);
  const { mutate: acceptOffer } = useAcceptDirectListingOffer(contract);
  const address = useAddress();

  const buyNFT = async () => {
    try {
      if (networkMissMatch) {
        switchNetwork && switchNetwork(network);
        return;
      }
      if (!slug || !contract || !data) return;
      toastLoading();
      await buyNowNFT(
        {
          id: slug,
          buyAmount: 1,
          type: data.type,
        },
        {
          onSuccess(data, variable, context) {
            console.log({ data, variable, context });
            toastSuccess("Buy Successfull...!");
            router.push("/");
          },
          onError(data, variable, context) {
            console.log({ data, variable, context });
            toastError();
          },
        }
      );
    } catch (error) {
      toastError();
    }
  };

  const handleBidOrOffer = async () => {
    try {
      if (networkMissMatch) {
        switchNetwork && switchNetwork(network);
        return;
      }
      toastLoading();
      //Direct Listing
      if (data?.type === ListingType.Direct) {
        //todo
        if (
          data.buyoutPrice.toString() ===
          ethers.utils.parseEther(bidAmount).toString()
        ) {
          console.log("Buy NFT ");
          buyNFT();
          return;
        }

        await makeOffer(
          {
            quantity: 1,
            listingId: slug,
            pricePerToken: Number(bidAmount),
          },
          {
            onSuccess(data, variable, context) {
              console.log({ data, variable, context });
              toastSuccess("Offer place successfull...!");
            },
            onError(data, variable, context) {
              console.log({ data, variable, context });
              toastError();
            },
          }
        );
      }
      //Auction Listing
      if (data?.type === ListingType.Auction) {
        //todo
        console.log("Make bid");
        await makeBid(
          {
            listingId: slug,
            bid: bidAmount,
          },
          {
            onSuccess(data, variable, context) {
              console.log({ data, variable, context });
              toastSuccess("Place bid successfull...!");
            },
            onError(data, variable, context) {
              console.log({ data, variable, context });
              toastError();
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
      toastError();
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse w-screen h-screen flex justify-center items-center font-bold text-orange-800">
        Loading...!
      </div>
    );
  }
  if (isError) {
    return <div>{JSON.stringify(error)}</div>;
  }
  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto mt-2">
        <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <div className="p-5 rounded-lg shadow-orange-400/50 shadow-lg">
            <MediaRenderer
              src={data?.asset.image}
              alt={"NFT"}
              className="rounded-lg"
            />
          </div>
          <div className="p-5 rounded-lg shadow-orange-400/50 shadow-lg">
            <h1 className="font-bold text-xl">{data?.asset.name}</h1>
            <hr />
            <p>{data.asset.description}</p>

            <p className="flex items-center">
              <UserCircleIcon className="h-4 w-4 rounded-full mr-1" /> Seller :{" "}
              {data.sellerAddress}
            </p>
            <div className="grid grid-flow-row grid-cols-2 mt-2">
              <div className="space-y-3">
                <p>Listing Type</p>
                <p>
                  {data.type === ListingType.Auction
                    ? "Auction Listing"
                    : "Direct Listing"}
                </p>
              </div>
              <div className="space-y-3">
                <p>Action Listing</p>
                <p className="font-bold text-xl ">
                  {data.buyoutCurrencyValuePerToken.displayValue}{" "}
                  {data.buyoutCurrencyValuePerToken.symbol}
                </p>
                <button
                  onClick={buyNFT}
                  className="connectWalletBtn rounded-full w-32 flex items-center justify-center mx-auto p-2 px-8 text-white"
                >
                  Buy Now
                </button>
              </div>
            </div>
            <hr className="my-2" />
            <div>
              {data.type === ListingType.Auction && Offers && (
                <div>
                  <div className="grid grid-flow-row grid-cols-2">
                    <p className="font-bold">Offers</p>
                    <p>{Offers?.length}</p>
                  </div>
                  {Offers.map((item) => (
                    <div
                      key={item.offeror}
                      className="grid grid-flow-row grid-cols-3 gap-2 "
                    >
                      <p className="flex items-center text-xs italic">
                        <UserCircleIcon className="h-3 mr-2" />{" "}
                        {item.offeror.slice(0, 4) +
                          "..." +
                          item.offeror.slice(-4)}
                      </p>
                      <p className="text-xs italic">
                        {ethers.utils.formatEther(item.totalOfferAmount)}
                        {NATIVE_TOKENS[network].symbol}
                      </p>
                      {data.sellerAddress === address && (
                        <button
                          onClick={() =>
                            acceptOffer(
                              {
                                addressOfOfferor: item.offeror,
                                listingId: slug,
                              },
                              {
                                onSuccess(data, variable, context) {
                                  console.log({ data, variable, context });
                                  alert("Bid make Successfull...!");
                                },
                                onError(data, variable, context) {
                                  console.log({ data, variable, context });
                                  alert("Bid Failed...!");
                                },
                              }
                            )
                          }
                          className="bg-rose-500/20 p-2 rounded"
                        >
                          Accept Offer
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="grid grid-flow-row grid-cols-2 mt-2">
              <div className="space-y-3">
                <p>
                  {data.type === ListingType.Auction
                    ? "Bid on this Auction"
                    : "Make a Offer"}{" "}
                </p>
                {data.type === ListingType.Auction && (
                  <>
                    <p>Current Amount bid</p>
                    <p>Time Remaining</p>
                  </>
                )}
                <input
                  type="text"
                  placeholder={placeholderFormat()}
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="w-full p-2 rounded bg-gray-100 text-black outline-none"
                />
              </div>
              <div className="space-y-3">
                {data.type === ListingType.Auction ? (
                  <>
                    <p>Action Listing</p>
                    <p className="">
                      {minimunNextBid?.displayValue} {minimunNextBid?.symbol}
                    </p>
                    <p className="">{data.id}</p>
                  </>
                ) : (
                  <div className="mt-8"></div>
                )}
                <button
                  onClick={handleBidOrOffer}
                  className="bg-gradient-to-r from-orange-500/50 to-rose-600/50 shadow-xl w-32  flex items-center justify-center mx-auto rounded-full p-2 px-8 text-white"
                >
                  {data.type === ListingType.Direct ? "Offer" : "Bid"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
