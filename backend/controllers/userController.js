const { validationResult } = require('express-validator');
const User = require('../models/User');

class UserController {
  // Get all users (admin only)
  static async getAll(req, res) {
    try {
      const { role, page = 1, limit = 10 } = req.query;
      
      const users = await User.getAll(role);
      
      // Pagination
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const paginatedUsers = users.slice(startIndex, endIndex);

      res.status(200).json({
        success: true,
        data: paginatedUsers,
        pagination: {
          current: parseInt(page),
          total: users.length,
          pages: Math.ceil(users.length / limit)
        }
      });
    } catch (error) {
      console.error('Get all users error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user by ID
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Remove password from response
      const { password: _, ...userResponse } = user;

      res.status(200).json({
        success: true,
        data: userResponse
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Update user (admin only)
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
      const { name, email, role, student_id } = req.body;

      // Check if user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      const updates = {};
      if (name) updates.name = name;
      if (email) updates.email = email;
      if (role) updates.role = role;
      if (student_id) updates.student_id = student_id;

      const updatedUser = await User.update(id, updates);

      // Remove password from response
      const { password: _, ...userResponse } = updatedUser;

      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: userResponse
      });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Delete user (admin only)
  static async delete(req, res) {
    try {
      const { id } = req.params;

      // Check if user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Prevent admin from deleting themselves
      if (parseInt(id) === req.user.userId) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete your own account'
        });
      }

      await User.delete(id);

      res.status(200).json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Get user statistics
  static async getStats(req, res) {
    try {
      const studentCount = await User.countByRole('student');
      const adminCount = await User.countByRole('admin');
      const totalUsers = studentCount + adminCount;

      res.status(200).json({
        success: true,
        data: {
          total: totalUsers,
          students: studentCount,
          admins: adminCount
        }
      });
    } catch (error) {
      console.error('Get user stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }

  // Create admin user (admin only)
  static async createAdmin(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'User with this email already exists'
        });
      }

      // Create admin user
      const userData = {
        name,
        email,
        password,
        role: 'admin'
      };

      const user = await User.create(userData);

      // Remove password from response
      const { password: _, ...userResponse } = user;

      res.status(201).json({
        success: true,
        message: 'Admin user created successfully',
        data: userResponse
      });
    } catch (error) {
      console.error('Create admin error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
}

module.exports = UserController; 