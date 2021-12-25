import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { VStack } from "@chakra-ui/react";

import Post from "../../components/posts/Post";

import { isEmptyString } from "../../libs/helpers";
import NotFoundPage from "../common/NotFoundPage";
import LoadingPage from "../common/LoadingPage";

const PostPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const post = useSelector((state) => state.posts.post);

  useEffect(() => {
    if (isEmptyString(params.id)) {
      return;
    }

    // const unsubscribe = snapshotPost(
    //   params.id,
    //   (posts) => {
    //     setLoaded(true);
    //     dispatch(setPost(posts));
    //   },
    //   (error) => {
    //     console.log("snapshotPost error", error);
    //   }
    // );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [params, user, dispatch]);

  if (!loaded) {
    return <LoadingPage />;
  }

  if (post === null) {
    return <NotFoundPage />;
  }

  return (
    <>
      <VStack spacing={4} alignItems="stretch" mx="auto" maxW="lg">
        <Post post={post} showAll={true} />
      </VStack>
    </>
  );
};

export default PostPage;
