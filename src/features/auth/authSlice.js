import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  logged: false,
  loaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.logged = action.payload != null;
      state.loaded = true;
    },
    signOut: (state) => {
      state.user = null;
      state.logged = false;
    },
  },
});

export const { signIn, signOut } = authSlice.actions;
// export const logged = (state) => state.auth.logged;
// export const loaded = (state) => state.auth.loaded;
// export const user = (state) => state.auth.user;

export default authSlice.reducer;
