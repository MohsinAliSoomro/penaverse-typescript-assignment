import type { AppProps } from "next/app";
import { trpc } from "../../utils/trpc";
//@ts-ignore
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors });

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      {" "}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
export default trpc.withTRPC(App);
