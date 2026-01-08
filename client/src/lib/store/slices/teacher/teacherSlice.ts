//teacher slice

import { createSlice } from "@reduxjs/toolkit"


const teacherSlice = createSlice({
    name: "teacher Slice",
    initialState: ,
    reducers:{
        setTeacherName(state, action){
            state.teacherName = "Manish Basnet"
        },
        setTeacherEmail(state, action){
            state.teacherEmail = "manish@gmail.com"
        },
        setTeacherPassword(state, action){
            state.teacherPassword = "manish12345"
        },
        setTeacherPhoneNumber(state, action){
            state.teacherPhoneNumber = "9999999999"
        }
    }
});

const {setTeacherEmail,setTeacherName,setTeacherPassword,setTeacherPhoneNumber} = teacherSlice.actions 
setTeacherName();
setTeacherEmail()
setTeacherPassword();
setTeacherPhoneNumber();