import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStudentInitialState, IStudentState } from "./studentSliceTypes";
import { IStatus } from "../../global/types/type";

const initialState: IStudentInitialState = {
    student: {
        studentName: "",
        studentPhoneNo: "",
        studentAddress: "",
        enrolledDate: "",
        studentImage: "",
        course: "",
    },
    status: {
        SUCCESS: "",
        LOADING: "",
        ERROR: "",
    },
};

const studentSlice = createSlice({
    name: "student slice",
    initialState: initialState,
    reducers: {
        setStudent: (state: IStudentInitialState, action: PayloadAction<IStudentState>) => {
            state.student = action.payload;
        },
        setLoading: (state: IStudentInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setStudent, setLoading } = studentSlice.actions;
export default studentSlice.reducer;