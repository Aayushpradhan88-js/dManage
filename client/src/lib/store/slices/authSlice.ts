//user slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
        }
    }
});

const { setAge, setAddress } = authSlice.actions;

export default authSlice.reducer;
export {setAge, setAddress};