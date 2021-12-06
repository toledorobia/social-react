import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  profilePosts: [],
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
    setProfilePosts: (state, { payload }) => {
      state.profilePosts = payload;
    },
  },
});

export const { setPosts, setProfilePosts } = postsSlice.actions;

export default postsSlice.reducer;
