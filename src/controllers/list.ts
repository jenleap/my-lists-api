import prisma from "../db";
import { sendUnauthorized } from "../utils/auth";

export const getLists = async (req, res) => {
    const lists = await prisma.usersOnLists.findMany({
        select: {
            list: true
        },
        where: {
            userId: req.user.id
        }
    });

    return res.json({ data: lists });
};

export const getList = async (req, res) => {
    const listId = req.params.id;
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
        return res.json({ data: list});
    } else {
        return sendUnauthorized(res);
    }
};

export const createList = async (req, res) => {
    const list = await prisma.list.create({
        data: {
            name: req.body.name,
            ownerId: req.user.id
        }
    });

    const usersOnLists = await prisma.usersOnLists.create({
        data: {
            userId: req.user.id,
            listId: list.id
        }
    });

    return res.json({ data: list })
};

export const updateList = async (req, res) => {
    const updatedList = await prisma.list.update({
        where: {
            id: req.params.id,
            ownerId: req.user.id
        },
        data: {
            name: req.body.name
        }
    });

    return res.json({ data: updateList });
};

export const deleteList = async (req, res) => {
    const deletedList = await prisma.list.delete({
        where: {
            id: req.params.id,
            ownerId: req.user.id
        }
    });

    return res.json({ data: deletedList });
};


