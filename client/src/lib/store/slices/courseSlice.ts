//1. Context setting 

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
        setList: (state, action: PayloadAction<[]>) => {
            state.list = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

const course = courseSlice.actions;

export {course};
export default courseSlice.reducer;