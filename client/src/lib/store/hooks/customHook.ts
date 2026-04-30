import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store"

//For components 

//For fetching data
const useAppDispatch = useDispatch.withTypes<AppDispatch>() //useDispatch + types = custom hook
//For reading data
const useAppSelector = useSelector.withTypes<RootState>()

export { useAppDispatch, useAppSelector }