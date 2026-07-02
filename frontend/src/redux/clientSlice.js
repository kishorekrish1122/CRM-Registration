import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",

  initialState: {
    clients: [],
    loading: false,
    error: null,
  },

  reducers: {
    setClients: (state, action) => {
      state.clients = action.payload;
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
  setClients,
  setLoading,
  setError,
} = clientSlice.actions;

export default clientSlice.reducer;