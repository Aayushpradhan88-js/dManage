//Institute Slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IInstituteInitialState, IInstituteState } from "./instituteSliceTypes"
import { IStatus } from "../../global/types/type";
import { APIWithToken } from "../../global/API/apiCall";
import { AppDispatch } from "../../store";

const initialState: IInstituteInitialState = {
    institute: {
        instituteName: "",
        instituteEmail: "",
        institutePhoneNumber: "",
        institutePhoneCountry: "NP",
        instituteAddress: "",
        instituteVatNumber: "",
        institutePanNumber: "",
    },
    status: IStatus.IDLE,
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
            dispatch(setStatus(IStatus.LOADING));

            try {
                const response = await APIWithToken.post("/api/institute/institute-creation", instituteData)
                console.log("data backend", response)
                if (response.status === 200 || response.status === 201) {
                    dispatch(setInstitute(instituteData));
                    dispatch(setStatus(IStatus.SUCCESS));
                    return true;
                };

                dispatch(setStatus(IStatus.ERROR));
                return false;
            } catch (error) {
                console.log("Failed to create institute", error);
                dispatch(setStatus(IStatus.ERROR));
                return false;
            };
        };
    };
};
