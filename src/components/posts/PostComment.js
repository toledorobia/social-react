import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {
  HStack,
  VStack,
  Text,
  Link,
  Icon,
  Spacer,
  useColorModeValue,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { toggleLikeComment, deleteComment } from "../../backend/posts";
import PostAvatar from "./PostAvatar";
import PostLikesList from "./PostLikesList";
import LinkConfirm from "../ui/LinkConfirm";
import { dateFormat, dateFromNow } from "../../libs/helpers";

const PostComment = ({ postId, comment, ...props }) => {
  const [loading, setLoading] = useBoolean(false);
  const toast = useToast();
  const user = useSelector((state) => state.auth.user);
  const bg = useColorModeValue("gray.200", "gray.700");

  const ownComment = user && user.uid === comment.uid;
  const isLike = comment.likes.find((l) => l.uid === user.uid) != null;

  const handleCommentLike = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading.on();
    try {
      await toggleLikeComment(postId, comment.id, user.uid, !isLike);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading.off();
    }
  }, [loading, setLoading, postId, comment.id, user, isLike]);

  const handleCommentDelete = useCallback(async () => {
    if (loading) {
      return;
    }

    try {
      setLoading.on();
      await deleteComment(postId, comment.id);
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
  }, [loading, setLoading, postId, comment, toast]);

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
            <Link
              onClick={handleCommentLike}
              fontWeight="bold"
              fontSize="xs"
              color="gray.600"
            >
              {isLike ? "Unlike" : "Like"}
            </Link>
            <Text fontSize="xs" color="gray.600">
              &bull;
            </Text>
            {ownComment && (
              <>
                <LinkConfirm
                  title="Delete comment"
                  message="Are you sure you want to delete this comment?"
                  buttonTitle="Delete"
                  onConfirm={handleCommentDelete}
                  fontWeight="bold"
                  fontSize="xs"
                  color="gray.600"
                >
                  Delete
                </LinkConfirm>
                <Text fontSize="xs" color="gray.600">
                  &bull;
                </Text>
              </>
            )}

            <Link
              fontSize="xs"
              color="gray.600"
              title={dateFormat(comment.createdAt)}
            >
              {dateFromNow(comment.createdAt)}
            </Link>
            <Spacer />
            <Icon as={MdFavorite} color="gray.600" boxSize="0.8em" />
            <PostLikesList
              likes={comment.likes}
              fontSize="xs"
              fontWeight="bold"
              color="grey.600"
            />
          </HStack>
        </VStack>
      </HStack>
    </>
  );
};

PostComment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
};

export default PostComment;
