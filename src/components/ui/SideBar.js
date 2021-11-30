import React, { useCallback } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  VStack,
  DrawerContent,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { FiHome, FiTrendingUp, FiMenu, FiLogOut } from "react-icons/fi";
import { signOut } from "../../backend/auth";

const SideBar = ({ children }) => {
  // const user = useSelector((state) => state.auth.user);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.50", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

const SidebarContent = ({ onClose, ...rest }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    await signOut();
    navigate("/");
  }, [navigate]);

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <VStack alignItems="start" spacing={1}>
          <Text fontSize="2xl" fontWeight="bold">
            Social
          </Text>
          <Text fontSize="xs">{user.displayName}</Text>
        </VStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem to="/" key="Home" icon={FiHome}>
        Home
      </NavItem>
      <NavItem to="/" key="Projection" icon={FiTrendingUp}>
        Profile
      </NavItem>
      <NavItem onClick={handleSignOut} key="Sign Out" icon={FiLogOut}>
        Sign Out
      </NavItem>
    </Box>
  );
};

const NavItem = ({ to, onClick, icon, children, ...rest }) => {
  if (onClick != null) {
    return (
      <>
        <Link onClick={onClick} style={{ textDecoration: "none" }}>
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            cursor="pointer"
            _hover={{
              bg: "blue.400",
              color: "white",
            }}
            {...rest}
          >
            {icon && (
              <Icon
                mr="4"
                fontSize="16"
                _groupHover={{
                  color: "white",
                }}
                as={icon}
              />
            )}
            {children}
          </Flex>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to={to} as={LinkRouter} style={{ textDecoration: "none" }}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "blue.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      position="fixed"
      top="0"
      left="0"
      w="100%"
      h={20}
      zIndex="1003"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Debts
      </Text>
    </Flex>
  );
};

export default SideBar;
