import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    admins: [],
    loading: false,
    error: null,
  },

  reducers: {
    setAdmins: (state, action) => {
      state.admins = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setAdmins,
  setLoading,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;