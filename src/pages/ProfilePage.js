import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { VStack } from "@chakra-ui/react";
import ProfileForm from "../components/profile/ProfileForm";
import PostForm from "../components/posts/PostForm";

import { setProfilePosts } from "../features/posts/postsSlice";
import { setProfileUser } from "../features/users/usersSlice";
import { snapshotProfilePost } from "../backend/posts";
import Post from "../components/posts/Post";

import { isEmptyString } from "../libs/helpers";
import ProfileHeader from "../components/profile/ProfileHeader";
import { getUser } from "../backend/users";

const ProfilePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profileUser = useSelector((state) => state.users.profileUser);
  const profilePosts = useSelector((state) => state.posts.profilePosts);
  const [isOwnProfile, setIsOwnProfile] = useState(false);

  useEffect(() => {
    let uid = user.uid;
    if (!isEmptyString(params.uid) && params.uid !== user.uid) {
      uid = params.uid;
    }

    setIsOwnProfile(uid === user.uid);

    const getProfileUser = async () => {
      const profileUser = await getUser(uid);
      dispatch(setProfileUser(profileUser));
    };

    getProfileUser();
  }, [params, user, dispatch]);

  useEffect(() => {
    if (profileUser == null) {
      dispatch(setProfilePosts([]));
      return;
    }

    const unsubscribe = snapshotProfilePost(
      profileUser.uid,
      (posts) => {
        dispatch(setProfilePosts(posts));
      },
      (error) => {
        console.log("snapshotProfilePost error", error);
      }
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    return () => {
      console.log("unsubscribe useEffect");
      unsubscribe();
    };
  }, [dispatch, profileUser]);

  return (
    <>
      <VStack spacing={4} alignItems="stretch" mx="auto" maxW="lg">
        {isOwnProfile && <ProfileForm />}
        {!isOwnProfile && profileUser !== null && (
          <ProfileHeader user={profileUser} />
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
