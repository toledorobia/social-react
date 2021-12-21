import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import _ from "lodash";
import {
  check as checkAuth,
  signIn as signInAuth,
  signUp as signUpAuth,
  signOut as signOutAuth,
} from "../../backend/auth";

export const check = createAsyncThunk(
  "auth/check",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await checkAuth();
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { email, password } = payload;
      const data = await signInAuth(email, password);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { name, email, password } = payload;
      const data = await signUpAuth(name, email, password);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk(
  "auth/signOut",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      await signOutAuth();
      return fulfillWithValue();
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const authTypes = ["auth/check", "auth/signIn"];

const initialState = {
  user: null,
  logged: false,
  loaded: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.fulfilled, (state) => {
        state.user = null;
        state.logged = false;
        state.loaded = true;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.user = null;
        state.logged = false;
        state.loaded = true;
      })
      .addMatcher(
        (action) => _.some(authTypes, (path) => action.type.startsWith(path)),
        (state, action) => {
          if (action.type.endsWith("/fulfilled")) {
            const { user } = action.payload;
            state.user = user;
            state.logged = user != null;
            state.loaded = true;
          } else if (action.type.endsWith("/rejected")) {
            state.user = null;
            state.logged = false;
            state.loaded = true;
          }
        }
      );
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;
