import prisma from "../db";

export const createItem = async (req, res) => {
    const item = await prisma.item.create({
        data: {
            label: req.body.label,
            listId: req.body.listId,
            checked: false
        }
    });
    
    return res.json({ data: item });
};

export const updateItem = async (req, res) => {
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
};

export const deleteItem = async (req, res) => {
    const deletedItem = await prisma.item.delete({
        where: {
            id: req.params.id
        }
    });

    return res.json({ data: deletedItem });
};