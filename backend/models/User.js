const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL DEFAULT 'student',
        student_id VARCHAR(50) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async create(userData) {
    const { name, email, password, role, student_id } = userData;
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const query = `
      INSERT INTO users (name, email, password, role, student_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result = await pool.query(query, [name, email, hashedPassword, role, student_id]);
    return result.rows[0];
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getAll(role = null) {
    let query = 'SELECT id, name, email, role, student_id, created_at FROM users';
    let params = [];
    
    if (role) {
      query += ' WHERE role = $1';
      params.push(role);
    }
    
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async countByRole(role) {
    const query = 'SELECT COUNT(*) FROM users WHERE role = $1';
    const result = await pool.query(query, [role]);
    return parseInt(result.rows[0].count);
  }
}

module.exports = User; 