# AffiliateSphere Backend

Backend API for AffiliateSphere - AI-powered affiliate marketing platform.

## Features

- **Authentication**: Secure admin login/logout with session management
- **AI Integration**: Gemini API for automated product data extraction
- **Category Management**: Full CRUD operations for product categories
- **Product Management**: Complete product management with AI assistance
- **Contact System**: Contact form with email notifications
- **Dashboard Stats**: Real-time statistics for admin panel

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

The `.env` file is already configured with:
- MongoDB connection string
- Gemini API key
- Session secret
- Admin email

**Important**: Update `EMAIL_PASS` in `.env` with your Gmail app password for contact form emails to work.

### 3. Initialize Admin User

```bash
node scripts/initAdmin.js
```

This creates the admin user with:
- Email: ammarahmadkhan757@gmail.com
- Password: Ammar12@

### 4. Start the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `POST /api/products/extract-details` - Extract details with AI (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (protected)
- `PATCH /api/contact/:id/status` - Update message status (protected)

### Stats
- `GET /api/stats/dashboard` - Get dashboard statistics (protected)

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Gemini AI** - Product data extraction
- **Nodemailer** - Email service
- **bcryptjs** - Password hashing
- **express-session** - Session management

## Contact

For support: ammarahmadkhan757@gmail.com
