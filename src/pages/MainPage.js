import React from "react";

import {
  VStack,
} from "@chakra-ui/react";
import { Post } from "../components/posts";
import PostForm from "../components/posts/PostForm";
import posts from "../data/posts";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const MainPage = () => {
  return (
    <>
      <VStack alignItems="stretch" maxW={590} mx="auto" spacing={5}>
        <PostForm />
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </VStack>
    </>
  );
};

export default MainPage;
