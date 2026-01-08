//Store file

import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/auth/authSlice"
import teacherSlice from "./slices/teacher/teacherSlice"
import intitituteSlice from "./slices/institute/instituteSlice"

// makeStore is a global variable
const store = configureStore({
    reducer: {
        authSlice: authSlice,
        institute: intitituteSlice,
        teacher: teacherSlice,
    },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;