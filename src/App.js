// import firebase from "firebase/app";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { firebaseClearUser } from "./libs/helpers";

import { signIn } from "./features/auth/authSlice";
import { snapshotAuthState, signOut } from "./backend/auth";

import SideBar from "./components/ui/SideBar";
import LoadingPage from "./pages/LoadingPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import MainPage from "./pages/MainPage";
import DebtFormPage from "./pages/DebtFormPage";

const App = () => {
  const dispatch = useDispatch();
  const loaded = useSelector((state) => state.auth.loaded);
  const logged = useSelector((state) => state.auth.logged);

  useEffect(() => {
    let unsubscribe = snapshotAuthState(async (user) => {
      if (user != null && !user.emailVerified) {
        await signOut();
      } else {
        dispatch(signIn(firebaseClearUser(user)));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
          <Route path="/" element={<MainPage />}></Route>
          <Route path="/debt" element={<DebtFormPage />}></Route>
        </Routes>
      </SideBar>
    </>
  );
};

export default App;
