// store.js
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { thunk } from "redux-thunk";

const store = configureStore({
  reducer: {
    user: userReducer, // Kết hợp các reducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Thêm middleware nếu cần
});

export default store;
