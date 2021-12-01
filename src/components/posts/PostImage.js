import React, { useState } from "react";
import { Image, Skeleton } from "@chakra-ui/react";

const PostImage = (props) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Skeleton isLoaded={loaded} {...props}>
        <Image {...props} onLoad={onLoad} width="100%" align="top" />
      </Skeleton>
    </>
  );
};

export default PostImage;
