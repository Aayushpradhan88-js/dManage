import { createSlice } from "@reduxjs/toolkit";

interface IExampleInitialState{
    data: string | null
}

const initialState: IExampleInitialState = {
    data: null
}

const exampleSlice = createSlice({
    name: "example",
    initialState: initialState,
    reducers: {
        add: (state, action) => {
            
        }
    }
})