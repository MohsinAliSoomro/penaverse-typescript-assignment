import { HStack, StackProps, Icon, Text, Flex } from "@chakra-ui/react";
import { ElementType } from "react";
import useMobile from "../hooks/useMobileSize";
import { HassleFreeIcon } from "../icons/HassleFreeIcon";
import { ShieldIcon } from "../icons/ShieldIcon";
import { SubscriptionIcon } from "../icons/SubscriptionIcon";

interface FeatureProps extends StackProps {
  icon: ElementType;
}
const FeatureCard = (props: FeatureProps) => {
  const { children, icon, ...rest } = props;
  return (
    <HStack {...rest}>
      <Icon as={icon} width="40px" height="40px" />
      <Text pl="24px" fontSize="18px" fontWeight="semibold" textAlign="left">
        {children}
      </Text>
    </HStack>
  );
};
export default function Feature() {
  const size = useMobile();
  return (
    <Flex
      flexWrap={size === "sm" ? "wrap" : "nowrap"}
      maxW="994px"
      mx="auto"
      mt="56px"
      mb="56px"
      px="30px"
    >
      <FeatureCard icon={ShieldIcon}>30 days money back Guarantee</FeatureCard>
      <FeatureCard py="23px" icon={HassleFreeIcon}>
        No setup fees 100% hassle-free
      </FeatureCard>
      <FeatureCard icon={SubscriptionIcon}>
        No monthly subscription Pay once and for all
      </FeatureCard>
    </Flex>
  );
}
