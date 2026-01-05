import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "./slices/exampleSlice";
import courseSlice from "./slices/courseSlice";

// makeStore is a global variable
export const makeStore = () => {
    return configureStore({
        reducer: {
            course: courseSlice
        },
    })
};

type AppDispatch = typeof makeStore.dispatch;

export {AppDispatch}