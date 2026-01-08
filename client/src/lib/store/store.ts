//Store file

import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/auth/authSlice"
import courseSlice from "./slices/courseSlice"

// makeStore is a global variable
const store = configureStore({
    reducer: {
        authSlice: authSlice,
        course: courseSlice
    },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;