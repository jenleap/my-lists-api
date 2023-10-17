import { validationResult } from "express-validator";
import prisma from "../db";
import { sendUnauthorized } from "./auth";

export const handleInputErrors = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400);
        res.json({ errors: errors.array() });
    } else {
        next();
    }
}

export const checkUserAuthorizedOnList = async (req, res, next) => {
    const listId = req.params.listId;
    const list = await prisma.list.findUnique({
        where: {
            id: listId
        },
        include: {
            items: true,
            authorizedUsers: true
        }
    });

    const authorizedList = list.authorizedUsers.map(au => au.userId);

    if (authorizedList.includes(req.user.id)) {
        return next();
    } else {
        return sendUnauthorized(res);
    }
}