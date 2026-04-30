//teacher slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherInitialState, ITeacherState } from "./instituteTeacherSliceTypes";
import { IStatus } from "../../../global/types/type";
import { APIWithToken } from "../../../global/API/apiCall";
import { AppDispatch } from "../../../store";
import { ITeacherForm } from "@/src/lib/components/dashboard/teacher/add/teacherCreationModalTypes";

const teacherInitialState: ITeacherInitialState = {
    data: [],
    selectedTeacher: null,
    status: IStatus.LOADING,
};

const teacherSlice = createSlice({
    name: "teacher Slice",
    initialState: teacherInitialState,
    reducers: {
        setTeacher: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
        },
        setLoading: (state: ITeacherInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
        setSelectedTeacher: (state, action: PayloadAction<ITeacherState>) => {
            state.selectedTeacher = action.payload;
        },
        setDeleteTeacher: (state, action: PayloadAction<string>) => {
            const index = state.data.findIndex((teacher) => {
                const teacherId = teacher.id;
                if (teacherId === action.payload) {
                    console.log("getting data");
                    return true;
                } else {
                    console.log("failed to get id");
                };
            });

            if (index !== -1) { //if index value is not equal to -1 
                state.data.splice(index, 1);
            } else {
                console.log("no teacher found");
            };
        },
    },
});

export const { setTeacher, setLoading, setSelectedTeacher, setDeleteTeacher } = teacherSlice.actions;
export default teacherSlice.reducer;

//API Call

export class APIInstituteTeacher {
    //get all teacher
    static getAllTeacher() {
        return async function getAllTeacherThunk(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.get('/api/institute/teacher/');
                console.log("response", response.data.datas);
                if (response.status === 200 || response.status === 201) {
                    if (response.data.datas || response.data.datas.length > 0) {
                        dispatch(setTeacher(response.data.datas));
                        dispatch(setLoading(IStatus.SUCCESS));
                    }
                } else {
                    dispatch(setLoading(IStatus.ERROR));
                };
            } catch (error) {
                console.log("Internal Server", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //create teacher
    static createTeacher(data: ITeacherForm) {
        return async function createTeacherThunk(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.post("/api/institute/teacher/create", data,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    }
                );
                if (response.status === 201) {
                    await dispatch(APIInstituteTeacher.getAllTeacher())
                    dispatch(setLoading(IStatus.SUCCESS));
                    return {
                        success: true,
                        data: response.data,
                    };
                };
                // console.log("backend data processing", response.data)
                // console.log("backend data processing", response.data.datas)
                console.log("backend data processing done")
            } catch (error) {
                console.error("api institute teacher error creation", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    //single teacher
    static getSingleInstituteteacher(id: string) {
        return async function getSingleInstituteteacherThunk(dispatch: AppDispatch) {
            // console.log("api call to backend");
            const response = await APIWithToken.get(`/api/institute/teacher/${id}`);
            if (response.status === 200 || response.status === 201) {
                dispatch(setSelectedTeacher(response.data.data[0]));
                dispatch(setLoading(IStatus.SUCCESS));
            };
            console.log("api response goes to component page", response.data);
        };
    };


    static deleteSingleInstituteTeacher(id: string) {
        return async function deleteSingleInstituteTeacher(dispatch: AppDispatch) {
            console.log("triggered");
            const response = await APIWithToken.delete(`/api/institute/teacher/${id}`);
            if (response.status === 200) {
                dispatch(setDeleteTeacher(id));
                dispatch(setLoading(IStatus.SUCCESS));
            };
        };
    };

    //delete , get, getid
};