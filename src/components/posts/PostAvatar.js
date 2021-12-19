import React from "react";
import { Avatar } from "@chakra-ui/react";

const PostAvatar = (props) => {
  return (
    <>
      <Avatar borderRadius="full" {...props} />
    </>
  );
};

export default PostAvatar;
