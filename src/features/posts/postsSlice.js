import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { 
  newPost as newPostBackend,
  getFeed as getFeedBackend,
  deletePost as deletePostBackend,
  toggleLike as toggleLikeBackend,
  newPostComment as newPostCommentBackend,
  postComments as postCommentsBackend,
  toggleCommentLike as toggleCommentLikeBackend,
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

export const toggleLike = createAsyncThunk(
  "posts/like",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await toggleLikeBackend(payload);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const newPostComment = createAsyncThunk(
  "posts/commentCreate",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { postId, content } = payload;
      const data = await newPostCommentBackend(postId, content);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const postComments = createAsyncThunk(
  "posts/comments",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await postCommentsBackend(payload);
      return fulfillWithValue({ postId: payload, comments: data });
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const toggleCommentLike = createAsyncThunk(
  "posts/commentLike",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { postId, commentId } = payload;

      const data = await toggleCommentLikeBackend(postId, commentId);
      return fulfillWithValue({ postId, commentId, comment: data });
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
        state.posts = action.payload.map((post) => ({ ...post, commentsLoaded: false }));
      })
      .addCase(newPost.fulfilled, (state, action) => {
        state.posts.unshift({ ...action.payload, commentsLoaded: false });
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const { id } = action.payload;
        const index = state.posts.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.posts.splice(index, 1);
        }
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const post = action.payload;
        const index = state.posts.findIndex((p) => p.id === post.id);
        if (index !== -1) {
          const p = state.posts[index];
          p.likes = post.likes;
          state.posts[index] = p;
        }
      })
      .addCase(newPostComment.fulfilled, (state, action) => {
        const comment = action.payload;
        const index = state.posts.findIndex((p) => p.id === comment.postId);

        if (index !== -1) {
          const post = state.posts[index];
          post.comments.unshift(comment);
          post.commentsCount++;
          post.commentsLoaded = true;
          state.posts[index] = post;
        }
      })
      .addCase(postComments.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const index = state.posts.findIndex((p) => p.id === postId);

        if (index !== -1) {
          const post = state.posts[index];
          post.comments = comments;
          post.commentsLoaded = true;
          state.posts[index] = post;
        }
      })
      .addCase(toggleCommentLike.fulfilled, (state, action) => {
        const { postId, commentId, comment } = action.payload;
        console.log("payload", action.payload);
        const index = state.posts.findIndex((p) => p.id === postId);

        if (index !== -1) {
          const post = state.posts[index];
          const commentIndex = post.comments.findIndex((c) => c.id === commentId);
          if (commentIndex !== -1) {  
            post.comments[commentIndex] = comment;  
            state.posts[index] = post;
          }
        }
      })
  },
});

export const { setPost, setPosts, setProfilePosts } = postsSlice.actions;

export default postsSlice.reducer;
