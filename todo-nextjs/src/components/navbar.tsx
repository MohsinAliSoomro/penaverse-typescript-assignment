import {
  Box,
  Button,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  Heading,
  //@ts-ignore
} from "@chakra-ui/react";

import * as React from "react";

export const Navbar = ({onOpen}:{onOpen:()=>void}) => {
  return (
    <Box as="section">
      <Box
        as="nav"
        bg="bg-surface"
        boxShadow={useColorModeValue("sm", "sm-dark")}
      >
        <Flex flex="1" justify="space-between" align="center" p="5">
          <Heading color="white">Todo App</Heading>
          <Button colorScheme="teal" onClick={onOpen}>Add Todo</Button>
        </Flex>
      </Box>
    </Box>
  );
};
