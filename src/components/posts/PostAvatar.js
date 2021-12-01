import React, { useState } from "react";
import { Avatar, Skeleton } from "@chakra-ui/react";

const PostAvatar = (props) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Skeleton isLoaded={loaded} borderRadius="full" {...props}>
        <Avatar {...props} onLoad={onLoad} />
      </Skeleton>
    </>
  );
};

export default PostAvatar;
