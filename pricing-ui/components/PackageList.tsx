import { Icon, Text, HStack, StackProps } from "@chakra-ui/react";
import React from "react";
import { TickIcon } from "../icons/TickIcon";

export default function PackageList(props: StackProps) {
  const { children, ...rest } = props;

  return (
    <HStack {...rest} py="12px">
      <Icon
        as={TickIcon}
        width="22px"
        height="22px"
        borderRadius="999px"
        bg="#6134C4"
      />
      <Text fontSize="18px">{children}</Text>
    </HStack>
  );
}
