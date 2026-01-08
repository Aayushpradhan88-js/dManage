//teacher slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ITeacherInitialState, ITeacherState } from "./teacherSliceTypes"
import { IStatus } from "../../global/types/type"

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
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: ""
    },
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