//category slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus } from "../../../global/types/type";
import { ICategoryInitialState, ICategoryState } from "./categorySliceTypes";

const initialState: ICategoryInitialState = {
    category: {
        categoryName: "",
        categoryDescription: "",
    },
    status: IStatus.LOADING,
};

const categorySlice = createSlice({
    name: "category slice",
    initialState: initialState,
    reducers: {
        setCategory: (state: ICategoryInitialState, action: PayloadAction<ICategoryState>) => {
            state.category = action.payload;
        },
        setLoading: (state: ICategoryInitialState, action: PayloadAction<IStatus>) => {
            state.status = action.payload;
        },
    },
});

export const { setCategory, setLoading } = categorySlice.actions;
export default categorySlice.reducer;