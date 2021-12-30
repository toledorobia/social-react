import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Link as LinkRouter, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
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

import { FiHome, FiMenu, FiLogOut, FiUser } from "react-icons/fi";
import { signOut } from "../../features/auth/authSlice";

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
      <Box ml={{ base: 0, md: 60 }} px={4} pb={4} pt={{ base: "24", md: "4" }}>
        {children}
      </Box>
    </Box>
  );
};

SideBar.propTypes = {
  children: PropTypes.node.isRequired,
};

const SidebarContent = ({ onClose, ...rest }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleSignOut = useCallback(async () => {
    await dispatch(signOut());
    navigate("/");
  }, [dispatch, navigate]);

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
          <Text fontSize="xs">{user.name}</Text>
        </VStack>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <NavItem to="/" key="Home" icon={FiHome}>
        Home
      </NavItem>
      <NavItem to="/profile" key="Profile" icon={FiUser}>
        Profile
      </NavItem>
      <NavItem onClick={handleSignOut} key="Sign Out" icon={FiLogOut}>
        Sign Out
      </NavItem>
    </Box>
  );
};

SidebarContent.propTypes = {
  onClose: PropTypes.func.isRequired,
};

// const NavItem = ({ to, onClick, icon, children, ...rest }) => {
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

NavItem.propTypes = {
  to: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
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

      <Text fontSize="2xl" ml="8" fontWeight="bold">
        Social
      </Text>
    </Flex>
  );
};

MobileNav.propTypes = {
  onOpen: PropTypes.func.isRequired,
};

export default SideBar;
