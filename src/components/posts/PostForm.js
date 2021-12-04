import React, { useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";

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
  VisuallyHiddenInput,
  Box,
  Skeleton,
  Image,
  useDisclosure,
  useToast,
  useBoolean,
} from "@chakra-ui/react";
import { FiImage, FiMinusCircle } from "react-icons/fi";
import {
  imageValidation,
  imageProcessing,
  generateUniqueId,
} from "../../libs/helpers";
import { uploadImage } from "../../backend/storage";
import mime from "mime-types";

import PostAvatar from "./PostAvatar";

const PostForm = (props) => {
  const toast = useToast();
  const [loading, setLoading] = useBoolean(false);
  const [posting, setPosting] = useBoolean(false);
  const refInputImage = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue("white", "gray.700");
  const bgHover = useColorModeValue("white", "gray.700");

  const onPostClick = (event) => {
    event.target.blur();
    onOpen();
  };

  const onClickInputImage = (e) => {
    refInputImage.current.click();
  };

  const onRemoveImage = () => {
    setImageUrl(null);
  };

  const onUploadImage = useCallback(
    async (e) => {
      setLoading.on();

      try {
        const files = e.target.files || e.dataTransfer.files;
        if (files.length === 0) {
          return;
        }

        const file = files[0];
        if (!imageValidation(file, ["image/jpeg", "image/png"], 2000)) {
          throw new Error("Image must be jpeg or png and less than 2MB");
        }

        const image = await imageProcessing(file, {
          quality: 0.6,
          type: "image/jpeg",
          scale: 0.5,
        });

        const ext = mime.extension(image.type);
        const fileName = `${generateUniqueId()}.${ext}`;

        const url = await uploadImage(image, "posts", fileName);
        setImageUrl(url);
      } catch (e) {
        console.log(e);
        toast({
          title: "Error",
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading.off();
      }
    },
    [toast, setLoading]
  );

  const onSubmit = useCallback(async (e) => {
    setLoading.on();
    setPosting.on();
  });

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="xl"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton isDisabled={loading} />
          <ModalBody>
            <VStack spacing={4} alignItems="stretch">
              {/* <Textarea
                resize="none"
                size="lg"
                rows={5}
                placeholder="What's on your mind, Jonathan?"
              /> */}
              <Box
                contentEditable={true}
                w="100%"
                maxW="100%"
                minH="100px"
                overflow="hidden"
                bg={bg}
                borderRadius="md"
                borderWidth={1}
                borderColor="gray.200"
                py={2}
                px={3}
                _focus={{
                  outline: "none",
                  borderColor: "blue.500",
                  // borderWidth: 0,
                }}
                _empty={{
                  _before: {
                    content: '"What\'s on your mind, Jonathan?"',
                    color: "gray.500",
                    cursor: "text",
                  },
                }}
              />

              <Image
                width="100%"
                maxH="250px"
                objectFit="cover"
                align="middle"
                src={imageUrl}
                borderRadius="md"
              />
              <HStack alignItems="stretch">
                {imageUrl === null && (
                  <Button
                    flex={1}
                    onClick={onClickInputImage}
                    isLoading={loading}
                    rightIcon={<FiImage />}
                    colorScheme="gray"
                    variant="outline"
                    color="gray.600"
                  >
                    Image
                    <VisuallyHiddenInput
                      type="file"
                      ref={refInputImage}
                      accept="image/png,image/jpeg"
                      onChange={onUploadImage}
                    />
                  </Button>
                )}
                {imageUrl && (
                  <Button
                    flex={1}
                    isDisabled={loading}
                    rightIcon={<FiMinusCircle />}
                    colorScheme="gray"
                    variant="outline"
                    color="gray.600"
                    onClick={onRemoveImage}
                  >
                    Remove Image
                  </Button>
                )}
              </HStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="primary"
              mr="2"
              isDisabled={loading}
              isLoading={posting}
              onClick={onSubmit}
            >
              Post
            </Button>
            <Button onClick={onClose} isDisabled={loading}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

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
          <PostAvatar name={user.name} src={user.photoUrl} />
          <Input
            onClick={onPostClick}
            variant="filled"
            borderRadius="full"
            placeholder="What's on your mind, Jonathan?"
          />
        </HStack>
      </VStack>
    </>
  );
};

export default PostForm;
