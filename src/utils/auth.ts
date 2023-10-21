import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
const crypto = require('crypto');

export const validatePassword = (password, hashedPass) => {
    return bcrypt.compare(password, hashedPass);
};

export const hashPassword = (password) => {
    return bcrypt.hash(password, 5);
}

export const createJwt = (user) => {
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, config.jwtSecret);
    return token;
};

export const authenticateUser = (req, res, next) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        return sendUnauthorized(res);
    }

    const [, token] = bearer.split(' ');

    if (!token) {
        return sendUnauthorized(res);
    }

    try {
        const user = jwt.verify(token, config.jwtSecret);
        req.user = user;
        next();
    } catch (e) {
        console.log(e);
        return sendUnauthorized(res);
    }
};

export const generateResetToken = () => {
    return crypto.randomBytes(20).toString('hex');
}

export const sendUnauthorized = (res) => {
    res.status(401);
    res.json({
        message: "Not authorized"
    });
    return res;
} 