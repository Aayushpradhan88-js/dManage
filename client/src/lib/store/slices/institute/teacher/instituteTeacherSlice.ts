//teacher slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherInitialState, ITeacherState } from "./instituteTeacherSliceTypes";
import { IStatus } from "../../../global/types/type";
import {API} from "../../../global/types/apiCall";
import { AppDispatch } from "../../../store";

const initialState: ITeacherInitialState = {
    teacher: {
        teacherName: "",
        teacherEmail: "",
        teacherPassword: "",
        teacherPhoneNumber: "",
        teacherExperience: "",
        joinedDate: "",
        salary: "",
        teacherPhoto: "",
        course: ""
    },
    status: IStatus.LOADING,
};

const teacherSlice = createSlice({
    name: "teacher Slice",
    initialState: initialState,
    reducers: {
        setTeacher: (state: ITeacherInitialState, action: PayloadAction<ITeacherState>) => {
            state.teacher = action.payload;
        },
        setLoading: (state: ITeacherInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setTeacher, setLoading } = teacherSlice.actions;
export default teacherSlice.reducer;

//API Call

export class APIInstituteTeacher {
    static createTeacher(data: ITeacherState) {
        return async function createTeacherThunk(dispatch: AppDispatch) {
            try {
                const response = await API.post("/api/institute/teacher", data);
                if (response.status === 201) {
                    dispatch(setLoading(IStatus.SUCCESS));
                };
            } catch (error) {
                console.error("api institute teacher error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //delete , get, getid
};