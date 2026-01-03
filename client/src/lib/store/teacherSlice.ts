import { createSlice } from "@reduxjs/toolkit"

createSlice({
    name: "teacher Slice",
    initialState: {
        teacherName: "",
        teacherEmail: "",
        teacherPassword: "",
        teacherPhoneNumber: "",
        teacherExperience: "",
        joinedDate: "",
        salary: "",
        teacherPhoto: "",
        course: ""
    },
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