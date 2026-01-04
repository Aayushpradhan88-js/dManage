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

const userSlice = createSlice({
    name: "User slice",
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

// const age = userSlice.actions.setAge;
// const address = userSlice.actions.setAddress;
const { setAge, setAddress } = userSlice.actions
dispatch(setAge("aayush"));
dispatch(setAddress("itahari"));

export default userSlice.reducer;
export {setAge, setAddress};