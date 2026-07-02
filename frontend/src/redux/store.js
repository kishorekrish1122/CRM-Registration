import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import adminReducer from "./adminSlice";
import vendorReducer from "./vendorSlice";
import clientReducer from "./clientSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    vendor: vendorReducer,
    client: clientReducer,
  },
});

export default store;