import config from '../config';
import nodemailer from 'nodemailer';
import sendgridTransport from "nodemailer-sendgrid-transport";

export const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: config.mailerKey
    }
}));

export const getResetMailOptions = (email, resetLink) => {
    return {
        from: config.sender,
        to: email,
        subject: 'Password Reset',
        text: `To reset your password, click the following link: ${resetLink}`,
}};

export const getUserMailOptions = (email) => {
    return {
        from: config.sender,
        to: email,
        subject: 'Welcome to My Lists!',
        text: 'You have created a new user at My Lists.',
}};