//custom hook

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //useDispatch + types = custom hook
const useApppSelector = useSelector.withTypes<RootState>();

export {useAppDispatch,useApppSelector}