const express = require('express');
const { body } = require('express-validator');
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// Validation middleware
const updateUserValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('role').optional().isIn(['student', 'admin']).withMessage('Role must be either student or admin'),
  body('student_id').optional().isLength({ min: 3 }).withMessage('Student ID must be at least 3 characters long')
];

const createAdminValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

// Routes (all require admin access)
router.get('/', auth, admin, UserController.getAll);
router.get('/stats', auth, admin, UserController.getStats);
router.get('/:id', auth, admin, UserController.getById);
router.put('/:id', auth, admin, updateUserValidation, UserController.update);
router.delete('/:id', auth, admin, UserController.delete);
router.post('/admin', auth, admin, createAdminValidation, UserController.createAdmin);

module.exports = router; 