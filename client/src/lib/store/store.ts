import { configureStore } from "@reduxjs/toolkit";
import courseSlice from "./slices/courseSlice";

// makeStore is a global variable
const store = configureStore({
    reducer: {
        /*
        auth: authSlice,
        teacher: teacherSlice,
        student: studentSlice,
        initituteTeacher:initituteTeacherSlice ,
        category: categorySlice
        */
        course: courseSlice
    },
});

export default store;
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>;