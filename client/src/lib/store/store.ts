//Store file

import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/auth/authSlice"
import intitituteSlice from "./slices/institute/instituteSlice"
import teacherSlice from "./slices/teacher/teacherSlice"
import studentSlice from "./slices/student/studentSlice"

// makeStore is a global variable
const store = configureStore({
    reducer: {
        authSlice: authSlice,
        institute: intitituteSlice,
        teacher: teacherSlice,
        student: studentSlice,
    },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;