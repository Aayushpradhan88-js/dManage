//course slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseIntialState } from "./courseSliceTypes";
import { IStatus } from "../../../global/types/type";
import { AppDispatch } from "../../../store";
import API from "../../../global/types/apiCall";
import { setDefaultAutoSelectFamilyAttemptTimeout } from "net";

const initialState: ICourseIntialState = {
    courses: [],
    status: IStatus.LOADING
};

const courseSlice = createSlice({
    name: "course slice",
    initialState: initialState,
    reducers: {
        setCourse: (state, action: PayloadAction<any>) => {
            state.courses = action.payload;
        },
        setLoading: (state: ICourseIntialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
        setDeleteCourse: (state, action: PayloadAction<string>) => {
            const index = state.courses.findIndex((course) => {
                const courseId = course.id;
                if (courseId === action.payload) {
                    return console.log("getting data");
                } else {
                    return console.log("failed to get id");
                };
            });

            if (index !== -1) { //if index value is not equal to -1 
                state.courses.splice(index, 1);
            } else {
                console.log("no course found");
            };
        },

        setSingleCourse: (state, action: PayloadAction<string>) => {
            const index = state.courses.findIndex((course) => {
                const courseId = course.id;
                if (courseId === action.payload) {
                    return console.log("getting data");
                } else {
                    return console.log("failed to get id");
                };
            });

            if (index !== -1) {
                state.courses.splice(index);
            } else {
                console.log("no course found")
            };
        },
    },
});

export const { setCourse, setLoading, setDeleteCourse, setSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;

//API Call

export class APICourseSlice {
    //create
    static createInstituteCourse(courseData: ICourseState) {
        return async function createInstituteCourseThunk(dispatch: AppDispatch) {
            try {
                const response = await API.post("/api/institute/course", courseData);
                if (response.status === 201) {
                    dispatch(setLoading(IStatus.SUCCESS));
                };
            } catch (error) {
                console.error("api course error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //get
    static getAllInstituteCourses(courseData: string) {
        return async function getAllInstituteCoursesThunk(dispatch: AppDispatch) {
            try {
                const response = await API.get("/api/institute/course", courseData);
                if (response.status === 200) {
                    dispatch(setLoading(IStatus.SUCCESS));
                    response.data.data.length > 0 && dispatch(setCourse(response.data));
                };
            } catch (error) {
                console.error("api institute teacher error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    // delete
    static deleteSingleInstituteCourse(id: string) {
        return async function deleteSingleInstituteCourse(dispatch: AppDispatch) {
            const response = await API.delete(`/api/institute/course/${id}`);
            if (response.status === 200) {
                dispatch(setLoading(IStatus.SUCCESS));
                dispatch(setDeleteCourse(id));
            };
        };
    };

    static getSingeInstituteCourse(id: string) {
        return async function getSingleInstituteCourseThunk(dispatch: AppDispatch) {
            const response = await API.get(`/api/institute/course/${id}`);
            if (response.status === 200)
        }
    }





    static getSingleInstituteCourse(courseData) {

    }
};