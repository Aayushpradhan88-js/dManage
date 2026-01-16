//custom hook

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

//For components 
const useAppDispatch = useDispatch.withTypes<AppDispatch>(); //useDispatch + types = custom hook
const useAppSelector = useSelector.withTypes<RootState>();

export {useAppDispatch,useAppSelector};