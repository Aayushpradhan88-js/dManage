import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./slices/courseSlice";

// makeStore is a global variable
export const store = () => {
    return configureStore({
        reducer: {
            course: courseSlice
        },
    });
};

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

export {AppDispatch, RootState};