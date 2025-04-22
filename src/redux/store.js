import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cardSlice";

const store = configureStore({
  reducer: cartReducer,
});

export default store;
