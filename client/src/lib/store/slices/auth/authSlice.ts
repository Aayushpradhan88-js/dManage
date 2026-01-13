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
        username: "",
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
                console.log("✅step: 5 incomming form data", userData)
                
                console.log("✅step: 6 calling backend api");
                const response = await API.post("/auth/register", userData);
                console.log("✅step: 7 calling backend api", response);
                console.log("✅step: 7.o calling backend api", response.data);

                // const{username,email} = response.data.datas
                if (response.status === 201) {
                    dispatch(setUser(response.data.datas))
                    dispatch(setStatus(IStatus.SUCCESS));
                    console.log("✅step: 8 response data", response.data)
                };
            } catch (error) {
                 console.error("❌ Registration failed:", {
                    message: (error as Error).message,
                });
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };


    static login(userData: ILogin) {
        return async function loginUserThunk(dispatch: AppDispatch) {
            try {
                const response = await API.post("auth/login", userData);
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