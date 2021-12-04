import React, { useState } from "react";
import { Avatar, Skeleton } from "@chakra-ui/react";

const PostAvatar = (props) => {
  return (
    <>
      <Avatar borderRadius="full" {...props} />
    </>
  );
};

export default PostAvatar;
