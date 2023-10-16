import { Router } from 'express';

const router = Router();

// Lists
router.get('/lists', (req, res) => {
    return res.json({
        message: "Here are your lists."
    })
})

router.get('/lists/:id', () => {})

router.post('/lists', () => {})

router.put('/lists/:id', () => {})

router.delete('/lists/:id', () => {})

// Items

router.put('/items/:id', () => {})

router.delete('/items/:id', () => {})

// Invites

router.get('/invites', () => {})

router.get('/invites/:id', () => {})

router.post('/invites', () => {})

router.delete('/invites', () => {})

export default router;

