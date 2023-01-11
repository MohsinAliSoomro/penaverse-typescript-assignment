import { Grid, GridItem, useBreakpointValue } from "@chakra-ui/react";
import Details from "./Details";
import DetailForm from "./Form";

export default function Cart() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  return (
    <Grid
      maxWidth="1280px"
      templateColumns={isDesktop ? "repeat(2,1fr)" : "repeat(1, 1fr)"}
      mx="auto"
    >
      <GridItem>
        <DetailForm />
      </GridItem>
      <GridItem>
        <Details />
      </GridItem>
    </Grid>
  );
}
