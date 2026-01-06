//user slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import API from "../helper/getDatafnx";

interface IUserInitiaState {
    name: string | null,
    address: string | null
};

const userInitialState: IUserInitiaState = {
    name: "",
    address: ""
};

const authSlice = createSlice({
    name: "auth slice",
    initialState: userInitialState,
    reducers: {
        setAge(state, action: PayloadAction<string>) {
            state.name = action.payload;
        },

        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
    },
});

const { setAge, setAddress } = authSlice.actions;

function registerUser() {
    return async function registerUserThunk() {
        const response = await API.post("/auth/register");
        if (response.status === 200) {
            console.log("user registered successfully");
        };
    };
};

function loginUser(){
    return async function loginUserThunk(data:string) {
        const response = await API.post("/auth/login", data);
        if (response.status === 200) {
            console.log("user registered successfully");
        };
    };
};

export {registerUser, loginUser};

export default authSlice.reducer;
export { setAge, setAddress };