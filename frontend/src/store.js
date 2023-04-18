import { configureStore } from "@reduxjs/toolkit";

import rootReducer from "./reducers";
import { loadState } from "./localstorage";
const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});

export default store;
