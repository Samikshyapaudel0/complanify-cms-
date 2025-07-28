const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('student_id').optional().isLength({ min: 3 }).withMessage('Student ID must be at least 3 characters long')
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  body('role').optional().isIn(['student', 'admin']).withMessage('Role must be either student or admin')
];

const updateProfileValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email')
];

const changePasswordValidation = [
  body('currentPassword').notEmpty().withMessage('Current password is required'),
  body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
];

// Routes
router.post('/register', registerValidation, AuthController.register);
router.post('/login', loginValidation, AuthController.login);
router.get('/profile', auth, AuthController.getProfile);
router.put('/profile', auth, updateProfileValidation, AuthController.updateProfile);
router.put('/change-password', auth, changePasswordValidation, AuthController.changePassword);

module.exports = router; 