import React, { useState, useMemo, useEffect, memo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { VStack, HStack, Link } from "@chakra-ui/react";
import PostCommentForm from "./PostCommentForm";
import PostAvatar from "./PostAvatar";
import PostComment from "./PostComment";
import { postComments } from "../../features/posts/postsSlice";
import { isEqual } from "lodash";

const PostComments = ({ post, forceFocus, showAll }) => {
  console.log("PostComments", post.id, forceFocus, showAll);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [number, setNumber] = useState(2);

  useEffect(() => {
    if (post.commentsLoaded == false) {
      dispatch(postComments(post.id));
    }
  }, [post.commentsLoaded]);

  const _comments = useMemo(() => {
    console.log("post.comments", post.comments);
    return post.comments.slice(0, number);
  }, [post.comments, number]);

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
            src={user.avatar}
          />
          <PostCommentForm postId={post.id} forceFocus={forceFocus} />
        </HStack>
        {!showAll &&
          _comments.map((comment) => (
            <PostComment key={comment.id} postId={post.id} comment={comment} />
          ))}

        {showAll &&
          post.comments.map((comment) => (
            <PostComment key={comment.id} postId={post.id} comment={comment} />
          ))}

        {!showAll && number < post.comments.length && (
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
  post: PropTypes.object.isRequired,
  forceFocus: PropTypes.number.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default memo(PostComments, (prevProps, nextProps) => {
  return prevProps.forceFocus === nextProps.forceFocus
   && prevProps.showAll === nextProps.showAll 
   && isEqual(prevProps.post.comments, nextProps.post.comments);
});
