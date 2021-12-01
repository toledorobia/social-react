import React, { useState } from "react";
import { Skeleton } from "@chakra-ui/react";

const PostVideo = ({ src, ...props }) => {
  const [loaded, setLoaded] = useState(false);

  const onLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      <Skeleton isLoaded={loaded} {...props} width="100%">
        <iframe
          onLoad={onLoad}
          width="100%"
          height="315"
          src={"https://www.youtube.com/embed/" + src}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </Skeleton>
    </>
  );
};

export default PostVideo;
