import { configureStore, Store } from "@reduxjs/toolkit";
import teacherAuthSlice from "../store/auth/auth-slice"

const store = configureStore({
    reducer: {
        teacherAuth: teacherAuthSlice
    }
});

export default store;

//Api callable methods
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;