import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/react";

import ProfileHeader from "../../components/profile/ProfileHeader";
import Post from "../../components/posts/Post";
import PostForm from "../../components/posts/PostForm";
import ProfileForm from "../../components/profile/ProfileForm";
import LoadingPage from "./../common/LoadingPage";
import { getProfile } from "../../features/users/usersSlice";
import { getProfileFeed, setProfilePosts } from "../../features/posts/postsSlice";
import { isEmptyString } from "../../libs/helpers";

const ProfilePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.users.profile);
  const profilePosts = useSelector((state) => state.posts.profilePosts);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    try {
      let id = user.id;
      if (!isEmptyString(params.id) && params.id !== user.id) {
        id = params.id;
      }

      setIsOwnProfile(id === user.id);
      dispatch(getProfile(id)).unwrap();
    } catch (error) {
      navigate("/404");
    }
  }, [params, user, dispatch]);

  useEffect(() => {
    if (profile == null) {
      dispatch(setProfilePosts([]));
      return;
    }

    dispatch(getProfileFeed(profile.id)).unwrap();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [dispatch, profile]);

  if (profile == null) {
    return <LoadingPage />;
  }

  return (
    <>
      <VStack spacing={4} alignItems="stretch" mx="auto" maxW="lg">
        {isOwnProfile && <ProfileForm />}
        {!isOwnProfile && profile !== null && (
          <ProfileHeader user={profile} />
        )}
        {isOwnProfile && <PostForm />}
        {profilePosts.map((p) => (
          <Post key={p.id} post={p} showAll={false} />
        ))}
      </VStack>
    </>
  );
};

export default ProfilePage;
