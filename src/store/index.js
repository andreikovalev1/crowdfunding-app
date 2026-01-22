import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        temp: (state ={}) => state,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(),
});

setupListeners(store.dispatch);