//course slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourseDB, ICourseState } from "./courseSliceTypes";
import { IStatus } from "../../../global/types/type";
import { AppDispatch } from "../../../store";
import {  APIWithToken } from "../../../global/types/apiCall";
import { ICourseFormData } from "@/src/lib/components/dashboard/course/add/courseCreationTypes";
import { ICourseEditModal, IEditModal } from "@/src/lib/components/dashboard/course/sidebar/courseSidebarTypes";

const courseInitialState: ICourseState = {
    data: [],
    selectedCourse: null,
    status: IStatus.LOADING
};

const courseSlice = createSlice({
    name: "course slice",
    initialState: courseInitialState,
    reducers: {
        setCourse: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
        setLoading: (state, action: PayloadAction<IStatus>) => {
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
        setSelectedCourse: (state, action: PayloadAction<ICourseDB>) => {
            state.selectedCourse = action.payload;
        },
        setUpdateCourse: (state, action: PayloadAction<null>) => {
            state.selectedCourse = action.payload;
        },
    },
});

export const { setCourse, setLoading, setDeleteCourse, setSelectedCourse, setUpdateCourse } = courseSlice.actions;
export default courseSlice.reducer;

//API Call
export class APICourse {
    //get
    static getAllInstituteCourses() {
        return async function getAllInstituteCoursesThunk(dispatch: AppDispatch) {
            try {
                console.log("get triggered");
                const response = await APIWithToken.get("/api/institute/course");
                if (response.status === 200 || response.status === 201) {
                    if (response.data.datas || response.data.datas.length > 0) {
                        dispatch(setCourse(response.data.datas));  //api data is stored in data state [{}, {}]
                        console.log(response.data.datas);
                        dispatch(setLoading(IStatus.SUCCESS));
                    };
                };

                console.log("success course fetched");
            } catch (error) {
                console.error("api institute teacher error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //create
    static createInstituteCourse(data: ICourseFormData) { //form data
        return async function createInstituteCourseThunk(dispatch: AppDispatch) {
            console.log("loading course category");
            try {
                const response = await APIWithToken.post("/api/institute/course", data, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }) //saved in db
                if (response.status === 200 || response.status === 201) {
                    // dispatch(setCourse(response.data.datas));
                    await dispatch(APICourse.getAllInstituteCourses()); //re-fetching updated db and update in state [{}, {}, {}]
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
            console.log("triggered");
            const response = await APIWithToken.delete(`/api/institute/course/${id}`);
            if (response.status === 200) {
                dispatch(setLoading(IStatus.SUCCESS));
                dispatch(setDeleteCourse(id));
            };
        };
    };

    //single course
    static getSingleInstituteCourse(id: string) {
        return async function getSingleInstituteCourseThunk(dispatch: AppDispatch) {
            console.log("api call to backend");
            const response = await APIWithToken.get(`/api/institute/course/${id}`);
            if (response.status === 200 || response.status === 201) {
                dispatch(setSelectedCourse(response.data.data[0]));
                dispatch(setLoading(IStatus.SUCCESS));
            };
            console.log("api response goes to component page", response.data);
        };
    };

    //update course
    static updateSingleInstituteCourse(id: string, data: ICourseEditModal) {
        return async function updateSingleInstituteCourse(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.post(`/api/institute/course/update/${id}`, data,
                    {
                        headers: {
                            "Content-Type" : "multipart/form-data"
                        }
                    }
                );
                if (response.status === 200) {
                    dispatch(APICourse.getAllInstituteCourses());
                    dispatch(setLoading(IStatus.SUCCESS));
                }
            } catch (error) {
                console.error("failed to update data, Server error", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };
};