import { Router } from 'express';
import { body } from 'express-validator';
import { checkUserAuthorizedOnList, handleInputErrors } from './utils/middleware';
import { createList, deleteList, getList, getLists, updateList } from './controllers/list';
import { createItem, deleteItem, updateItem } from './controllers/item';

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
    handleInputErrors,
    checkUserAuthorizedOnList, 
    deleteItem);

// Invites

router.get('/invites', () => {})

router.get('/invites/:id', () => {})

router.post('/invites', () => {})

router.delete('/invites', () => {})


export default router;

