import { configureStore } from "@reduxjs/toolkit";

import queryReducer from "./slices/query";

const store = configureStore({
    reducer: { query: queryReducer },
});
export default store;
