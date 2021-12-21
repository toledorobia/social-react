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
  isEmptyString,
} from "../../libs/helpers";
import { newPost } from "../../backend/posts";
import { uploadImage } from "../../backend/storage";
import mime from "mime-types";

import PostAvatar from "./PostAvatar";

const PostForm = () => {
  const toast = useToast();
  const refInputContent = useRef(null);
  const refInputImage = useRef(null);
  const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useBoolean(false);
  const [posting, setPosting] = useBoolean(false);
  const [uploading, setUploading] = useBoolean(false);
  const [imageUrl, setImageUrl] = useState(null);
  const bg = useColorModeValue("white", "gray.700");
  const bgHover = useColorModeValue("white", "gray.700");

  const onPostClick = (event) => {
    event.target.blur();
    onOpen();
  };

  const onClickInputImage = () => {
    refInputImage.current.click();
  };

  const onRemoveImage = () => {
    setImageUrl(null);
  };

  const onUploadImage = useCallback(
    async (e) => {
      setLoading.on();
      setUploading.on();

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
        setUploading.off();
      }
    },
    [setLoading, setUploading, toast]
  );

  const onSubmit = useCallback(
    async () => {
      try {
        setLoading.on();
        setPosting.on();

        const content = refInputContent.current.innerText;
        if (isEmptyString(content) && isEmptyString(imageUrl)) {
          throw new Error("Content or image is required");
        }

        console.log("new post", user.uid, content, imageUrl);

        await newPost(user.uid, content, imageUrl);
        onClose();

        toast({
          title: "Success",
          description: "Post has been created",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        toast({
          title: "Error",
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading.off();
        setPosting.off();
      }

      console.log(refInputContent.current.innerText);
    },
    [imageUrl, onClose, setLoading, setPosting, toast, user.uid]
  );

  return (
    <>
      <Modal
        onClose={onClose}
        isOpen={isOpen}
        size="xl"
        closeOnOverlayClick={false}
        initialFocusRef={refInputContent}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create post</ModalHeader>
          <ModalCloseButton isDisabled={loading} />
          <ModalBody>
            <VStack spacing={4} alignItems="stretch">
              <Box
                contentEditable={!loading}
                ref={refInputContent}
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
                    isLoading={uploading}
                    isDisabled={loading}
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
          <PostAvatar name={user.name} src={user.avatar} />
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
