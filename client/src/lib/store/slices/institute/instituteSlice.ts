import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInstituteInitialState, IInstituteState } from "./instituteSliceTypes"
import { IStatus } from "../../global/types/type";

const initialState: IInstituteInitialState = {
    institute: {
        instituteName: " ",
        instituteEmail: " ",
        institutePhoneNumber: " ",
        instituteAddress: " ",
        instituteVatNumber: " ",
        institutePanNumber: " ",
    },
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: ""
    },
};

const intitituteSlice = createSlice({
    name: "Institute",
    initialState: initialState,
    reducers: {
        setInstitute: (state: IInstituteInitialState, action: PayloadAction<IInstituteState>) => {
            state.institute = action.payload;
        },

        setLoading: (state: IInstituteInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const {setInstitute, setLoading} = intitituteSlice.actions;
export default intitituteSlice.reducer;