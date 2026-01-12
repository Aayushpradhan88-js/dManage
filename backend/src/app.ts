import express from 'express';
import authRouter from './modules/global/auth/authRouter';
import cors from 'cors'
import instituteRouter from './modules/features/institute/instituteRoutes';
import instituteCourseRouter from './modules/features/institute/course/courseRoutes';
import instituteCategoryRoute from './modules/features/institute/category/categoryRoute';
import instituteTeacherRouter from './modules/features/institute/teacher/teacherRoutes';
import teacherLoginRoute from './modules/features/teacher/teacherRoute';
const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials:true,
    methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// console.log("✅ step: AUTH ROUTER TRIGGERED")
app.use("/api/auth", authRouter, teacherLoginRoute);

// console.log("✅ step: INSTITUTE ROUTER TRIGGERED")
app.use("/api/institute", instituteRouter);

// console.log("✅ step: COURSE ROUTER TRIGGERED")
app.use("/api/institute/course", instituteCourseRouter);

// console.log("✅ step: CATEGORY ROUTER TRIGGERED")
app.use("/api/institute/category", instituteCategoryRoute);

// console.log("✅ step: TEACHER ROUTER TRIGGERED")
app.use("/api/institute/teacher", instituteTeacherRouter);

export default app;