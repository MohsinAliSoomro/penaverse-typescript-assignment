import { Flex, Box, Heading, Text, Button } from "@chakra-ui/react";
import useMobile from "../hooks/useMobileSize";
import PackageList from "./PackageList";
export default function Card() {
  const size = useMobile();
  return (
    <Box p="10px">
      <Flex
        maxW="994px"
        mx="auto"
        flexWrap={size === "sm" ? "wrap" : "nowrap"}
        mt={size === "sm" ? "-190px" : "-150px"}
        zIndex="10"
        bg="white"
        borderRadius="12px"
        boxShadow="0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)"
      >
        <Box
          width={size === "sm" ? "100%" : ""}
          textAlign="center"
          p="60px"
          bg="rgba(101,44,211,0.1)"
        >
          <Text fontSize="24px" pb="16px" fontWeight="bold">
            Premium Pro
          </Text>
          <Heading fontSize="60px" pb="8px" fontWeight="bold">
            $380
          </Heading>
          <Text fontSize="18px" pb="24px">
            Billing Just once
          </Text>
          <Button
            width={size === "sm" ? "100%" : "282px"}
            height="51px"
            bg="#805AD5"
            borderRadius="8px"
            color="white"
          >
            Get Started
          </Button>
        </Box>
        <Box p="48px">
          <Text fontSize="18px" pb="24px">
            Access These Features when you get this pricing package for your
            business
          </Text>
          <PackageList>International calling and messaging API</PackageList>
          <PackageList>Additional phone numbers</PackageList>
          <PackageList>Automated message via Zapier</PackageList>
          <PackageList>24/7 support and consulting</PackageList>
        </Box>
      </Flex>
    </Box>
  );
}
