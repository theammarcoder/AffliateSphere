# AffiliateSphere Frontend

Modern, responsive React frontend for AffiliateSphere - AI-powered affiliate marketing platform.

## Features

### User-Facing Website
- **Modern UI**: Dark theme with purple/pink gradients and smooth animations
- **Product Discovery**: Browse products with advanced filtering and sorting
- **Real-time Search**: Search products by title, description, or tags
- **Category Navigation**: Organized product browsing by categories
- **Responsive Design**: Seamless experience across all devices
- **Contact Form**: Integrated email contact system

### Admin Panel
- **Secure Authentication**: Protected admin routes with session management
- **Dashboard**: Real-time statistics and recent product overview
- **AI-Powered Product Entry**: Gemini AI integration for automated product data extraction
- **Category Management**: Full CRUD operations for categories
- **Product Management**: Complete product catalog management
- **Intuitive UI**: Modern sidebar navigation with mobile support

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── user/           # User-facing components (Header, Footer, ProductCard)
│   ├── Alert.jsx       # Alert notification component
│   ├── LoadingSpinner.jsx
│   └── ProtectedRoute.jsx
├── context/            # React context providers
│   └── AuthContext.jsx # Authentication state management
├── layouts/            # Layout components
│   ├── AdminLayout.jsx # Admin panel layout
│   └── UserLayout.jsx  # User website layout
├── pages/              # Page components
│   ├── admin/          # Admin panel pages
│   │   ├── AdminDashboard.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AddProduct.jsx
│   │   ├── EditProduct.jsx
│   │   ├── ProductManagement.jsx
│   │   └── CategoryManagement.jsx
│   └── user/           # User-facing pages
│       ├── Home.jsx
│       ├── Categories.jsx
│       └── Contact.jsx
├── utils/              # Utility functions
│   └── helpers.js      # Helper functions (formatting, validation, etc.)
├── App.jsx             # Main app component with routing
├── main.jsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Key Features Implementation

### AI Product Extraction
The `AddProduct` page includes AI-powered product data extraction:
1. Admin pastes an affiliate link
2. Clicks "Fetch Details with AI"
3. Gemini AI extracts title and description
4. Admin completes remaining fields and saves

### Dynamic "Buy Now" Buttons
Product cards automatically generate store-specific button text:
- `extractDomain()` function parses affiliate links
- Displays "Buy on Amazon", "Buy on Walmart", etc.

### Authentication Flow
- Protected routes redirect to login if not authenticated
- Session-based auth with HTTP-only cookies
- Automatic auth check on app load

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Hamburger menu for mobile navigation
- Touch-friendly UI elements
- Optimized for all screen sizes

## Customization

### Colors
Update colors in `tailwind.config.js`:
```js
colors: {
  primary: '#6A0DAD',    // Purple
  dark: '#0F0F0F',       // Dark gray
  darker: '#000000'      // Black
}
```

### Animations
Custom animations are defined in `tailwind.config.js` and `index.css`:
- Fade in
- Slide up
- Scale in
- Gradient animations

## API Integration

The frontend communicates with the backend API at `http://localhost:5000`:
- Proxy configured in `vite.config.js` for `/api` routes
- Axios with credentials enabled for session cookies
- Error handling with user-friendly messages

## Contact

For support: ammarahmadkhan757@gmail.com
