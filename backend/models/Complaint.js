const pool = require('../config/database');

class Complaint {
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS complaints (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        priority VARCHAR(50) NOT NULL DEFAULT 'medium',
        status VARCHAR(50) NOT NULL DEFAULT 'pending',
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        admin_response TEXT,
        file_path VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(query);
  }

  static async create(complaintData) {
    const { title, description, category, priority, user_id, file_path } = complaintData;
    
    const query = `
      INSERT INTO complaints (title, description, category, priority, user_id, file_path)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `;
    
    const result = await pool.query(query, [title, description, category, priority, user_id, file_path]);
    return result.rows[0];
  }

  static async findById(id) {
    const query = `
      SELECT c.*, u.name as user_name, u.email as user_email, u.student_id
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      WHERE c.id = $1
    `;
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async findByUserId(userId) {
    const query = `
      SELECT * FROM complaints 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query, [userId]);
    return result.rows;
  }

  static async getAll(filters = {}) {
    let query = `
      SELECT c.*, u.name as user_name, u.email as user_email, u.student_id
      FROM complaints c
      JOIN users u ON c.user_id = u.id
    `;
    
    const conditions = [];
    const params = [];
    let paramCount = 0;

    if (filters.status && filters.status !== 'all') {
      paramCount++;
      conditions.push(`c.status = $${paramCount}`);
      params.push(filters.status);
    }

    if (filters.category) {
      paramCount++;
      conditions.push(`c.category = $${paramCount}`);
      params.push(filters.category);
    }

    if (filters.search) {
      paramCount++;
      conditions.push(`(c.title ILIKE $${paramCount} OR c.description ILIKE $${paramCount} OR u.name ILIKE $${paramCount})`);
      params.push(`%${filters.search}%`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY c.created_at DESC';
    
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async update(id, updates) {
    const fields = Object.keys(updates);
    const values = Object.values(updates);
    
    const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
    const query = `
      UPDATE complaints 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async delete(id) {
    const query = 'DELETE FROM complaints WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }

  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending,
        COUNT(CASE WHEN status = 'in-review' THEN 1 END) as in_review,
        COUNT(CASE WHEN status = 'resolved' THEN 1 END) as resolved
      FROM complaints
    `;
    const result = await pool.query(query);
    return result.rows[0];
  }

  static async getCategoryStats() {
    const query = `
      SELECT category, COUNT(*) as count
      FROM complaints
      GROUP BY category
      ORDER BY count DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getRecentComplaints(limit = 5) {
    const query = `
      SELECT c.*, u.name as user_name, u.student_id
      FROM complaints c
      JOIN users u ON c.user_id = u.id
      ORDER BY c.created_at DESC
      LIMIT $1
    `;
    const result = await pool.query(query, [limit]);
    return result.rows;
  }
}

module.exports = Complaint; 