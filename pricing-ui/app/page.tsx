"use client";
import Card from "../components/Card";
import ChakraUIWrapper from "../components/ChakraUIWrapper";
import Feature from "../components/Feature";
import Header from "../components/Header";

export default function App() {
  return (
    <ChakraUIWrapper>
      <Header />
      <Card />
      <Feature />
    </ChakraUIWrapper>
  );
}
