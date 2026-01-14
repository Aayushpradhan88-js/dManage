import { Request, Response } from 'express'
import { User } from '../../../database/models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRY } from '../../../config/env';

class AuthController {
    //register
    static async registerUser(req: Request, res: Response) {
        // console.log("📥 Register request received");
        console.log("📥 Body:", req.body);
        // console.log("📥 Headers:", req.headers);

        if (req.body === undefined) {
            return res.status(400).json({
                message: "No data found!!"
            });
        };

        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                message: "Fill all the required fields"
            });
        };
        // console.log(username, email, password);

        const hashedPassword = await bcrypt.hash(password, 12);
        // console.log("hashing password", hashedPassword);

        const data = await User.create({
            username,
            email,
            password: hashedPassword
        });

        console.log("registration success");
        return res.status(200).json({
            datas: {
                username,
                email
            },
            message: "user successfully registered"
        });
    };

    //login 
    static async loginUser(req: Request, res: Response) {
        console.log("Data", req.body);

        if (req.body === undefined) {
            return res.status(400).json({
                message: "no data"
            })
        };

        const { email, password } = req.body; //object destructuring from body
        if (!email || !password) {
            return res.status(401).json({
                message: "All fields are required!"
            });
        };

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        if (!user.password) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };

        const isComparedPassword = await bcrypt.compare(password, user.password);
        if (!isComparedPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        };


        //JWT token generation
        const token = jwt.sign(
            { id: user.id }, //userid to token
            JWT_SECRET, //jwt secret
            { expiresIn: JWT_EXPIRY } //token expiration
        );

        // console.log('JWT_SECRET:', JWT_SECRET);
        // console.log('JWT_EXPIRY:', JWT_EXPIRY);
        console.log('logged in success');

        return res.status(200).json({
            datas: {
                user: user.email,
                token
            },
            message: "User loggedin successfully!!"
        });
    };
};

export default AuthController;