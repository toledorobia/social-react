import React from "react";

import {
  Icon,
  Text,
  Stack,
  Tag,
  VStack,
  Flex,
  Spacer,
  useColorModeValue,
  StackDivider,
  Progress,
  HStack,
  Avatar,
  Image,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Link,
  Button,
} from "@chakra-ui/react";
import { FiMenu, FiTrash2, FiHeart } from "react-icons/fi";
import { MdFavorite, MdModeComment } from "react-icons/md";
import { useNavigate } from "react-router";

const MainPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/debt");
  };

  const bg = useColorModeValue("white", "gray.700");
  const bgHover = useColorModeValue("white", "gray.700");

  return (
    <>
      <VStack alignItems="stretch" maxW={590} mx="auto" spacing={5}>
        {[...Array(20).keys()].map((i) => (
          <VStack
            key={i}
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
          >
            <HStack px={4} pt={3}>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
              <VStack spacing={0} alignItems="start" flex={1}>
                <Text fontWeight="bold">Jonathan Toledo Orobia</Text>
                <Text fontSize="xs">1 hour ago</Text>
              </VStack>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMenu />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem icon={<FiTrash2 />}>Delete</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
            <Text px={4}>
              Placerat sapien parturient nec hac maecenas lacus eu nulla,
              vestibulum quisque suscipit netus dis posuere erat primis vitae,
              molestie neque mauris curae ullamcorper natoque consequat.
            </Text>
            <Image
              objectFit="cover"
              src="https://via.placeholder.com/500x400.png"
              alt="Post Image"
              maxH={300}
            />
            <VStack
              px={4}
              pb={3}
              alignItems="stretch"
              divider={<StackDivider borderColor="gray.200" />}
            >
              <HStack alignItems="flex-end">
                <HStack>
                  <Icon as={MdFavorite} color="red.500" boxSize="1.2em" />
                  <Text fontSize="sm">45</Text>
                </HStack>
                <Spacer />
                <Link fontSize="sm">23 comments</Link>
              </HStack>
              <HStack>
                <Button
                  leftIcon={<MdFavorite />}
                  colorScheme="teal"
                  variant="ghost"
                  size="sm"
                  flex={1}
                >
                  Like
                </Button>
                <Button
                  leftIcon={<MdModeComment />}
                  colorScheme="teal"
                  variant="ghost"
                  size="sm"
                  flex={1}
                >
                  Comment
                </Button>
              </HStack>
            </VStack>
          </VStack>
        ))}
      </VStack>
    </>
  );
};

export default MainPage;
