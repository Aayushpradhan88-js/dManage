import nodemailer from "nodemailer"
import { NODEMAILER_GMAIL, NODEMAILER_GMAIL_APP_PASSWORD } from "../../../config/env"
import GlobalErrorHandler from "./asyncErrorHandler";

interface IMailInfo {
    to: string,
    subject: string,
    text: string
}

class MailService {
    static async sendMail(mailInformation: IMailInfo) {

        console.log("✅transportation triggered")
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: NODEMAILER_GMAIL,
                pass: NODEMAILER_GMAIL_APP_PASSWORD
            }
        });

        const mailFormatObject = {
            from: "Ed-Tech <aayushpradhan789@gmail.com> ",
            to: mailInformation.to,
            subject: mailInformation.subject,
            text: mailInformation.text
        };

        try {
            await transporter.sendMail(mailFormatObject);
        } catch (error) {
           console.error("Email send failed:", error);
        };
    };
};

export default MailService;