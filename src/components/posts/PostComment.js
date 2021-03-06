import React, { useCallback } from "react";
import { Link as LinkRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
import PostAvatar from "./PostAvatar";
import PostLikesList from "./PostLikesList";
import LinkConfirm from "../ui/LinkConfirm";
import { dateFormat, dateFromNow } from "../../libs/helpers";

import { toggleCommentLike, deletePostComment } from "../../features/posts/postsSlice";

const PostComment = ({ postId, comment }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const user = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useBoolean(false);
  const optionsColor = useColorModeValue("gray.600", "gray.400");

  const ownComment = user && user.id === comment.user.id;
  const isLike = comment.likes.find((l) => l.user._id === user.id) != null;

  const handleCommentLike = useCallback(async () => {
    if (loading) {
      return;
    }

    setLoading.on();
    try {
      await dispatch(toggleCommentLike({ postId, commentId: comment.id })).unwrap();
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
      await dispatch(deletePostComment({ postId, commentId: comment.id })).unwrap();
      toast({
        title: "Comment deleted",
        description: "The comment has been deleted.",
        status: "info",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: error.message,
        status: "error",
      });
      setLoading.off();
    }
  }, [loading, setLoading, postId, comment, toast]);

  return (
    <>
      <HStack spacing={2} alignItems="start">
        <PostAvatar
          size="sm"
          src={comment.user.avatar}
          name={comment.user.name}
        />
        <VStack flex={1} spacing={0} alignItems="stretch">
          <VStack
            spacing={0}
            alignItems="start"
            borderRadius="lg"
            bg={useColorModeValue("gray.200", "gray.600")}
            px={3}
            py={2}
          >
            <Link
              as={LinkRouter}
              to={"/profile/" + comment.user.id}
              fontWeight="bold"
              fontSize="xs"
            >
              {comment.user.name}
            </Link>
            <Text fontSize="sm">{comment.content}</Text>
          </VStack>

          <HStack spacing={1} px={3}>
            <Link
              onClick={handleCommentLike}
              fontWeight="bold"
              fontSize="xs"
              color={optionsColor}
            >
              {isLike ? "Unlike" : "Like"}
            </Link>
            <Text fontSize="xs" color={optionsColor}>
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
                  color={optionsColor}
                >
                  Delete
                </LinkConfirm>
                <Text fontSize="xs" color={optionsColor}>
                  &bull;
                </Text>
              </>
            )}

            <Link
              fontSize="xs"
              color={optionsColor}
              title={dateFormat(comment.createdAt)}
            >
              {dateFromNow(comment.createdAt)}
            </Link>
            <Spacer />
            <Icon as={MdFavorite} color={optionsColor} boxSize="0.8em" />
            <PostLikesList
              likes={comment.likes}
              fontSize="xs"
              fontWeight="bold"
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
