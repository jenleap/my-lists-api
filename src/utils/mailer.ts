import config from '../config';
import nodemailer from 'nodemailer';
import sendgridTransport from "nodemailer-sendgrid-transport";

export const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.mailerKey
    }
}));

export const getMailOptions = (email, resetLink) => {
    return {
        from: 'your@email.com',
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, click the following link: ${resetLink}`,
}};