// import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { check } from "./features/auth/authSlice";
import { setPosts } from "./features/posts/postsSlice";
import { snapshotPosts } from "./backend/posts";

import SideBar from "./components/ui/SideBar";
import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import PostPage from "./pages/PostPage";
import NotFoundPage from "./pages/NotFoundPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loaded = useSelector((state) => state.auth.loaded);
  const logged = useSelector((state) => state.auth.logged);

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  useEffect(() => {
    if (user == null) {
      dispatch(setPosts([]));
      return;
    }

    const unsubscribe = snapshotPosts(
      user.uid,
      (posts) => {
        dispatch(setPosts(posts));
      },
      (error) => {
        console.log(error);
      }
    );

    return () => unsubscribe();
  }, [dispatch, user]);

  if (!loaded) {
    return <LoadingPage />;
  }

  if (!logged) {
    return (
      <>
        <Routes>
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route path="/reset/:id/:hash" element={<ResetPasswordPage />}></Route>
          <Route path="/verify/:id/:hash" element={<VerifyEmailPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/" element={<SignInPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <SideBar>
        <Routes>
          <Route path="/profile/:uid" element={<ProfilePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </SideBar>
    </>
  );
};

export default App;
