import {
  Button,
  useDisclosure,
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
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
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
      <Button onClick={onOpen}>Open Modal</Button>
      <Button ml={4} ref={finalRef}>
        I'll receive focus on close
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
                placeholder="Title"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                value={content}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setContet(e.target.value)
                }
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Complete</FormLabel>
              <Checkbox
                colorScheme="green"
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
