// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import modalReducer from "./reducers/modalSlice";

const store = configureStore({
  reducer: {
    user: userReducer, // Reducer cho user
    modal: modalReducer, // Reducer cho modal
  },
});

export default store;
