import Head from "next/head";
import About from "../components/About";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Work from "../components/Projects";
import Skills from "../components/Skills";
import { useState, useEffect } from "react";
import { getAssets, getSiteMetadata } from "../services";
export default function Home() {
  const [metadata, setMetadata] = useState({});
  const [assets, setAssets] = useState<unknown>();
  const getData = async () => {
    const metadataResponse = getSiteMetadata();
    const assestResponse = getAssets();
    const responseData = await metadataResponse;
    const assetsData = await assestResponse;
    setAssets(assetsData);
    setMetadata(responseData);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="overflow-hidden">
        <Hero data={metadata} />
        <About data={metadata} />
        <Work />
        <Skills data={metadata} />
      </main>
      <Footer />
    </div>
  );
}
