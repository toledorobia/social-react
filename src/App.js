// import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import { signIn } from "./features/auth/authSlice";
import { snapshotAuthState, signOut } from "./backend/auth";

import SideBar from "./components/ui/SideBar";
import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loaded = useSelector((state) => state.auth.loaded);
  const logged = useSelector((state) => state.auth.logged);

  useEffect(() => {
    let unsubscribe = snapshotAuthState(async (user) => {
      if (user != null && !user.emailVerified) {
        await signOut();
      } else {
        dispatch(signIn(user));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user == null) {
      
    }
  }, [user.uid]);

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
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/" element={<SignInPage />}></Route>
        </Routes>
      </>
    );
  }

  return (
    <>
      <SideBar>
        <Routes>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/" element={<MainPage />}></Route>
        </Routes>
      </SideBar>
    </>
  );
};

export default App;
