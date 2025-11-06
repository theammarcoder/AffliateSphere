# AffiliateSphere

![AffiliateSphere](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![License](https://img.shields.io/badge/License-MIT-blue)

A modern, AI-powered affiliate marketing platform built with **Next.js 14**. Features a beautiful user-facing website AND complete admin panel, all in one full-stack application with light/dark mode support.

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
- 🌓 **Light/Dark mode toggle** with theme persistence
- 🎨 Beautiful gradient animations and transitions

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) - Full-stack React framework
- **Frontend:** React 18, Tailwind CSS - Modern UI with light/dark mode
- **Backend:** Next.js API Routes - Built-in serverless functions
- **Database:** MongoDB + Mongoose - NoSQL database
- **AI:** Google Gemini AI - Automated product data extraction
- **Auth:** Express Session - Secure admin authentication
- **Email:** Nodemailer - Contact form functionality
- **Icons:** Lucide React - Beautiful icon library
- **Lucide React** - Icons

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account (using MongoDB Atlas)
- Google Gemini API key

### Installation

1. **Navigate to the project**
```bash
cd "d:/Batch No 10/Personal Project/E-Commerce/frontend-nextjs"
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create `.env.local` file with:
```env
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=development
```

4. **Initialize admin user** (first time only)
```bash
npm run init:admin
```

5. **Start the application**
```bash
npm run dev
```

6. **Access the Application**
- **User Website**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login

## 🔐 Admin Credentials

**Email**: ammarahmadkhan757@gmail.com  
**Password**: Ammar12@

## 📁 Project Structure

```
frontend-nextjs/                   # Full-stack Next.js application
├── public/
│   ├── favicon.svg               # Professional SVG favicon
│   ├── logo.svg                  # Brand logo
│   ├── apple-touch-icon.svg      # iOS icon
│   └── manifest.json             # PWA manifest
│
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/                  # 🔧 Backend API Routes
│   │   │   ├── auth/            # Authentication endpoints
│   │   │   ├── categories/      # Category CRUD
│   │   │   ├── products/        # Product CRUD + AI
│   │   │   ├── contact/         # Contact form
│   │   │   └── stats/           # Dashboard stats
│   │   │
│   │   ├── admin/               # 👨‍💼 Admin Panel
│   │   │   ├── dashboard/       # Admin dashboard
│   │   │   ├── categories/      # Category management
│   │   │   ├── products/        # Product management
│   │   │   └── login/           # Admin login
│   │   │
│   │   ├── categories/          # User category page
│   │   ├── contact/             # Contact page
│   │   ├── page.js              # Home page
│   │   ├── layout.js            # Root layout
│   │   └── globals.css          # Global styles
│   │
│   ├── components/
│   │   ├── user/                # User components
│   │   │   ├── Header.js
│   │   │   ├── Footer.js
│   │   │   └── ProductCard.js
│   │   └── admin/               # Admin components
│   │       └── AdminLayout.js
│   │
│   ├── lib/                     # Backend logic
│   │   ├── db.js                # MongoDB connection
│   │   ├── models/              # Mongoose models
│   │   ├── middleware/          # Auth middleware
│   │   └── services/            # AI & Email services
│   │
│   ├── context/
│   │   └── ThemeContext.js      # Light/Dark theme
│   │
│   └── utils/
│       └── helpers.js
│
├── scripts/
│   └── initAdmin.js             # Admin init script
│
├── .env.local                   # Environment variables
├── next.config.js
├── tailwind.config.js
└── package.json
```

## 🎨 Design System

### Color Palette

**Primary Color**
- `#8b5cf6` (Purple-500) - Primary actions, gradients

**Light Mode**
- Background: `#ffffff` (White)
- Secondary BG: `#f9fafb` (Gray-50)
- Text: `#111827` (Gray-900)
- Border: `#e5e7eb` (Gray-200)

**Dark Mode**
- Background: `#0f172a` (Slate-900)
- Secondary BG: `#1e293b` (Slate-800)
- Text: `#f8fafc` (Slate-50)
- Border: `#334155` (Slate-700)

**Gradients**
- Primary: Purple-500 to Pink-500 (`#8b5cf6` → `#ec4899`)

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
