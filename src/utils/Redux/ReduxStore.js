import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice/UserSlice.js";
import authenticateReducer from "./userSlice/UserSlice.js"
const store = configureStore({
  reducer: {
    user: userReducer,
    authenticate:authenticateReducer
  },
});
export default store;
