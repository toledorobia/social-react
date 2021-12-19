import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  post: null,
  posts: [],
  profilePosts: [],
  loaded: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state, { payload }) => {
      state.post = payload;
    },
    setPosts: (state, { payload }) => {
      state.posts = payload;
      state.loaded = true;
    },
    setProfilePosts: (state, { payload }) => {
      state.profilePosts = payload;
    },
  },
});

export const { setPost, setPosts, setProfilePosts } = postsSlice.actions;

export default postsSlice.reducer;
