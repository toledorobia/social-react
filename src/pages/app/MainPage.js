import React from "react";
import { useSelector } from "react-redux";
import { VStack } from "@chakra-ui/react";
import { Post } from "../../components/posts";
import PostForm from "../../components/posts/PostForm";

const MainPage = () => {
  const posts = useSelector((state) => state.posts.posts);

  return (
    <>
      <VStack alignItems="stretch" maxW={590} mx="auto" spacing={5}>
        <PostForm />
        {posts.map((p) => (
          <Post key={p.id} post={p} showAll={false} />
        ))}
      </VStack>
    </>
  );
};

export default MainPage;
