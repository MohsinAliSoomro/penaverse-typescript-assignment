import "../styles/globals.css";
import type { AppProps } from "next/app";
// import { AnimatePresence } from "framer-motion";
// const variants = {
//   hidden: { opacity: 0, x: -200, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: 0, y: -100 },
// };
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

//https://www.awwwards.com/sites/grosse-lanterne-1
//https://github.com/james-wallis/wallis.dev/blob/master/components/Layout.tsx
