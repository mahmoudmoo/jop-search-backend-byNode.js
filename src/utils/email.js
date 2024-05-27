import nodemailer from "nodemailer";

export const sendMail = async ({ from = process.env.GMAIL, to,cc,bcc, subject, text, html, attachments } = {}) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD_GMAIL,
        },
    });
    const info = await transporter.sendMail({
        from: `"mohamed ashraf 👻" <${from}>`,
        to,
        cc,
        bcc,
        subject,
        text,
        html,
        attachments
    });
}
