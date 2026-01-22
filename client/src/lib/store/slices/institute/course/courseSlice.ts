//course slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseCreate, ICourseIntialState } from "./courseSliceTypes";
import { IStatus } from "../../../global/types/type";
import { AppDispatch } from "../../../store";
import { API, APIWithToken } from "../../../global/types/apiCall";

const initialState: ICourseIntialState = {
    data: [],
    status: IStatus.LOADING,
    course: {
        singleCourse: null
    },
};

const courseSlice = createSlice({
    name: "course slice",
    initialState: initialState,
    reducers: {
        setCourse: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
        setLoading: (state: ICourseIntialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
        setDeleteCourse: (state, action: PayloadAction<string>) => {
            const index = state.data.findIndex((course) => {
                const courseId = course.id;
                if (courseId === action.payload) {
                    console.log("getting data");
                    return true;
                } else {
                    console.log("failed to get id");
                };
            });

            if (index !== -1) { //if index value is not equal to -1 
                state.data.splice(index, 1);
            } else {
                console.log("no course found");
            };
        },

        setSingleCourse: (state, action: PayloadAction<null>) => {
            state.course.singleCourse = action.payload;
        },

        setUpdateCourse: (state, action: PayloadAction<null>) => {
            state.course.singleCourse = action.payload;
        },
    },
});

export const { setCourse, setLoading, setDeleteCourse, setSingleCourse } = courseSlice.actions;
export default courseSlice.reducer;

//API Call

export class APICourse {
    //get
    static getAllInstituteCourses() {
        return async function getAllInstituteCoursesThunk(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.get("/api/institute/course",);
                if (response.status === 200) {
                    if (response.data.data.length > 0) {
                        dispatch(setCourse(response.data));
                        dispatch(setLoading(IStatus.SUCCESS));
                    };
                };
            } catch (error) {
                console.error("api institute teacher error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //create
    static createInstituteCourse(data: ICourseCreate) {
        return async function createInstituteCourseThunk(dispatch: AppDispatch) {
            console.log("loading course category");
            try {
                const response = await APIWithToken.post("/api/institute/course", data);
                if (response.status === 201) {
                    dispatch(setCourse(response.data));
                    dispatch(APICourse.getAllInstituteCourses())
                    dispatch(setLoading(IStatus.SUCCESS));
                };
                console.log("success create course");
            } catch (error) {
                console.error("api course error creation", error);
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

    //single course
    static getSingleInstituteCourse(id: string) {
        return async function getSingleInstituteCourseThunk(dispatch: AppDispatch) {
            const response = await API.get(`/api/institute/course/${id}`);
            if (response.status === 200) {
                dispatch(setLoading(IStatus.SUCCESS));
                dispatch(setSingleCourse(response.data));
            };
        };
    };

    static updateSingleInstituteCourse(id: string) {
        return async function updateSingleInstituteCourse(dispatch: AppDispatch) {
            try {
                const response = await API.post(`/api/institute/course/update/${id}`);
                if (response.status === 200) {
                    dispatch(setLoading(IStatus.SUCCESS));
                    // dispatch()
                }
            } catch (error) {
                console.error("failed to update data, Server error", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };
};