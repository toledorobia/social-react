import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile as getProfileBackend, updateProfile as updateProfileBackend } from "../../backend/users";

export const getProfile = createAsyncThunk(
  "users/profile",
  async (payload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await getProfileBackend(payload);
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "users/updateProfile",
  async ({ id, name, avatar }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const data = await updateProfileBackend(id, { name, avatar });
      return fulfillWithValue(data);
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

const initialState = {
  profile: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state) => {
        state.profile = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
  },
});

export default usersSlice.reducer;
