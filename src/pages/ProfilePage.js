import React from "react";
import { VStack } from "@chakra-ui/react";
import ProfileForm from "../components/profile/ProfileForm";
import PostForm from "../components/posts/PostForm";

const ProfilePage = () => {
  return (
    <>
      <VStack spacing={4} alignItems="stretch" mx="auto" maxW="lg">
        <ProfileForm />
        <PostForm />
      </VStack>
    </>
  );
};

export default ProfilePage;
