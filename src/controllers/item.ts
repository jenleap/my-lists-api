import prisma from "../db";

export const createItem = async (req, res, next) => {
    try {
        const item = await prisma.item.create({
            data: {
                label: req.body.label,
                listId: req.body.listId,
                checked: false
            }
        });
        
        return res.json({ data: item });
    } catch (e) {
        next(e);
    }
};

export const updateItem = async (req, res, next) => {
    try {
        const updatedItem = await prisma.item.update({
            where: {
                id: req.params.id
            },
            data: {
                label: req.body.label,
                checked: req.body.checked
            }
        });
        
        return res.json({ data: updateItem });
    } catch (e) {
        next(e);
    }
};

export const deleteItem = async (req, res, next) => {
    try {
        const deletedItem = await prisma.item.delete({
            where: {
                id: req.params.id
            }
        });

        return res.json({ data: deletedItem });
    } catch (e) {
        next(e);
    }
};