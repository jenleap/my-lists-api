import prisma from "../db";

export const createInvite = async (req, res) => {
    const invite = await prisma.invite.create({
        data: {
            listId: req.body.listId,
            userId: req.body.userId,
            note: req.body.note
        }
    });

    return res.json({ data: invite });
};

export const getInvites = async (req, res) => {
    const invites = await prisma.invite.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            list: true
        }
    });

    return res.json({ data: invites });
};

export const confirmInvite = async (req, res) => {
    if (req.body.accept === true) {
        const invite = await prisma.invite.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                list: true,
            }
        });

        const usersOnLists = await prisma.usersOnLists.create({
            data: {
                userId: req.user.id,
                listId: invite.listId
            }
        });
        
        res.json({ data: invite.list });
    }

    const deletedInvite = await prisma.invite.delete({
        where: {
            id: req.params.id,
            userId: req.user.id
        },
        include: {
                list: true
        }
    });
    
    return res.status(201);
}

