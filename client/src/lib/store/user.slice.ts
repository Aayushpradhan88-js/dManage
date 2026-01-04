//user slice

import {createSlice} from "@reduxjs/toolkit"

interface IUserInitiaState{
    name: string,
    address: string
};

const userInitialState: IUserInitiaState = {
        name: "",
        address:""
    };

const userSlice = createSlice({
    name: "User slice",
    initialState: userInitialState,
    reducers: {
        setAge(state, action){
            state.name = "aayush pradhan"
        },
        
        setAddress(state, action){
            state.address = "Itahari"

        }
    }
});

// const age = userSlice.actions.setAge;
// const address = userSlice.actions.setAddress;
const {setAge, setAddress} = userSlice.actions
setAge();
setAddress();