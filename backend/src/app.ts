import express, { NextFunction, Request, Response } from 'express';
import authRouter from './modules/global/auth/authRouter';
import cors from 'cors'
import instituteRouter from './modules/features/institute/instituteRoutes';
import instituteCourseRouter from './modules/features/institute/course/courseRoutes';
import instituteCategoryRoute from './modules/features/institute/category/categoryRoute';
import instituteTeacherRouter from './modules/features/institute/teacher/teacherRoutes';
import teacherLoginRoute from './modules/features/teacher/teacherRoute';
const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("✅ 8 Frontend request",
        req.headers.origin
    );

    console.log("Incomming Request..............");
    // console.log(`${req.method} ${req.originalUrl}`);
    // console.log('Headers: ', req.headers);
    // console.log('Body: ', `${req.baseUrl} ${req.body}`);
    // console.log('Query:', req.query);
    
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// console.log("✅ step:9 AUTH ROUTER TRIGGERED")
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