import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  profilePost: [],
  loaded: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loaded = true;
    },
    setProfilePosts: (state) => {
      state.profilePosts = [];
    },
  },
});

export const { setPosts, signOut } = postsSlice.actions;

export default postsSlice.reducer;
