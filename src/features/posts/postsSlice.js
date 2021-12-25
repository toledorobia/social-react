import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  newPost as newPostBackend,
  getFeed as getFeedBackend,
  deletePost as deletePostBackend,
} from "../../backend/posts";

export const getFeed = createAsyncThunk(
  "posts/feed",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await getFeedBackend();
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const newPost = createAsyncThunk(
  "posts/new",
  async ({ content, image }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await newPostBackend(content, image);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await deletePostBackend(payload);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.fulfilled, (state, action) => {
        console.log("getFeed.fulfilled", action.payload);
        state.posts = action.payload;
      })
      .addCase(newPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.posts.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      })
  },
});

export const { setPost, setPosts, setProfilePosts } = postsSlice.actions;

export default postsSlice.reducer;
