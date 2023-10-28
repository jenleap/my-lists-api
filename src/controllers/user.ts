import prisma from "../db";
import { createJwt, generateResetToken, hashPassword, validatePassword } from "../utils/auth";
import config from '../config';
import { getResetMailOptions, getUserMailOptions, transporter } from "../utils/mailer";

export const createNewUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                username,
                password: await hashPassword(password),
                email
            }
        });

        const mailOptions = getUserMailOptions(email);

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
            } 
        });
    
        const token = createJwt(user);
        return res.json({ token });
    } catch (e) {
        next(e);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: req.body.username
            }
        });

        const isValid = await validatePassword(req.body.password, user.password);

        if (!isValid) {
            res.status(401);
            res.json({
                message: "Username or password is incorrect"
            });
            return res;
        }

        const token = createJwt(user);
        return res.json({ token });
    } catch (e) {
        next(e);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const lists = await prisma.user.findMany({
            select: {
                username: true,
                id: true
            }
        });

        return res.json({ data: lists });
    } catch (e) {
        next(e);
    }
};

export const requestResetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        const resetToken = generateResetToken();

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { resetToken }
        });

        if (updatedUser) {
            const resetLink = `${ config.clientUrl }/reset-password?token=${resetToken}`;
            const mailOptions = getResetMailOptions(email, resetLink);
            
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({ message: 'Failed to send email' });
                } else {
                    res.json({ message: 'Password reset link sent to your email' });
                }
            });

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (e) {
        next(e);
    }
};

export const resetPassword = async (req, res, next) => {
    try {
        const { email, resetToken, newPassword } = req.body;

        const updatedUser = await prisma.user.update({
            where: { email, resetToken },
            data: { 
                password: await hashPassword(newPassword),
                resetToken: null
            }
        });

        if (updatedUser) {
            return res.json({ message: 'Password reset successfully' });
        } else {
            res.status(403).json({ message: 'Invalid reset token or email' });
        }
    } catch (e) {
        next(e);
    }
};

