# AffiliateSphere - Admin Panel

Admin panel for managing the AffiliateSphere E-Commerce platform.

## Features
- Admin authentication
- Product management (Add, Edit, Delete)
- Category management
- Dashboard with statistics
- Responsive design with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The admin panel will run on **http://localhost:5174**

## Tech Stack
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons
- Axios

## Routes
- `/login` - Admin login
- `/dashboard` - Admin dashboard
- `/categories` - Category management
- `/products` - Product management
- `/products/add` - Add new product
- `/products/edit/:id` - Edit product

## Backend API
The admin panel connects to the backend API running on `http://localhost:5000`
