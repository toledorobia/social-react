import React, { memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { Button, useBoolean, useColorModeValue } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { toggleLike } from "../../features/posts/postsSlice";

const PostSocialLike = ({ postId, likes }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useBoolean(false);
  const user = useSelector((state) => state.auth.user);
  const isLike = likes.find((l) => l.user._id === user.id) != null;

  const handleLike = useCallback(async () => {
    setLoading.on();
    try {
      await dispatch(toggleLike(postId)).unwrap();
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
        color={isLike ? useColorModeValue("blue.500", "blue.400") : useColorModeValue("gray.600", "gray.400")}
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
