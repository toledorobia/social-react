import React from "react";
import PropTypes from "prop-types";
import {
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import PostAvatar from "./PostAvatar";
import dayjs from "../../libs/dayjs";

const PostComment = ({ comment, ...props }) => {
  const bg = useColorModeValue("gray.200", "gray.700");

  return (
    <>
      <HStack spacing={2} alignItems="start">
        <PostAvatar
          size="sm"
          src={comment.user.photoUrl}
          name={comment.user.name}
        />
        <VStack flex={1} spacing={0} alignItems="stretch">
          <VStack
            spacing={0}
            alignItems="start"
            borderRadius="lg"
            bg={bg}
            px={3}
            py={2}
          >
            <Link fontWeight="bold" fontSize="xs">
              {comment.user.name}
            </Link>
            <Text fontSize="sm">{comment.content}</Text>
          </VStack>

          <HStack spacing={1} px={3}>
            <Link fontWeight="bold" fontSize="xs" color="gray.600">
              Like
            </Link>
            <Text fontSize="xs" color="gray.600">
              &bull;
            </Text>
            <Link fontSize="xs" color="gray.600">
              {dayjs(comment.createdAt).fromNow()}
            </Link>
            <Spacer />
            <Icon as={MdFavorite} color="gray.600" boxSize="0.8em" />
            <Link fontWeight="bold" fontSize="xs" color="gray.600">
              {comment.likes.length}
            </Link>
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default PostComment;
