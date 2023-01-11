import { useBreakpointValue } from "@chakra-ui/react";

export default function useMobile() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const isTablet = useBreakpointValue({ base: false, md: true });
  const isMobile = useBreakpointValue({ base: false, sm: true });
  if (isMobile && !isDesktop && !isTablet) {
    return "sm";
  }
  if (isTablet && isMobile && !isDesktop) {
    return "md";
  }
  if (isDesktop) {
    return "lg";
  }
  return "sm";
}
