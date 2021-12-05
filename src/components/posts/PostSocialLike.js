import React, { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { Button, useBoolean } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { toggleLike } from "../../backend/posts";

const PostSocialLike = ({ postId, likes, ...props }) => {
  const [loading, setLoading] = useBoolean(false);
  const user = useSelector((state) => state.auth.user);
  const like = likes.find((l) => l.uid === user.uid);

  const handleLike = useCallback(async () => {
    setLoading.on();
    try {
      await toggleLike(postId, user.uid, like);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading.off();
    }
  }, [setLoading, postId, user.uid, like]);

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
        color={like ? "blue.600" : "gray.600"}
      >
        {like ? "Unlike" : "Like"}
      </Button>
    </>
  );
};

PostSocialLike.propTypes = {
  postId: PropTypes.string.isRequired,
  likes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default memo(PostSocialLike);
