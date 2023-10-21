import { Router } from 'express';
import { body } from 'express-validator';
import { checkUserAuthorizedOnList, handleInputErrors } from './utils/middleware';
import { createList, deleteList, getList, getLists, updateList } from './controllers/list';
import { createItem, deleteItem, updateItem } from './controllers/item';
import { confirmInvite, createInvite, getInvites } from './controllers/invite';
import { getUsers } from './controllers/user';

const router = Router();

// Lists
router.get('/lists', getLists);

router.get('/lists/:id', getList);

router.post('/lists', body('name').isString(), handleInputErrors, createList);

router.put('/lists/:id', body('name').isString(), handleInputErrors, updateList);

router.delete('/lists/:id', deleteList);

// Items

router.post('/items/:listId', 
    body('label').isString(), 
    body('listId').isString(),
    handleInputErrors,
    checkUserAuthorizedOnList,
    createItem
);

router.put('/items/:listId/:id', 
    body('label').isString(), 
    body('checked').isBoolean(),
    handleInputErrors,
    checkUserAuthorizedOnList,
    updateItem
);

router.delete('/items/:listId/:id', 
    checkUserAuthorizedOnList, 
    deleteItem);

// Invites

router.get('/invites', getInvites);

router.post('/invites', 
    body('userId').isString(),
    body('listId').isString(),
    body('note').isString(),
    handleInputErrors,
    createInvite);

router.put('/invites/:id', 
    body('accept').isBoolean(),
    handleInputErrors,
    confirmInvite);

// Users

router.get('/users', getUsers);

router.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "Oops!", error: err });
});


export default router;

