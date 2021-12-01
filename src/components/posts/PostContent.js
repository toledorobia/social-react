import React, { memo } from "react";
import PropTypes from "prop-types";
import { Text } from "@chakra-ui/react";

import PostImage from "./PostImage";
import PostVideo from "./PostVideo";

const PostContent = ({ content, image, video, ...props }) => {
  return (
    <>
      {content && <Text px={4}>{content}</Text>}
      {image && (
        <PostImage objectFit="cover" src={image} alt="Post Image" maxH={300} />
      )}
      {video && <PostVideo src={video} />}
    </>
  );
};

PostContent.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string,
  video: PropTypes.string,
};

export default memo(PostContent);
