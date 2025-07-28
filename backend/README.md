# Complanify Backend API

A comprehensive backend API for the Complanify Complaint Management System built with Node.js, Express, and PostgreSQL.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Student and admin user management
- **Complaint Management**: Full CRUD operations for complaints
- **File Upload**: Support for file attachments to complaints
- **Analytics**: Comprehensive analytics and reporting
- **Security**: Rate limiting, input validation, and security headers
- **Database**: PostgreSQL with proper relationships and constraints

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## Project Structure

```
backend/
├── config/
│   └── database.js          # Database configuration
├── controllers/
│   ├── authController.js     # Authentication logic
│   ├── complaintController.js # Complaint management
│   ├── userController.js     # User management
│   └── analyticsController.js # Analytics and reporting
├── middleware/
│   ├── auth.js              # JWT authentication
│   ├── admin.js             # Admin authorization
│   └── upload.js            # File upload handling
├── models/
│   ├── User.js              # User model
│   └── Complaint.js         # Complaint model
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── complaints.js        # Complaint routes
│   ├── users.js             # User management routes
│   └── analytics.js         # Analytics routes
├── utils/
│   └── initDatabase.js      # Database initialization
├── uploads/                 # File upload directory
├── server.js                # Main server file
├── package.json
└── README.md
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=complanify
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ```

4. **Set up PostgreSQL database**
   - Install PostgreSQL
   - Create a database named `complanify`
   - Update the database credentials in `.env`

5. **Initialize the database**
   ```bash
   node utils/initDatabase.js
   ```

6. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new student
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Complaints
- `POST /api/complaints` - Create new complaint
- `GET /api/complaints/my-complaints` - Get user's complaints
- `GET /api/complaints` - Get all complaints (admin)
- `GET /api/complaints/:id` - Get single complaint
- `PUT /api/complaints/:id` - Update complaint (admin)
- `DELETE /api/complaints/:id` - Delete complaint

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `POST /api/users/admin` - Create admin user
- `GET /api/users/stats` - Get user statistics

### Analytics (Admin Only)
- `GET /api/analytics/dashboard` - Dashboard statistics
- `GET /api/analytics/trends` - Complaint trends
- `GET /api/analytics/category-performance` - Category performance
- `GET /api/analytics/response-time` - Response time analytics
- `GET /api/analytics/priority-distribution` - Priority distribution
- `GET /api/analytics/monthly-report` - Monthly reports

## Default Users

After running the database initialization, the following users will be created:

### Admin User
- Email: `admin@complanify.com`
- Password: `admin123`

### Sample Students
- Email: `john@student.com`
- Password: `student123`

- Email: `jane@student.com`
- Password: `student123`

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'student',
  student_id VARCHAR(50) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Complaints Table
```sql
CREATE TABLE complaints (
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
```

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for students and admins
- **Input Validation**: Comprehensive validation using express-validator
- **Rate Limiting**: Protection against brute force attacks
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers
- **File Upload Security**: File type and size restrictions

## Error Handling

The API uses a centralized error handling system with consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Development

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run lint
```

## Production Deployment

1. Set `NODE_ENV=production` in environment variables
2. Use a production PostgreSQL database
3. Set up proper SSL certificates
4. Configure reverse proxy (nginx)
5. Use PM2 or similar process manager

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License 