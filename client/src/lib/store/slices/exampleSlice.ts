import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        setData(state:IExampleInitialState, action:PayloadAction<string>){
            state.data = action.payload
        },
    },
});

const {setData} = exampleSlice.actions;

export {setData};
export default  exampleSlice.reducers;