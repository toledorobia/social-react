import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { VStack, HStack, Input, Link } from "@chakra-ui/react";
import PostAvatar from "./PostAvatar";
import PostComment from "./PostComment";

const PostComments = ({ postId, comments, ...props }) => {
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
        <HStack>
          <PostAvatar
            size="sm"
            name="Dan Abrahmov"
            src="https://bit.ly/dan-abramov"
          />
          <Input
            size="sm"
            variant="filled"
            borderRadius="full"
            placeholder="Write a comment..."
          />
        </HStack>
        {_comments.map((comment) => (
          <PostComment key={comment.id} comment={comment} />
        ))}

        {number < comments.length && (
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
};

export default PostComments;
