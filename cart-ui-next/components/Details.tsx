import { Box, Divider, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import Image from "next/image";
export default function Details() {
  return (
    <Box bg="#F7FAFC" p="40px" maxWidth="640px" height="100%">
      <Heading>Your details</Heading>
      <Text>If you already have an account, click here to log in.</Text>
      <Flex justify="space-between" mt="24px">
        <Box>
          <HStack>
            <Image src="/penny.png" width={96} height={96} alt="Penny" />
            <Box pl="24px">
              <Text fontWeight="bold" fontSize="16px">
                Penny board
              </Text>
              <Text fontSize="16px">PNYCOMP27541</Text>
            </Box>
          </HStack>
        </Box>
        <Box>
          <Text fontWeight="bold" fontSize="16px">
            $199.00
          </Text>
        </Box>
      </Flex>
      <Flex justify="space-between" mt="24px">
        <Text fontSize="16px">Subtotal</Text>
        <Text fontWeight="bold" fontSize="16px">
          $199.00
        </Text>
      </Flex>
      <Flex justify="space-between" mt="24px">
        <Text fontSize="16px">Shipping</Text>
        <Text fontWeight="bold" fontSize="16px">
          $19.99
        </Text>
      </Flex>
      <Flex justify="space-between" mt="24px">
        <Text fontSize="16px">Taxes (estimated)</Text>
        <Text fontWeight="bold" fontSize="16px">
          $23.80
        </Text>
      </Flex>
      <Divider orientation="horizontal" />
      <Flex justify="space-between" mt="24px">
        <Text fontSize="16px">Total</Text>
        <Text fontWeight="bold" fontSize="30px">
          $23.80
        </Text>
      </Flex>
    </Box>
  );
}
