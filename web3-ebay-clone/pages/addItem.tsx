import { PhotoIcon } from "@heroicons/react/24/outline";
import { useAddress, useContract } from "@thirdweb-dev/react";
import React, { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Headers";
import { toastLoading, toastMessage } from "../utils/toast";
export default function AddItem() {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<any>();
  const [preview, setPreview] = useState("");
  const address = useAddress();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_NFT_COLLECTIONS,
    "nft-collection"
  );

  const mintNFT = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contract && !address) return;

    if (!image) {
      alert("Please select image");
      return;
    }
    toastLoading();
    const target = e.target as typeof e.target & {
      name: { value: string };
      description: { value: string };
    };
    const metadata = {
      name: target.name.value,
      description: target.description.value,
      image: image,
    };
    setLoading(true);
    try {
      if (typeof address === "string") {
        const tx = contract?.mintTo(address, metadata);
        if (tx) toastMessage(tx, "NFT created Successfull...!");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <main className="max-w-6xl mx-auto mt-2 shadow-lg p-5">
        <h1 className="text-xl font-bold">Add Items to the Marketplace</h1>
        <p className="text-lg">Item Details</p>
        <p>
          By adding an item to the marketplace you're essentially minting an NFT
          of the item into your wallet which we can then list for sale!
        </p>
        <div className="flex flex-col md:flex-row md:space-x-4 mt-4">
          <div className="w-full sm:w-96 rounded-2xl shadow-xl">
            {preview ? (
              <img src={preview} alt={preview} />
            ) : (
              <PhotoIcon className="text-orange-500" />
            )}
          </div>
          <div className="w-full p-4">
            <form onSubmit={mintNFT} className="space-y-2">
              <div>
                <label>Name</label>
                <input
                  className="flex w-full border p-2 text-black outline-none"
                  type="text"
                  placeholder="Name"
                  id="name"
                  name="name"
                />
              </div>
              <div>
                <label>Description</label>
                <input
                  className="flex w-full border p-2 text-black outline-none"
                  type="text"
                  placeholder="Description"
                  id="description"
                  name="description"
                />
              </div>
              <div>
                <label>Image</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files && e.target.files[0]) {
                      setPreview(URL.createObjectURL(e.target.files[0]));
                      setImage(e.target.files[0]);
                    }
                  }}
                  className="flex w-full border p-2"
                  type="file"
                />
              </div>
              <button
                type="submit"
                className="flex flex-end ml-auto connectWalletBtn p-4 rounded-full mt-2 text-white"
              >
                {loading ? "Loading...!" : "  Add Item / Mint Item"}
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
