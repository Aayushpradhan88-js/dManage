import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "User slice",
    initialState: {
        name: "",
        address:""
    },
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