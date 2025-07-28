const pool = require('../config/database');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const bcrypt = require('bcryptjs');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create tables
    await User.createTable();
    await Complaint.createTable();

    console.log('Tables created successfully');

    // Check if admin user exists
    const adminExists = await User.findByEmail('admin@complanify.com');
    
    if (!adminExists) {
      // Create default admin user
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      const adminData = {
        name: 'System Administrator',
        email: 'admin@complanify.com',
        password: hashedPassword,
        role: 'admin'
      };

      await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES ($1, $2, $3, $4)
      `, [adminData.name, adminData.email, adminData.password, adminData.role]);

      console.log('Default admin user created:');
      console.log('Email: admin@complanify.com');
      console.log('Password: admin123');
    }

    // Create some sample data for testing
    const sampleStudents = [
      {
        name: 'John Doe',
        email: 'john@student.com',
        password: await bcrypt.hash('student123', 12),
        role: 'student',
        student_id: 'STU001'
      },
      {
        name: 'Jane Smith',
        email: 'jane@student.com',
        password: await bcrypt.hash('student123', 12),
        role: 'student',
        student_id: 'STU002'
      }
    ];

    for (const student of sampleStudents) {
      const existingStudent = await User.findByEmail(student.email);
      if (!existingStudent) {
        await pool.query(`
          INSERT INTO users (name, email, password, role, student_id)
          VALUES ($1, $2, $3, $4, $5)
        `, [student.name, student.email, student.password, student.role, student.student_id]);
      }
    }

    console.log('Sample students created');

    // Create sample complaints
    const sampleComplaints = [
      {
        title: 'Library WiFi Issues',
        description: 'The WiFi connection in the library is very slow and frequently disconnects.',
        category: 'Infrastructure',
        priority: 'high',
        status: 'pending',
        user_id: 2 // Assuming John Doe has ID 2
      },
      {
        title: 'Cafeteria Food Quality',
        description: 'The food quality in the cafeteria has declined significantly.',
        category: 'Food Services',
        priority: 'medium',
        status: 'in-review',
        user_id: 3, // Assuming Jane Smith has ID 3
        admin_response: 'We are investigating this matter and will respond within 48 hours.'
      }
    ];

    for (const complaint of sampleComplaints) {
      const existingComplaint = await pool.query(
        'SELECT * FROM complaints WHERE title = $1',
        [complaint.title]
      );

      if (existingComplaint.rows.length === 0) {
        await pool.query(`
          INSERT INTO complaints (title, description, category, priority, status, user_id, admin_response)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [
          complaint.title,
          complaint.description,
          complaint.category,
          complaint.priority,
          complaint.status,
          complaint.user_id,
          complaint.admin_response
        ]);
      }
    }

    console.log('Sample complaints created');
    console.log('Database initialization completed successfully!');

  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup complete');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}

module.exports = initializeDatabase; 