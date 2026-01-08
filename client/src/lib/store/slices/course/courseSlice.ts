//course slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseIntialState, ICourseState } from "./courseSliceTypes";
import { IStatus } from "../../global/types/type";

const initialState: ICourseIntialState = {
    course: {
        courseName: "",
        courseDescription: "",
        coursePrice: "",
        courseDuration: "",
        courseThumbnail: "",
        courseInstructor: "",
        courseSyllabus: "",
        courseLevel: "",
        courseTeacher: ""
    },
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: ""
    },
};

const courseSlice = createSlice({
    name: "course slice",
    initialState: initialState,
    reducers: {
        setStudent: (state: ICourseIntialState, action: PayloadAction<ICourseState>) => {
            state.course = action.payload;
        },
        setLoading: (state: ICourseIntialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setStudent, setLoading } = courseSlice.actions;
export default courseSlice.reducer;