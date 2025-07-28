const express = require('express');
const AnalyticsController = require('../controllers/analyticsController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

// All analytics routes require admin access
router.get('/dashboard', auth, admin, AnalyticsController.getDashboardStats);
router.get('/trends', auth, admin, AnalyticsController.getComplaintTrends);
router.get('/category-performance', auth, admin, AnalyticsController.getCategoryPerformance);
router.get('/response-time', auth, admin, AnalyticsController.getResponseTimeAnalytics);
router.get('/priority-distribution', auth, admin, AnalyticsController.getPriorityDistribution);
router.get('/monthly-report', auth, admin, AnalyticsController.getMonthlyReport);

module.exports = router; 