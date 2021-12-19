import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { VStack, HStack, Link } from "@chakra-ui/react";
import PostCommentForm from "./PostCommentForm";
import PostAvatar from "./PostAvatar";
import PostComment from "./PostComment";

const PostComments = ({ postId, comments, forceFocus, showAll }) => {
  console.log("PostComments", postId, forceFocus, showAll);
  const user = useSelector((state) => state.auth.user);
  const [number, setNumber] = useState(2);

  const _comments = useMemo(() => {
    return comments.slice(0, number);
  }, [comments, number]);

  const onMoreComments = () => {
    setNumber(number + 10);
  };

  return (
    <>
      <VStack spacing={3} alignItems="stretch">
        <HStack alignItems="start">
          <PostAvatar
            size="sm"
            alignSelf="center"
            name={user.name}
            src={user.photoUrl}
          />
          <PostCommentForm postId={postId} forceFocus={forceFocus} />
        </HStack>
        {!showAll &&
          _comments.map((comment) => (
            <PostComment key={comment.id} postId={postId} comment={comment} />
          ))}

        {showAll &&
          comments.map((comment) => (
            <PostComment key={comment.id} postId={postId} comment={comment} />
          ))}

        {!showAll && number < comments.length && (
          <Link
            fontSize="sm"
            fontWeight="bold"
            color="gray.600"
            onClick={onMoreComments}
          >
            View more comments
          </Link>
        )}
      </VStack>
    </>
  );
};

PostComments.propTypes = {
  postId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  forceFocus: PropTypes.number.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default PostComments;
