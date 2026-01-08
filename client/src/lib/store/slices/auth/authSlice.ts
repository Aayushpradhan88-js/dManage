import { createSlice } from "@reduxjs/toolkit";
import { IAuthInitialStateType } from "./authTypes";

const initialState:IAuthInitialStateType = {
    user: {
        name: "",
        email: "",
        password:""
    }

}

createSlice({
    name: "auth",
    initialState: 
})