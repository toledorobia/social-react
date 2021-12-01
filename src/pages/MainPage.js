import React from "react";

import {
  VStack,
  useColorModeValue,
  HStack,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalBody,
  ModalFooter,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { FiImage, FiVideo } from "react-icons/fi";
import { useNavigate } from "react-router";
import { Post, PostAvatar } from "../components/posts";
import posts from "../data/posts";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MainPage = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleClick = () => {
  //   navigate("/debt");
  // };

  const onPostClick = (event) => {
    event.target.blur();
    onOpen();
  };

  const bg = useColorModeValue("white", "gray.700");
  const bgHover = useColorModeValue("white", "gray.700");

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} alignItems="stretch">
              <Textarea
                resize="none"
                size="lg"
                rows={5}
                placeholder="What's on your mind, Jonathan?"
              />
              <HStack alignItems="stretch">
                <Button
                  flex={1}
                  rightIcon={<FiImage />}
                  colorScheme="gray"
                  variant="outline"
                  color="gray.600"
                >
                  Image
                </Button>
                <Button
                  flex={1}
                  rightIcon={<FiVideo />}
                  colorScheme="gray"
                  variant="outline"
                  color="gray.600"
                >
                  Video
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" mr="2">
              Post
            </Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <VStack alignItems="stretch" maxW={590} mx="auto" spacing={5}>
        <VStack
          bg={bg}
          _hover={{
            bg: bgHover,
            borderColor: "gray.400",
          }}
          // borderWidth="1px"
          // borderColor="gray.300"
          rounded="lg"
          alignItems="stretch"
          shadow="base"
          spacing={2}
          px={4}
          py={3}
        >
          <HStack>
            <PostAvatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
            <Input
              onClick={onPostClick}
              variant="filled"
              borderRadius="full"
              placeholder="What's on your mind, Jonathan?"
            />
          </HStack>
        </VStack>

        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </VStack>
    </>
  );
};

export default MainPage;
