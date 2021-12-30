import React from "react";
import PropTypes from "prop-types";
import { VStack, useColorModeValue } from "@chakra-ui/react";
import PostContent from "./PostContent";
import PostHeader from "./PostHeader";
import PostSocial from "./PostSocial";

const Post = ({ post, showAll }) => {
  const bg = useColorModeValue("white", "gray.700");
  const bgHover = useColorModeValue("white", "gray.700");

  return (
    <>
      <VStack
        bg={bg}
        _hover={{
          bg: bgHover,
          borderColor: "gray.400",
        }}
        // borderWidth="1px"
        // borderColor="gray.300"
        rounded="lg"
        alignItems="stretch"
        shadow="base"
        spacing={2}
      >
        <PostHeader
          postId={post.id}
          createdAt={post.createdAt}
          postUser={post.user}
        />
        <PostContent
          content={post.content}
          image={post.image}
          video={post.video}
        />
        <PostSocial
          post={post}
          showAll={showAll}
        />
      </VStack>
    </>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  showAll: PropTypes.bool.isRequired,
};

export default Post;
