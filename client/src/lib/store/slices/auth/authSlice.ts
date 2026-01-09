//auth slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthInitialStateType, IUser } from "./authTypes";
import { IStatus } from "../../global/types/type";
import { IRegister } from "@/src/app/Auth/register/registerTypes";
import API from "../../global/types/apiCall";

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
})

export const { setUser, setStatus } = authSlice.actions;
export default authSlice.reducer;

function registerUser(data: IRegister){
    return async function registerUserThunk(dispatch: any){
        try {
            const response = await API.post("/auth/register",data);
            if(response.status === 200) {
                dispatch(setStatus(IStatus.SUCCESS))
            }
        } catch (error) {
            
        }
    }
}
