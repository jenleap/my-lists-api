import { Router } from 'express';
import { body } from 'express-validator';
import { handleInputErrors } from './utils/middleware';
import { createList, deleteList, getList, getLists, updateList } from './controllers/list';

const router = Router();

// Lists
router.get('/lists', getLists);

router.get('/lists/:id', getList);

router.post('/lists', body('name').isString(), handleInputErrors, createList);

router.put('/lists/:id', body('name').isString(), handleInputErrors, updateList);

router.delete('/lists/:id', deleteList);

// Items

router.post('/items', 
    body('label').isString(), 
    body('checked').isBoolean(), 
    body('listId').isString(),
    handleInputErrors,
    (req, res) => {

});

router.put('/items/:id', 
    body('label').optional, 
    body('checked').optional, 
    handleInputErrors,
    (req, res) => {

});

router.delete('/items/:id', () => {})

// Invites

router.get('/invites', () => {})

router.get('/invites/:id', () => {})

router.post('/invites', () => {})

router.delete('/invites', () => {})


export default router;

