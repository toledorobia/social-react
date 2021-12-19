import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import {
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Link,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import PostAvatar from "./PostAvatar";
import MenuItemConfirm from "../ui/MenuItemConfirm";
import { FiMenu, FiTrash2 } from "react-icons/fi";
import { dateFormat, dateFromNow } from "../../libs/helpers";
import { deletePost } from "../../backend/posts";

const PostHeader = ({ postId, createdAt, postUser }) => {
  const toast = useToast();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useBoolean(false);
  const isOwner = user && user.uid === postUser.uid;

  const handleDelete = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setLoading.on();
      await deletePost(postId);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading.off();
    }
  }, [postId, loading, setLoading, toast]);

  return (
    <>
      <HStack px={4} pt={3}>
        <PostAvatar name={postUser.name} src={postUser.photoUrl} />
        <VStack spacing={0} alignItems="start" flex={1}>
          <Link
            as={LinkRouter}
            to={"/profile/" + postUser.uid}
            fontWeight="bold"
          >
            {postUser.name}
          </Link>
          <Link
            as={LinkRouter}
            to={"/post/" + postId}
            fontSize="xs"
            title={dateFormat(createdAt)}
          >
            {dateFromNow(createdAt)}
          </Link>
        </VStack>
        {isOwner && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<FiMenu />}
              variant="outline"
            />
            <MenuList>
              <MenuItemConfirm
                as={MenuItem}
                icon={<FiTrash2 />}
                title="Delete post"
                message="Are you sure you want to delete this post?"
                buttonTitle="Delete"
                onConfirm={handleDelete}
              >
                Delete
              </MenuItemConfirm>
            </MenuList>
          </Menu>
        )}
      </HStack>
    </>
  );
};

PostHeader.propTypes = {
  postId: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  postUser: PropTypes.object.isRequired,
};

export default PostHeader;
