import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  profileUser: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setProfileUser: (state, { payload }) => {
      state.profileUser = payload;
    },
    mergeUsers: (state, action) => {
      state.users = [...state.users, ...action.payload];
    },
  },
});

export const { mergeUsers, setProfileUser } = usersSlice.actions;

export default usersSlice.reducer;
