import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Box, useColorModeValue, useBoolean, useToast } from "@chakra-ui/react";

import { newPostComment } from "../../backend/posts";
import { isEmptyString } from "../../libs/helpers";

const PostCommentForm = ({ postId, forceFocus, ...props }) => {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const [loading, setLoading] = useBoolean(false);
  const bg = useColorModeValue("gray.200", "gray.700");
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

        await newPostComment(postId, user.uid, content);
        toast({
          title: "Success",
          description: "Comment posted",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } catch (e) {
        toast({
          title: "Error",
          description: e,
          status: "error",
          duration: 5000,
          isClosable: true,
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
        bg={bg}
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
            color: "gray.500",
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
