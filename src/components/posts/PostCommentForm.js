import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Box, useColorModeValue, useBoolean, useToast } from "@chakra-ui/react";

import { newPostComment } from "../../features/posts/postsSlice";
import { isEmptyString } from "../../libs/helpers";

const PostCommentForm = ({ postId, forceFocus }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const [loading, setLoading] = useBoolean(false);
  const refInputContent = useRef(null);

  useEffect(() => {
    if (forceFocus !== 0) {
      refInputContent.current.focus();
    }
  }, [forceFocus]);

  const onSubmit = useCallback(
    async (e) => {
      if (!(e.keyCode === 13 && e.shiftKey === false)) {
        return;
      }

      setLoading.on();
      try {
        const content = refInputContent.current.innerText;
        refInputContent.current.innerText = "";

        if (isEmptyString(content)) {
          throw new Error("Comment cannot be empty");
        }

        await dispatch(newPostComment({ postId, content })).unwrap();
        toast({
          title: "Success",
          description: "Comment posted",
          status: "success",
        });
      } catch (e) {
        toast({
          title: "Error",
          description: e,
          status: "error",
        });
      } finally {
        setLoading.off();
      }
    },
    [postId, user, setLoading, toast]
  );

  return (
    <>
      <Box
        ref={refInputContent}
        contentEditable={!loading}
        onKeyDown={onSubmit}
        w="100%"
        maxW="100%"
        overflow="hidden"
        bg={useColorModeValue("gray.200", "gray.600")}
        borderRadius="lg"
        borderWidth={0}
        py={2}
        px={3}
        _focus={{
          outline: "none",
          borderWidth: 0,
        }}
        _empty={{
          _before: {
            content: '"Write a comment..."',
            color: useColorModeValue("gray.500", "gray.400"),
            cursor: "text",
          },
        }}
      />
    </>
  );
};

PostCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  forceFocus: PropTypes.number.isRequired,
};

export default PostCommentForm;
