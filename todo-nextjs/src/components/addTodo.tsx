import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Checkbox,
  useToast,
  //@ts-ignore
} from "@chakra-ui/react";
import React, { useState } from "react";
import { trpc } from "utils/trpc";

function AddTodo({
  isOpen,
  onClose,
  refetch,
}: {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}) {
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [content, setContet] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { mutate, isLoading } = trpc.addTodo.useMutation();
  const handleSubmit = () => {
    mutate(
      {
        title,
        content,
        isCompleted,
      },
      {
        onSuccess(value) {
          toast({
            title: "Todo created.",
            description: "We've created your todo for you.",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
          onClose();
          refetch();
          setTitle("");
          setContet("");
          setIsCompleted(false);
        },
        onError() {
          toast({
            title: "Oppppsss....!.",
            description: "Something wrong.",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        },
      }
    );
  };
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent bgGradient="linear-gradient(to right top, #b3bac4, #90a2bc, #6d8ab4, #4873ab, #0c5ca2)">
          <ModalHeader color="white">Create Todo</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="white">Title</FormLabel>
              <Input
                ref={initialRef}
                value={title}
                color="white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder="Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="white">Description</FormLabel>
              <Input
                placeholder="Description"
                value={content}
                color="white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContet(e.target.value)
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel color="white">Complete</FormLabel>
              <Checkbox
                colorScheme="green"
                borderColor="white"
                color="white"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setIsCompleted(e.target.checked);
                }}
              >
                Checkbox
              </Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={isLoading}
              loadingText="Loading"
              spinnerPlacement="start"
              onClick={handleSubmit}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTodo;
