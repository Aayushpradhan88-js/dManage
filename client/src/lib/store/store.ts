//Store file

import { configureStore } from "@reduxjs/toolkit"
import courseSlice from "./slices/courseSlice"
import authSlice from "./slices/authSlice"

// makeStore is a global variable
const store = configureStore({
    reducer: {
        /*
        teacher: teacherSlice,
        student: studentSlice,
        initituteTeacher:initituteTeacherSlice ,
        category: categorySlice
        */
       auth: authSlice,
       course: courseSlice
    },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;