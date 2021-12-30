import React from "react";
import { useCallback, } from "react";
import { getAuth, signOut, } from "firebase/auth";
// import { useSelector, } from "react-redux";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, } from '@chakra-ui/icons';

const NavBar = () => {
  const auth = getAuth();
  // const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose, } = useDisclosure();

  const handleSignOut = useCallback(async () => {
    await signOut(auth);
  }, [auth]);

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}>
        <Flex minH="65px"
          alignItems="center"
          justifyContent="space-between">
          <IconButton size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none', }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8}
            alignItems="center">
            <Box>Debts</Box>
            <HStack as="nav"
              spacing={4}
              display={{ base: 'none', md: 'flex', }}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </HStack>
          </HStack>
          <Flex alignItems="center">
            {/* <Button variant="solid"
              colorScheme="teal"
              size="sm"
              mr={4}
              leftIcon={<AddIcon />}>
              Action
            </Button> */}
            <Menu>
              <MenuButton as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}>
                <Avatar size="sm"
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4}
            display={{ md: 'none', }}>
            <Stack as="nav"
              spacing={4}>
              {/* {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))} */}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default NavBar;
