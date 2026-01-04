import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/exampleSlice";

// makeStore is a global variable
export const makeStore = () => {
    return configureStore({
        reducer: {
            example: exampleSlice
        },
    })
};