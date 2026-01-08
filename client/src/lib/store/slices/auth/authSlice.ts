import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitialStateType } from "./authTypes";
import { IStatus } from "../../global/types/type";

const initialState:IAuthInitialStateType = {
    user: {
        name: "",
        email: "",
        password:""
    },
    status: IStatus
}

createSlice({
    name: "auth",
    initialState: initialState,
    reducers:{
        
    }
})