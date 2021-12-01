import React from "react";
import PropTypes from "prop-types";
import {
  Text,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FiMenu, FiTrash2 } from "react-icons/fi";

import dayjs from "../../libs/dayjs";
import PostAvatar from "./PostAvatar";

const PostHeader = ({ postId, createdAt, user, ...props }) => {
  return (
    <>
      <HStack px={4} pt={3}>
        <PostAvatar name={user.name} src={user.avatar} />
        <VStack spacing={0} alignItems="start" flex={1}>
          <Text fontWeight="bold">{user.name}</Text>
          <Text fontSize="xs">{dayjs(createdAt).fromNow()}</Text>
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
    </>
  );
};

PostHeader.propTypes = {
  postId: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  user: PropTypes.object.isRequired,
};

export default PostHeader;
