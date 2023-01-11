import { Box, Heading, Text } from "@chakra-ui/react";
import useMobile from "../hooks/useMobileSize";
export default function Header() {
  const size = useMobile();
  return (
    <Box textAlign="center" bg="#6B46C1" color="white" height="397px">
      <Heading
        pt={size === "sm" ? "56px" : "88px"}
        pb="16px"
        fontSize={size === "sm" ? "30px" : "48px"}
      >
        Simple price for your business
      </Heading>
      <Text fontSize={size === "sm" ? "16px" : "24px"}>
        Plans that are carfully crafted to suit your business
      </Text>
    </Box>
  );
}
