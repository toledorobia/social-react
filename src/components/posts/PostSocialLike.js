import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Button, useBoolean } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { toggleLike } from "../../backend/posts";

const PostSocialLike = ({ postId, likes, ...props }) => {
  const [loading, setLoading] = useBoolean(false);
  const user = useSelector((state) => state.auth.user);
  const isLike = likes.find((l) => l.uid === user.uid) != null;

  const handleLike = useCallback(async () => {
    setLoading.on();
    try {
      await toggleLike(postId, user.uid, !isLike);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading.off();
    }
  }, [setLoading, postId, user.uid, isLike]);

  return (
    <>
      <Button
        onClick={handleLike}
        isLoading={loading}
        leftIcon={<MdFavorite />}
        colorScheme="gray"
        variant="ghost"
        size="sm"
        flex={1}
        color={isLike ? "blue.600" : "gray.600"}
      >
        {isLike ? "Unlike" : "Like"}
      </Button>
    </>
  );
};

PostSocialLike.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(PostSocialLike);
