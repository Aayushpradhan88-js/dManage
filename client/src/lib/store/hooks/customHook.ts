import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { RootState } from "@reduxjs/toolkit/query";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useApppSelector = useSelector.withTypes<RootState>();

export {useAppDispatch,useApppSelector}