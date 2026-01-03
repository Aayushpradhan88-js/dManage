import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "aayush pradhan",
    initialState: {
        age: "",
        address:""
    },
    reducers: {
        setAge(state, action){
            state.age = "19"
        },
        
        setAddress(state, action){
            state.address = "Itahari"

        }
    }
});

const age = userSlice.actions.setAge;
const address = userSlice.actions.setAddress;
const {setAge, setAddress} = userSlice.actions
setAge();
setAddress();