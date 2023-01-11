"use client"
import { ChakraProvider } from "@chakra-ui/react";

interface IProps {
  children: React.ReactNode;
}

export default function ChakraUIWrapper({ children }: IProps) {
  return <ChakraProvider>{children}</ChakraProvider>;
}
