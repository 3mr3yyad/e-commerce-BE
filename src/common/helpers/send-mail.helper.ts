import * as nodemailer from 'nodemailer';

export async function sendMail(mailOptions: nodemailer.SendMailOptions) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    await transporter.sendMail(mailOptions);
}