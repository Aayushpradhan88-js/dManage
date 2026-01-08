//auth slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthInitialStateType, IUser } from "./authTypes";
import { IStatus } from "../../global/types/type";

const initialState: IAuthInitialStateType = {
    user: {
        name: "",
        email: "",
        password: "",
    },
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: "",
    },
};

const authSlice = createSlice({
    name: "auth slice",
    initialState: initialState,
    reducers: {
        setUser: (state: IAuthInitialStateType, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },

        setStatus: (state: IAuthInitialStateType, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
})

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;