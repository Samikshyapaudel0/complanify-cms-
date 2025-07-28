const { validationResult } = require('express-validator');
const Complaint = require('../models/Complaint');
const User = require('../models/User');

class ComplaintController {
  // Create new complaint
  static async create(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { title, description, category, priority } = req.body;
      const file_path = req.file ? req.file.path : null;

      const complaintData = {
        title,
        description,
        category,
        priority: priority || 'medium',
        user_id: req.user.userId,
        file_path
      };

      const complaint = await Complaint.create(complaintData);

      res.status(201).json({
        success: true,
        message: 'Complaint submitted successfully',
        data: complaint
      });
    } catch (error) {
      console.error('Create complaint error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get all complaints (for admin)
  static async getAll(req, res) {
    try {
      const { status, category, search, page = 1, limit = 10 } = req.query;
      
      const filters = {};
      if (status) filters.status = status;
      if (category) filters.category = category;
      if (search) filters.search = search;

      const complaints = await Complaint.getAll(filters);
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedComplaints = complaints.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedComplaints,
        pagination: {
          current: parseInt(page),
          total: complaints.length,
          pages: Math.ceil(complaints.length / limit)
        }
      });
    } catch (error) {
      console.error('Get all complaints error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user's complaints
  static async getUserComplaints(req, res) {
    try {
      const complaints = await Complaint.findByUserId(req.user.userId);
      
      res.status(200).json({
        success: true,
        data: complaints
      });
    } catch (error) {
      console.error('Get user complaints error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get single complaint
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const complaint = await Complaint.findById(id);

      if (!complaint) {
        return res.status(404).json({
          success: false,
          message: 'Complaint not found'
        });
      }

      // Check if user can access this complaint
      if (req.user.role !== 'admin' && complaint.user_id !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.status(200).json({
        success: true,
        data: complaint
      });
    } catch (error) {
      console.error('Get complaint error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update complaint (admin only)
  static async update(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { status, admin_response } = req.body;

      // Check if complaint exists
      const existingComplaint = await Complaint.findById(id);
      if (!existingComplaint) {
        return res.status(404).json({
          success: false,
          message: 'Complaint not found'
        });
      }

      const updates = {};
      if (status) updates.status = status;
      if (admin_response !== undefined) updates.admin_response = admin_response;

      const updatedComplaint = await Complaint.update(id, updates);

      res.status(200).json({
        success: true,
        message: 'Complaint updated successfully',
        data: updatedComplaint
      });
    } catch (error) {
      console.error('Update complaint error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete complaint
  static async delete(req, res) {
    try {
      const { id } = req.params;

      // Check if complaint exists
      const existingComplaint = await Complaint.findById(id);
      if (!existingComplaint) {
        return res.status(404).json({
          success: false,
          message: 'Complaint not found'
        });
      }

      // Check if user can delete this complaint
      if (req.user.role !== 'admin' && existingComplaint.user_id !== req.user.userId) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      await Complaint.delete(id);

      res.status(200).json({
        success: true,
        message: 'Complaint deleted successfully'
      });
    } catch (error) {
      console.error('Delete complaint error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get complaint statistics
  static async getStats(req, res) {
    try {
      const stats = await Complaint.getStats();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Get stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get category statistics
  static async getCategoryStats(req, res) {
    try {
      const categoryStats = await Complaint.getCategoryStats();
      
      res.status(200).json({
        success: true,
        data: categoryStats
      });
    } catch (error) {
      console.error('Get category stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get recent complaints
  static async getRecentComplaints(req, res) {
    try {
      const { limit = 5 } = req.query;
      const complaints = await Complaint.getRecentComplaints(parseInt(limit));
      
      res.status(200).json({
        success: true,
        data: complaints
      });
    } catch (error) {
      console.error('Get recent complaints error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = ComplaintController; 