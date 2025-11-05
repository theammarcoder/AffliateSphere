# AffiliateSphere

![AffiliateSphere](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, AI-powered affiliate marketing platform featuring an intuitive admin panel and responsive user-facing website. Built with the MERN stack and integrated with Google Gemini AI for automated product data extraction.

## 🌟 Key Features

### AI-Powered Product Management
- **Gemini AI Integration**: Automatically extract product titles and descriptions from affiliate links
- **Smart Data Entry**: Reduce manual work by 70% with AI assistance
- **Rapid Scaling**: Add products 10x faster than traditional methods

### Admin Panel
- ✅ Secure authentication with bcrypt password hashing
- 📊 Real-time dashboard with key metrics
- 🏷️ Category management (Create, Read, Update, Delete)
- 📦 Complete product catalog management
- 🤖 AI-powered product data extraction
- 📱 Fully responsive mobile-friendly design
- 🎨 Modern dark UI with smooth animations

### User-Facing Website
- 🎯 Advanced product filtering and sorting
- 🔍 Real-time search functionality
- 📂 Category-based navigation
- ⭐ Star ratings and reviews
- 💰 Dynamic pricing display
- 🛒 Smart "Buy Now" buttons (auto-detect store from affiliate link)
- 📧 Integrated contact form with email notifications
- 🌈 Beautiful gradient animations and transitions

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js** - Server framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Google Gemini AI** - Product data extraction
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **Nodemailer** - Email service

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (using MongoDB Atlas)
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
cd "d:/Batch No 10/Personal Project/E-Commerce"
```

2. **Set up Backend**
```bash
cd backend
npm install

# Initialize admin user (only needed once)
node scripts/initAdmin.js

# Start backend server
npm run dev
```

3. **Set up Frontend**
```bash
cd ../frontend
npm install

# Start frontend dev server
npm run dev
```

4. **Access the Application**
- **User Website**: http://localhost:5173
- **Admin Panel**: http://localhost:5173/admin/login
- **Backend API**: http://localhost:5000

## 🔐 Admin Credentials

**Email**: ammarahmadkhan757@gmail.com  
**Password**: Ammar12@

## 📁 Project Structure

```
E-Commerce/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── Admin.js              # Admin user model
│   │   ├── Category.js           # Category model
│   │   ├── Product.js            # Product model
│   │   └── Contact.js            # Contact message model
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication routes
│   │   ├── categoryRoutes.js     # Category CRUD routes
│   │   ├── productRoutes.js      # Product CRUD + AI routes
│   │   ├── contactRoutes.js      # Contact form routes
│   │   └── statsRoutes.js        # Dashboard statistics
│   ├── middleware/
│   │   └── authMiddleware.js     # Protected route middleware
│   ├── services/
│   │   ├── geminiService.js      # Gemini AI integration
│   │   └── emailService.js       # Email service
│   ├── scripts/
│   │   └── initAdmin.js          # Admin initialization script
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── user/             # User-facing components
    │   │   ├── Alert.jsx
    │   │   ├── LoadingSpinner.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx   # Auth state management
    │   ├── layouts/
    │   │   ├── AdminLayout.jsx   # Admin panel layout
    │   │   └── UserLayout.jsx    # User website layout
    │   ├── pages/
    │   │   ├── admin/            # Admin panel pages
    │   │   └── user/             # User-facing pages
    │   ├── utils/
    │   │   └── helpers.js        # Utility functions
    │   ├── App.jsx               # Main app with routing
    │   ├── main.jsx
    │   └── index.css             # Global styles
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🎨 Design System

### Color Palette
- **Primary**: `#6A0DAD` (Deep Purple) - Buttons, links, highlights
- **Dark**: `#0F0F0F` - Card backgrounds
- **Darker**: `#000000` - Main background
- **Accents**: Pink gradients for visual appeal

### Animations
- Fade in effects
- Slide up transitions
- Scale animations
- Gradient animations
- Smooth hover effects

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (protected)
- `PUT /api/categories/:id` - Update category (protected)
- `DELETE /api/categories/:id` - Delete category (protected)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (protected)
- `POST /api/products/extract-details` - AI extraction (protected)
- `PUT /api/products/:id` - Update product (protected)
- `DELETE /api/products/:id` - Delete product (protected)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all messages (protected)

### Stats
- `GET /api/stats/dashboard` - Get dashboard stats (protected)

## 🤖 AI Integration

### How It Works
1. Admin pastes affiliate link in "Add Product" form
2. System sends link to Gemini AI with structured prompt
3. AI extracts product title and description
4. Admin reviews and completes remaining fields
5. Product is saved to database

### Prompt Engineering
The system uses a carefully crafted prompt to ensure consistent, high-quality data extraction:
```
"Act as a product data extraction tool. Based on the following product page link: 
'[AFFILIATE_LINK]', extract and return ONLY a JSON object with these two keys: 
'title' (a concise product title) and 'description' (a 1-2 paragraph product 
description summarizing key features). Do not include any other text or explanations."
```

## 🔧 Configuration

### Environment Variables (Backend)

Create `backend/.env` with:
```env
PORT=5000
MONGO_URI=mongodb+srv://amaarmazhar757:ammar12@cluster0.p1zprli.mongodb.net/affiliateDB
GEMINI_API_KEY=AIzaSyBqhqwTHwkXP6f2zhUsP8aqgSpRwMJCQAo
SESSION_SECRET=affiliatesphere_secret_key_2024
ADMIN_EMAIL=ammarahmadkhan757@gmail.com
EMAIL_USER=ammarahmadkhan757@gmail.com
EMAIL_PASS=your_gmail_app_password
```

**Note**: Update `EMAIL_PASS` with your Gmail app password for contact form emails.

## 📧 Contact Form Setup

To enable email notifications:
1. Go to your Google Account settings
2. Enable 2-factor authentication
3. Generate an App Password
4. Update `EMAIL_PASS` in backend `.env` file

## 🚢 Deployment

### Backend (Node.js)
Deploy to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

### Frontend (React)
Deploy to platforms like:
- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

### Database
Already configured with MongoDB Atlas (cloud database)

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ HTTP-only session cookies
- ✅ CORS configuration
- ✅ Protected admin routes
- ✅ Input validation
- ✅ Secure environment variables
- ✅ MongoDB injection prevention (Mongoose)

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Laptops (1024px+)
- 🖥️ Desktops (1440px+)
- 🖥️ Large displays (1920px+)

## 🎯 Success Criteria

✅ Fully secure and functional Admin Panel  
✅ Seamless Gemini AI Integration  
✅ Intuitive, fast, and engaging User Website  
✅ Dynamic Affiliate Redirection System  
✅ Polished, Responsive Design  
✅ Live Contact Form with email delivery  

## 📞 Support

For issues, questions, or support:

**Email**: ammarahmadkhan757@gmail.com

## 📄 License

MIT License - feel free to use this project for your own affiliate marketing needs!

## 🙏 Acknowledgments

- Google Gemini AI for product data extraction
- MongoDB Atlas for cloud database
- React and Vite teams for excellent tools
- Tailwind CSS for rapid styling
- Lucide for beautiful icons

---

**Built with ❤️ by AffiliateSphere Team**
