import { Request } from "express"
import nodemailer from "nodemailer"

class MailService{
    static async sendMail(req:Request, res:Response){
        const transporter = nodemailer.createTransport({

        })
    }
}

export default MailService