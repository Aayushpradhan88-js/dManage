//auth slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthInitialStateType, IUser } from "./authTypes";
import { IStatus } from "../../global/types/type";
import { IRegister } from "@/src/app/auth/register/registerTypes";
import { ILogin } from "@/src/app/auth/login/loginTypes";
import API from "../../global/types/apiCall";
import { AppDispatch } from "../../store";

const initialState: IAuthInitialStateType = {
    user: {
        name: "",
        email: "",
        password: "",
    },
    status: IStatus.LOADING
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
});

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

//API Call
export class APIAuth {
    static register(userData: IRegister) {
        return async function registerUserThunk(dispatch: AppDispatch) {
            try {
                const response = await API.post("/auth/register", userData);
                if (response.status === 201) {
                    dispatch(setStatus(IStatus.SUCCESS));
                };
            } catch (error) {
                console.error("Register success", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };


    static login(userData: ILogin) {
        return async function loginUserThunk(dispatch: AppDispatch) {
            try {
                const response = await API.post("/auth/login", userData);
                if (response.status === 201) {
                    dispatch(setStatus(IStatus.SUCCESS));
                };
            } catch (error) {
                console.error("Register success", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };
};