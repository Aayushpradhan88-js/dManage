//Course Slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICourse {
    id: string | number;
    title: string | null;
    description: string | null;
    price: number;
    courseInstructor: string;
};

interface ICourseState {
    list: ICourse[];
    loading: boolean;
};

const initialState: ICourseState = {
    list: [],
    loading: false
};

const courseSlice = createSlice({
    name: "Course",
    initialState: initialState,
    reducers: {
        setList: (state, action: PayloadAction<ICourse[]>) => {
            state.list = action.payload;
        },
        addCourse: (state, action: PayloadAction<ICourse>) => {
            state.list.push(action.payload);
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

const { setList, addCourse, setLoading } = courseSlice.actions;

export { setList, addCourse, setLoading }; //dispatch ma use hunxa
export default courseSlice.reducer; //yo store ma use hunxa