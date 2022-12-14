import Head from "next/head";
import { trpc } from "utils/trpc";
import { CheckIcon, CloseIcon, DeleteIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Grid,
  GridItem,
  Heading,
  Button,
  Flex,
  Spacer,
  Skeleton,
  useDisclosure,
  useToast,
  useBreakpointValue,
  //@ts-ignore
} from "@chakra-ui/react";
import AddTodo from "@/components/addTodo";
import { useState } from "react";
import { Navbar } from "@/components/navbar";

export default function Home() {
  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const isTablet = useBreakpointValue({ base: false, md: true });
  const isMobile = useBreakpointValue({ base: false, sm: true });
  console.log({ isDesktop, isMobile, isTablet });
  const toast = useToast();
  const [idx, setIdx] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data: todos,
    isLoading,
    isError,
    error,
    refetch,
  } = trpc.getTodos.useQuery();
  const markAsComplete = trpc.markAsComplete.useMutation();
  const markAsIncomplete = trpc.markAsInComplete.useMutation();
  const { mutate: deleteTodo, isLoading: deleteLoading } =
    trpc.deleteTodo.useMutation();
  if (isError) {
    return <pre>{JSON.stringify(error, null, 4)}</pre>;
  }

  const handleUpdate = (id: string, isCompleted: boolean) => {
    setIdx(id);
    if (isCompleted) {
      markAsIncomplete.mutate(
        {
          id: id,
        },
        {
          onSuccess() {
            toast({
              title: "Todo undo.",
              description: "We've undo your todo for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            refetch();
          },
        }
      );
    }
    if (!isCompleted) {
      markAsComplete.mutate(
        {
          id: id,
        },
        {
          onSuccess() {
            toast({
              title: "Todo completed.",
              description: "We've completed your todo for you.",
              status: "success",
              duration: 9000,
              isClosable: true,
            });
            refetch();
          },
        }
      );
    }
  };
  const handleDelete = (id: string) => {
    setIdx(id);
    deleteTodo(
      {
        id: id,
      },
      {
        onSuccess(value) {
          toast({
            title: "Todo deleted.",
            description: "We've deleted your todo for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          refetch();
        },
      }
    );
  };
  const getWindowSize = () => {
    if (isMobile && !isDesktop && !isTablet) {
      return "repeat(1, 1fr)";
    }
    if (isTablet && isMobile && !isDesktop) {
      return "repeat(2, 1fr)";
    }
    if (isDesktop) {
      return "repeat(4, 1fr)";
    }
  };
  return (
    <div>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          backgroundImage:
            "linear-gradient(to right top, #b3bac4, #90a2bc, #6d8ab4, #4873ab, #0c5ca2)",
          width: "100vw",
          height: "100vh",
          overflowX: "hidden",
        }}
      >
        <Navbar onOpen={onOpen} />
        <Grid templateColumns={getWindowSize()} gap={6} p="6">
          {isLoading
            ? [0, 1, 2, 3, 4].map((item) => (
                <GridItem key={item}>
                  <Skeleton
                    height="250px"
                    bg="green.500"
                    color="white"
                    fadeDuration={1}
                  ></Skeleton>
                </GridItem>
              ))
            : todos?.data.map((item) => (
                <GridItem
                  w="100%"
                  bg={item.isCompleted ? "green.500" : "red.500"}
                  borderRadius="lg"
                  boxShadow="lg"
                  key={item.id}
                  color="white"
                  bgGradient={`${
                    item.isCompleted
                      ? "linear-gradient(to right top, #dde5f0, #b9cadf, #95afce, #7096bd, #467dac);"
                      : "linear-gradient(to right top, #f0dded, #d1c1dc, #aca8ce, #7f91be, #467dac);"
                  } `}
                >
                  <Card>
                    <CardHeader>
                      <Heading as="h2" size="xl" color="white">
                        {item.title}
                      </Heading>
                    </CardHeader>
                    <CardBody>
                      <Text color="white">{item.content}</Text>
                      <Text color="white">
                        {item.isCompleted ? <del>Complete</del> : "Complete"}
                        {item.isCompleted ? (
                          <CheckIcon mx="2" color="green.600" />
                        ) : (
                          <CloseIcon mx="2" color="red.600" />
                        )}
                      </Text>
                    </CardBody>
                    <CardFooter>
                      <Flex justify="space-between" flex="1">
                        <Button
                          isLoading={
                            item.id === idx &&
                            (markAsComplete.isLoading ||
                              markAsIncomplete.isLoading)
                          }
                          spinnerPlacement="start"
                          size="xs"
                          colorScheme="teal"
                          variant="solid"
                          onClick={() =>
                            handleUpdate(item.id, item.isCompleted)
                          }
                        >
                          {item.isCompleted ? <RepeatIcon /> : <CheckIcon />}
                        </Button>
                        <Spacer />
                        <Button
                          isLoading={item.id === idx && deleteLoading}
                          spinnerPlacement="start"
                          size="xs"
                          onClick={() => handleDelete(item.id)}
                          colorScheme="orange"
                        >
                          <DeleteIcon />
                        </Button>
                      </Flex>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
        </Grid>
      </main>
      <AddTodo isOpen={isOpen} onClose={onClose} refetch={refetch} />
    </div>
  );
}
