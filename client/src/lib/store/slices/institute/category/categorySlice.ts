//category slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus } from "../../../global/types/type";
import { ICategoryInitialState, ICategoryStateData, ICategoryStateAdditionalData } from "./categorySliceTypes";
import { AppDispatch } from "../../../store";
import { APIWithToken } from "../../../global/types/apiCall";
import { setStatus } from "../instituteSlice";

const initialState: ICategoryInitialState = {
    data: [],
    status: IStatus.LOADING,
};

const categorySlice = createSlice({
    name: "category slice",
    initialState: initialState,
    reducers: {
        setAddCategory: (state: ICategoryInitialState, action: PayloadAction<ICategoryStateAdditionalData[]>) => {
            state.data = action.payload.sort((a: ICategoryStateAdditionalData, b: ICategoryStateAdditionalData) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            });
        },

        setDeleteCategory: (state: ICategoryInitialState, action: PayloadAction<string>) => {
            const categoryId = action?.payload;
            const categoryIndex = state.data.findIndex((category) => category?.id === categoryId);
            if (categoryIndex !== -1) {
                state.data.slice(categoryIndex, 1);
            };
            return console.log("Unable to delete category, try again");
        },

        setLoading: (state: ICategoryInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setAddCategory, setLoading, setDeleteCategory } = categorySlice.actions;
export default categorySlice.reducer;

export class APICategory {
    //fetch all category
    static fetchAllCategory() {
        return async function fetchAllCategoryThunk(dispatch: AppDispatch) {
            console.log("loading data fetching all category");
            try {
                const response = await APIWithToken.get("/api/institute/category");
                if (response.data.datas.length > 0) {
                    console.log("response1", response);
                    console.log("response2", response.data);
                    console.log("response3", response.data.datas);
                    console.log("response4", response.data.datas.length);
                }
                if (response.status === 200 || response.status === 201) {
                    if (response.data.datas || response.data.datas.length > 0) {
                        dispatch(setAddCategory(response.data.datas));
                        dispatch(setStatus(IStatus.SUCCESS));
                        console.log("success data fetching");
                    };
                } else {
                    dispatch(setStatus(IStatus.ERROR));
                };
            } catch (error) {
                console.log("error data fetching all category", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };

    // createCategory
    static createCategory(data: ICategoryStateData) {
        return async function createCategoryThunk(dispatch: AppDispatch) {
            console.log("loading create category");
            try {
                const response = await APIWithToken.post("/api/institute/category/create-category", data);
                if (response.status === 200 || response.status === 201) {
                    await dispatch(APICategory.fetchAllCategory());
                    dispatch(setStatus(IStatus.SUCCESS));

                    return {
                        success: true,
                        data: response.data,
                    };
                };
                console.log("success create category");
            } catch (error) {
                console.log("error create category", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };

    // updateSingleCategory
    static updateSingleCategory(id: string, data: ICategoryStateData) {
        return async function updateSingleCategoryThunk(dispatch: AppDispatch) {
            console.log("loading update category with id");
            try {
                const response = await APIWithToken.post(`/api/institute/category/${id}`, data)
                if (response.status === 200 || response.status === 201) {
                    await dispatch(APICategory.fetchAllCategory());
                    dispatch(setStatus(IStatus.SUCCESS))
                };
                console.log("success update category with id");
            } catch (error) {
                console.log("error update category with id", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };

    // getSingleCategory
    static fetchGetSingleCategory(id: string) {
        return async function fetchGetSingleCategoryThunk(dispatch: AppDispatch) {
            console.log("loading single category data");
            try {
                const response = await APIWithToken.get(`/api/institute/category/${id}`)
                if (response.status === 200 || response.status === 201) {
                    dispatch(setAddCategory(response.data.data));
                    dispatch(setStatus(IStatus.SUCCESS))
                };
                console.log("success fetching single category data");
            } catch (error) {
                console.log("error fetching single category data", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };

    // deleteSingleCategory
    static deleteSingleCategory(id: string) {
        return async function deleteSingleCategoryThunk(dispatch: AppDispatch) {
            console.log("loading delete data");
            try {
                const response = await APIWithToken.delete(`/api/institute/category/${id}`)
                if (response.status === 200 || response.status === 201) {
                    await dispatch(APICategory.fetchAllCategory());
                    dispatch(setStatus(IStatus.SUCCESS));
                    return {
                        success: true,
                    }
                };
                console.log("success delete data");
            } catch (error) {
                console.log("error delete data", error);
                dispatch(setStatus(IStatus.ERROR));
            };
        };
    };
};