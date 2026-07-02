import { createSlice } from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const authSlice = createSlice({
  name: "auth",

  initialState: {
    userInfo,
  },

  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;

      localStorage.setItem(
        "user",
        JSON.stringify(action.payload)
      );

      localStorage.setItem(
        "token",
        action.payload.token
      );

      localStorage.setItem(
        "role",
        action.payload.role
      );
    },

    logout: (state) => {
      state.userInfo = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;