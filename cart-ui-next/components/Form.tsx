import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Text,
  Heading,
  HStack,
  Select,
  Checkbox,
  Button,
} from "@chakra-ui/react";
export default function DetailForm() {
  return (
    <Box p="40px" maxWidth="640px">
      <Heading>Your details</Heading>
      <Text>If you already have an account, click here to log in.</Text>
      <HStack mt="40px">
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input bg="#EDF2F7" placeholder="First Name" />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input bg="#EDF2F7" placeholder="Last Name" />
        </FormControl>
      </HStack>
      <FormControl my="24px">
        <FormLabel>Address</FormLabel>
        <Input bg="#EDF2F7" placeholder="Address" />
      </FormControl>
      <HStack>
        <FormControl>
          <FormLabel>City</FormLabel>
          <Input bg="#EDF2F7" placeholder="City" />
        </FormControl>
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Select bg="#EDF2F7">
            <option>United State</option>
          </Select>
        </FormControl>
      </HStack>
      <FormControl my="24px">
        <HStack>
          <Checkbox colorScheme="green" color="green.500" />
          <FormLabel>Ship to the billing address.</FormLabel>
        </HStack>
      </FormControl>
      <Button width="100%" bg="#8AC919" color="white">
        Save
      </Button>
    </Box>
  );
}
