//Institute Slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInstituteInitialState, IInstituteState } from "./instituteSliceTypes"
import { IStatus } from "../../global/types/type";
import {APIWithToken} from "../../global/types/apiCall";
import { AppDispatch } from "../../store";

const initialState: IInstituteInitialState = {
    institute: {
        instituteName: " ",
        instituteEmail: " ",
        institutePhoneNumber: " ",
        instituteAddress: " ",
        instituteVatNumber: " ",
        institutePanNumber: " ",
    },
    status: IStatus.LOADING,
};

const intitituteSlice = createSlice({
    name: "Institute",
    initialState: initialState,
    reducers: {
        setInstitute: (state: IInstituteInitialState, action: PayloadAction<IInstituteState>) => {
            state.institute = action.payload;
        },

        setStatus: (state: IInstituteInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setInstitute, setStatus } = intitituteSlice.actions;
export default intitituteSlice.reducer;


//api call
export class APIInstitute {
    static createInstitute(instituteData: IInstituteState) {
        return async function createInstituteThunk(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.post("/api/institute/", instituteData);
                if (response.status === 200 || response.status === 201) {
                    dispatch(setInstitute(response.data.datas));
                    dispatch(setStatus(IStatus.SUCCESS));
                };

                console.log("Institute success creation", response.data.datas);
            } catch (error) {
                console.log("Failed to create institute", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };
};