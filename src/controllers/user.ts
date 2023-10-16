import prisma from "../db";
import { createJwt, hashPassword, validatePassword } from "../utils/auth";

export const createNewUser = async (req, res) => {
    const user = await prisma.user.create({
        data: {
            username: req.body.username,
            password: await hashPassword(req.body.password)
        }
    });

    const token = createJwt(user);
    return res.json({ token });
};

export const signIn = async (req, res) => {
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
};