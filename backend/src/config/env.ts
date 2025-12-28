//CONFIGURATION FILE

import { config } from "dotenv"
config();

const SERVER_PORT = parseInt(process.env.PORT || '6000')
const DB_NAME = process.env.DB_NAME as string
const DB_USERNAME = process.env.DB_USERNAME as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_HOST = process.env.DB_HOST as string
const DB_PORT = Number(process.env.DB_PORT) || 3306
const JWT_SECRET = process.env.JWT_SECRET! as string
const JWT_EXPIRY = process.env.JWT_EXPIRY || '5d'
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME as string
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY as string
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET as string
const NODEMAILER_GMAIL = process.env.NODEMAILER_GMAIL
const NODEMAILER_GMAIL_APP_PASSWORD = process.env.NODEMAILER_GMAIL_APP_PASSWORD

export {
    SERVER_PORT,
    DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT,
    JWT_SECRET, JWT_EXPIRY,
    CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET,
    NODEMAILER_GMAIL,NODEMAILER_GMAIL_APP_PASSWORD
}