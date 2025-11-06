# AffiliateSphere - Next.js Version

This is the unified Next.js version of AffiliateSphere, combining frontend, admin, and backend into a single Next.js application.

## Features

- ✅ **Unified Next.js Application** - Frontend, admin, and API routes in one app
- ✅ **Professional Color Scheme** - Modern, accessible colors with light/dark mode support
- ✅ **API Routes** - All backend functionality converted to Next.js API routes
- ✅ **Admin Panel** - Complete admin interface for managing products and categories
- ✅ **User Frontend** - Product browsing, categories, contact form
- ✅ **Authentication** - Session-based admin authentication
- ✅ **Database** - MongoDB integration with Mongoose
- ✅ **AI Integration** - Gemini AI for product details extraction

## Project Structure

```
frontend-nextjs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes (backend)
│   │   │   ├── auth/          # Authentication routes
│   │   │   ├── products/      # Product CRUD operations
│   │   │   ├── categories/    # Category management
│   │   │   ├── contact/       # Contact form
│   │   │   └── stats/         # Dashboard statistics
│   │   ├── admin/             # Admin pages
│   │   │   ├── login/         # Admin login
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   ├── products/      # Product management
│   │   │   └── categories/    # Category management
│   │   ├── categories/        # User categories page
│   │   ├── contact/           # Contact page
│   │   ├── services/          # Services page
│   │   ├── privacy-policy/    # Privacy policy
│   │   ├── terms-of-service/  # Terms of service
│   │   └── page.js            # Home page
│   ├── components/            # React components
│   │   ├── admin/             # Admin components
│   │   └── user/              # User-facing components
│   ├── lib/                   # Utilities and services
│   │   ├── models/            # Mongoose models
│   │   ├── middleware/        # Auth middleware
│   │   ├── services/          # Business logic services
│   │   ├── db.js              # Database connection
│   │   └── session.js         # Session management
│   └── utils/                 # Helper functions
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
cd frontend-nextjs
npm install
```

### 2. Environment Variables

**Option A: Automatic Setup (Recommended)**

If you already have a `.env` file in your backend folder, you can automatically copy all environment variables:

```bash
npm run copy:env
```

This will copy all necessary environment variables from your backend `.env` to the frontend `.env.local`.

**Option B: Manual Setup**

Create a `.env.local` file in the `frontend-nextjs` directory:

```env
# Database
MONGO_URI=mongodb://localhost:27017/affiliatesphere

# Session Secret (generate a random string)
SESSION_SECRET=your-session-secret-here

# Gemini AI (optional, for product extraction)
GEMINI_API_KEY=your-gemini-api-key

# Email Service (optional, for contact form)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@example.com

# Node Environment
NODE_ENV=development
```

📖 **See [ENV_SETUP.md](./ENV_SETUP.md) for detailed environment setup instructions.**

### 3. Initialize Admin User

Create the admin user in the database:

```bash
npm run init:admin
```

**Default Admin Credentials:**
- Email: `ammarahmadkhan757@gmail.com`
- Password: `Ammar12@`

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

- User frontend: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- API routes: `http://localhost:3000/api/*`

## Professional Color Scheme

The application uses a professional color palette:

- **Primary**: Purple (#8b5cf6) - Professional and modern
- **Light Mode**: Clean whites and grays
- **Dark Mode**: Slate colors (not pure black) for better contrast
- **Accessibility**: WCAG AA compliant contrast ratios

## API Routes

All API routes are available under `/api/*`:

- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/check` - Check authentication status
- `GET /api/products` - Get all products (with filters)
- `POST /api/products` - Create product (admin only)
- `GET /api/products/:id` - Get single product
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/extract-details` - Extract product details with AI (admin only)
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)
- `PUT /api/categories/:id` - Update category (admin only)
- `DELETE /api/categories/:id` - Delete category (admin only)
- `POST /api/contact` - Submit contact form
- `GET /api/stats/dashboard` - Get dashboard statistics (admin only)

## Migration Notes

### What's Been Converted

✅ Backend API routes → Next.js API routes
✅ Frontend pages → Next.js App Router pages
✅ Admin pages → Next.js admin pages
✅ Components → Next.js compatible components
✅ Database models → Mongoose models in `/lib/models`
✅ Authentication → Session-based with cookies
✅ Professional color scheme applied throughout

### Remaining Tasks

Some pages may need to be created or updated:
- Admin Product Management page
- Admin Category Management page
- Admin Add/Edit Product pages
- User Categories page (update if needed)
- User Contact page (update if needed)
- User Services, Privacy, Terms pages (update if needed)

## Development

### Build for Production

```bash
npm run build
npm start
```

### Key Technologies

- **Next.js 14** - React framework with App Router
- **MongoDB** - Database
- **Mongoose** - ODM
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Lucide React** - Icons
- **Google Gemini AI** - Product extraction

## Notes

- The application uses Next.js App Router (not Pages Router)
- All API routes are server-side only
- Session management uses HTTP-only cookies
- Dark mode is supported via Tailwind's dark mode
- All colors are professional and accessible
