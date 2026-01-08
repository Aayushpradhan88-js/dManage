import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitialStateType } from "./authTypes";

const initialState: IAuthInitialStateType = {
    user: {
        name: "",
        email: "",
        password: ""
    },
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: ""
    }
};

cosnt authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setUser: (state:IAuthInitialStateType, action) => {
            
        }
    },
});