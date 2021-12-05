import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    mergeUsers: (state, action) => {
      state.users = [...state.users, ...action.payload];
    },
  },
});

export const { mergeUsers } = usersSlice.actions;

export default usersSlice.reducer;
