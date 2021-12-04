import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Textarea,
  Editable,
  EditablePreview,
  EditableInput,
  Box,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const PostCommentForm = ({ postId, forceFocus, ...props }) => {
  console.log("PostCommentForm", postId, forceFocus);
  const bg = useColorModeValue("gray.200", "gray.700");
  const textarea = useRef(null);

  useEffect(() => {
    if (forceFocus !== 0) {
      textarea.current.focus();
    }
  }, [forceFocus]);

  return (
    <>
      {/* <Editable defaultValue="Take some chakra" w="100%">
        <EditablePreview />
        <EditableInput />
      </Editable> */}

      <Box
        ref={textarea}
        contentEditable={true}
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

      {/* <Textarea
        ref={textarea}
        onFocus={onFocus}
        onBlur={onBlur}
        rows={rows}
        overflow={rows === 1 ? "hidden" : "auto"}
        resize="none"
        size="sm"
        variant="filled"
        borderRadius="xl"
        placeholder="Write a comment..."
      /> */}
    </>
  );
};

PostCommentForm.propTypes = {
  postId: PropTypes.string.isRequired,
  forceFocus: PropTypes.number.isRequired,
};

export default PostCommentForm;
