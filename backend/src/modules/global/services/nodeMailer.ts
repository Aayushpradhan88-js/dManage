import nodemailer from "nodemailer"
import { NODEMAILER_GMAIL, NODEMAILER_GMAIL_APP_PASSWORD } from "../../../config/env"
import GlobalErrorHandler from "./asyncErrorHandler";

interface IMailInfo {
    to: String,
    subject: String,
    text: String
}

class MailService {
    static sendMail = GlobalErrorHandler.asyncErrorHandler(
        async (mailInformation: IMailInfo) => {
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: NODEMAILER_GMAIL,
                    pass: NODEMAILER_GMAIL_APP_PASSWORD
                }
            });

            const mailFormatObject = ({
                from: "Ed-Tech <aayushpradhan789@gmail.com> ",
                to: "",
                subject: "",
                text: ""
            });

            await transporter.sendMail(mailFormatObject);
        }
    );
};

export default MailService;