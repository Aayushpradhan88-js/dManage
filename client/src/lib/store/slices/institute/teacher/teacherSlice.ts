//teacher slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeacherInitialState } from "./instituteTeacherSliceTypes";
import { IStatus } from "../../../global/types/type";
import { APIWithToken } from "../../../global/types/apiCall";
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
        setSelectedTeacher: (state, action: PayloadAction<IteacherDB>) => {
            state.selectedTeacher = action.payload;
        },
    },
});

export const { setTeacher, setLoading } = teacherSlice.actions;
export default teacherSlice.reducer;

//API Call

export class APIInstituteTeacher {
    static getAllTeacher() {
        return async function getAllTeacherThunk(dispatch: AppDispatch) {
            try {
                const response = await APIWithToken.get('/api/institute/teacher/');
                console.log("response", response.data.datas);
                if (response.status === 200 || response.status === 201) {
                    dispatch(setTeacher(response.data.datas));
                    dispatch(setLoading(IStatus.SUCCESS));
                }
            } catch (error) {
                console.log("Internal Server", error);
                dispatch(setLoading(IStatus.ERROR));
            };
        };
    };

    static createTeacher(data: ITeacherForm) {
        return async function createTeacherThunk(dispatch: AppDispatch) {
            try {
                console.log("backend data processing")
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
                };
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
            console.log("api call to backend");
            const response = await APIWithToken.get(`/api/institute/teacher/${id}`);
            if (response.status === 200 || response.status === 201) {
                dispatch(setSelectedteacher(response.data.data[0]));
                dispatch(setLoading(IStatus.SUCCESS));
            };
            console.log("api response goes to component page", response.data);
        };
    };

    //delete , get, getid
};