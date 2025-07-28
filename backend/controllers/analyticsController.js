const Complaint = require('../models/Complaint');
const User = require('../models/User');

class AnalyticsController {
  // Get dashboard analytics
  static async getDashboardStats(req, res) {
    try {
      const [complaintStats, userStats, categoryStats, recentComplaints] = await Promise.all([
        Complaint.getStats(),
        User.countByRole('student'),
        Complaint.getCategoryStats(),
        Complaint.getRecentComplaints(5)
      ]);

      const analytics = {
        complaints: complaintStats,
        users: {
          total: userStats,
          active: userStats // You can add logic to determine active users
        },
        categories: categoryStats,
        recent: recentComplaints,
        resolutionRate: complaintStats.total > 0 
          ? Math.round((complaintStats.resolved / complaintStats.total) * 100) 
          : 0
      };

      res.status(200).json({
        success: true,
        data: analytics
      });
    } catch (error) {
      console.error('Get dashboard stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get complaint trends
  static async getComplaintTrends(req, res) {
    try {
      const { days = 30 } = req.query;
      
      // Get complaints for the last N days
      const query = `
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as count,
          COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved
        FROM complaints 
        WHERE created_at >= CURRENT_DATE - INTERVAL '${days} days'
        GROUP BY DATE(created_at)
        ORDER BY date
      `;
      
      const pool = require('../config/database');
      const result = await pool.query(query);

      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get complaint trends error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get category performance
  static async getCategoryPerformance(req, res) {
    try {
      const query = `
        SELECT 
          category,
          COUNT(*) as total,
          COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
          COUNT(CASE WHEN status = 'in-review' THEN 1 END) as in_review,
          ROUND(
            (COUNT(CASE WHEN status = 'resolved' THEN 1 END)::DECIMAL / COUNT(*)) * 100, 2
          ) as resolution_rate
        FROM complaints 
        GROUP BY category
        ORDER BY total DESC
      `;
      
      const pool = require('../config/database');
      const result = await pool.query(query);

      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get category performance error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get response time analytics
  static async getResponseTimeAnalytics(req, res) {
    try {
      const query = `
        SELECT 
          AVG(
            EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600
          ) as avg_response_hours,
          MIN(
            EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600
          ) as min_response_hours,
          MAX(
            EXTRACT(EPOCH FROM (updated_at - created_at)) / 3600
          ) as max_response_hours
        FROM complaints 
        WHERE status = 'resolved' AND updated_at > created_at
      `;
      
      const pool = require('../config/database');
      const result = await pool.query(query);

      res.status(200).json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Get response time analytics error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get priority distribution
  static async getPriorityDistribution(req, res) {
    try {
      const query = `
        SELECT 
          priority,
          COUNT(*) as count,
          ROUND((COUNT(*)::DECIMAL / (SELECT COUNT(*) FROM complaints)) * 100, 2) as percentage
        FROM complaints 
        GROUP BY priority
        ORDER BY count DESC
      `;
      
      const pool = require('../config/database');
      const result = await pool.query(query);

      res.status(200).json({
        success: true,
        data: result.rows
      });
    } catch (error) {
      console.error('Get priority distribution error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get monthly report
  static async getMonthlyReport(req, res) {
    try {
      const { year, month } = req.query;
      const targetYear = year || new Date().getFullYear();
      const targetMonth = month || new Date().getMonth() + 1;

      const query = `
        SELECT 
          COUNT(*) as total_complaints,
          COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved,
          COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
          COUNT(CASE WHEN status = 'in-review' THEN 1 END) as in_review,
          COUNT(DISTINCT user_id) as unique_users,
          ROUND(
            (COUNT(CASE WHEN status = 'resolved' THEN 1 END)::DECIMAL / COUNT(*)) * 100, 2
          ) as resolution_rate
        FROM complaints 
        WHERE EXTRACT(YEAR FROM created_at) = $1 
        AND EXTRACT(MONTH FROM created_at) = $2
      `;
      
      const pool = require('../config/database');
      const result = await pool.query(query, [targetYear, targetMonth]);

      res.status(200).json({
        success: true,
        data: {
          period: { year: targetYear, month: targetMonth },
          stats: result.rows[0]
        }
      });
    } catch (error) {
      console.error('Get monthly report error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = AnalyticsController; 