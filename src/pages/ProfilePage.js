import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { VStack } from "@chakra-ui/react";
import ProfileForm from "../components/profile/ProfileForm";
import PostForm from "../components/posts/PostForm";

import { setProfilePosts } from "../features/posts/postsSlice";
import { snapshotProfilePost } from "../backend/posts";
import Post from "../components/posts/Post";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profilePosts = useSelector((state) => state.posts.profilePosts);

  useEffect(() => {
    if (user == null) {
      dispatch(setProfilePosts([]));
      return;
    }

    const unsubscribe = snapshotProfilePost(
      user.uid,
      (posts) => {
        dispatch(setProfilePosts(posts));
      },
      (error) => {}
    );

    return () => unsubscribe();
  }, [dispatch, user]);

  return (
    <>
      <VStack spacing={4} alignItems="stretch" mx="auto" maxW="lg">
        <ProfileForm />
        <PostForm />
        {profilePosts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </VStack>
    </>
  );
};

export default ProfilePage;
