import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { check } from "./features/auth/authSlice";
import { setPosts, getFeed } from "./features/posts/postsSlice";

import SideBar from "./components/ui/SideBar";
import LoadingPage from "./pages/common/LoadingPage";
import NotFoundPage from "./pages/common/NotFoundPage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import MainPage from "./pages/app/MainPage";
import ProfilePage from "./pages/app/ProfilePage";
import PostPage from "./pages/app/PostPage";

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

    dispatch(getFeed());
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
          <Route path="/profile/:id" element={<ProfilePage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/post/:id" element={<PostPage />}></Route>
          <Route path="/404" element={<NotFoundPage />}></Route>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="*" element={<NotFoundPage />}></Route>
        </Routes>
      </SideBar>
    </>
  );
};

export default App;
