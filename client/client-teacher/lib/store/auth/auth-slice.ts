import { IStatus } from "@/lib/global/types/types"
import { IInitialTeacherAuth, ITeacherAuth, ITeacherLogin } from "./auth-type"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { teacherAPI } from "@/lib/global/api/teacherApiCall"
import { AppDispatch } from "../store"

const initialTeacherAuthState: IInitialTeacherAuth = {
    data: [],
    status: IStatus.LOADING
};

const teacherAuthSlice = createSlice({
    name: "teacherAuthSlice",
    initialState: initialTeacherAuthState,
    reducers: {
        setTeacher: (state, action: PayloadAction<ITeacherAuth[]>) => {
            state.data = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setTeacher, setStatus } = teacherAuthSlice.actions;
export default teacherAuthSlice.reducer;

export class APITeacherAuth {
    static teacherLogin(teacherFormData: ITeacherLogin) {
        return async function teacherLoginThunk(dispatch: AppDispatch) {
            try {
                console.log("triggered teacher login");
                const response = await teacherAPI.post('/api/teacher/login', teacherFormData);
                console.log("data", response.data.datas);
                if (response.status === 200 || response.status === 201) {
                    dispatch(setTeacher(response.data.datas));
                    dispatch(setStatus(IStatus.SUCCESS));
                } else {
                    dispatch(setStatus(IStatus.ERROR));                    
                }
            } catch (error) {
                console.log("error", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };
};