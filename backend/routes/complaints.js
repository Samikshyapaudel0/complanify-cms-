const express = require('express');
const { body } = require('express-validator');
const ComplaintController = require('../controllers/complaintController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const upload = require('../middleware/upload');

const router = express.Router();

// Validation middleware
const createComplaintValidation = [
  body('title').trim().isLength({ min: 5, max: 255 }).withMessage('Title must be between 5 and 255 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters long'),
  body('category').isIn(['Infrastructure', 'Food Services', 'Academic', 'Transportation', 'Library', 'Other']).withMessage('Invalid category'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high')
];

const updateComplaintValidation = [
  body('status').optional().isIn(['pending', 'in-review', 'resolved']).withMessage('Invalid status'),
  body('admin_response').optional().trim().isLength({ min: 5 }).withMessage('Response must be at least 5 characters long')
];

// Routes
// Create complaint (students only)
router.post('/', auth, upload.single('file'), createComplaintValidation, ComplaintController.create);

// Get user's complaints (students)
router.get('/my-complaints', auth, ComplaintController.getUserComplaints);

// Get all complaints (admin only)
router.get('/', auth, admin, ComplaintController.getAll);

// Get single complaint
router.get('/:id', auth, ComplaintController.getById);

// Update complaint (admin only)
router.put('/:id', auth, admin, updateComplaintValidation, ComplaintController.update);

// Delete complaint
router.delete('/:id', auth, ComplaintController.delete);

// Analytics routes (admin only)
router.get('/stats/overview', auth, admin, ComplaintController.getStats);
router.get('/stats/categories', auth, admin, ComplaintController.getCategoryStats);
router.get('/stats/recent', auth, admin, ComplaintController.getRecentComplaints);

module.exports = router; 