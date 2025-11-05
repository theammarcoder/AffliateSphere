# 🚀 Quick Start Guide - AffiliateSphere

Get AffiliateSphere up and running in 5 minutes!

## Step 1: Install Backend Dependencies

Open a terminal in the project folder and run:

```bash
cd backend
npm install
```

## Step 2: Initialize Admin User

Create the admin account (only needed once):

```bash
node scripts/initAdmin.js
```

You should see: `✅ Admin user created successfully!`

## Step 3: Start Backend Server

```bash
npm run dev
```

You should see:
```
🚀 Server running on port 5000
🌐 Environment: development
MongoDB Connected: cluster0.p1zprli.mongodb.net
```

**Keep this terminal open!**

## Step 4: Install Frontend Dependencies

Open a **NEW terminal** in the project folder:

```bash
cd frontend
npm install
```

## Step 5: Start Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## Step 6: Access the Application

### User Website
Open your browser and go to: **http://localhost:5173**

### Admin Panel
Go to: **http://localhost:5173/admin/login**

**Login Credentials:**
- Email: `ammarahmadkhan757@gmail.com`
- Password: `Ammar12@`

## 🎉 You're All Set!

### What to Do Next

1. **Add Categories**
   - Go to Admin Panel → Categories
   - Click "Add Category"
   - Create categories like "Electronics", "Home & Kitchen", etc.

2. **Add Products with AI**
   - Go to Admin Panel → Products → Add Product
   - Paste an affiliate link (e.g., from Amazon)
   - Click "Fetch Details with AI"
   - AI will extract title and description
   - Fill in remaining fields (image, category, price, rating)
   - Click "Add Product"

3. **View on User Website**
   - Go to http://localhost:5173
   - See your products displayed beautifully
   - Test search, filters, and sorting

## 🔧 Troubleshooting

### Backend won't start
- Make sure MongoDB connection string is correct in `backend/.env`
- Check if port 5000 is available

### Frontend won't start
- Make sure backend is running first
- Check if port 5173 is available

### Admin login fails
- Make sure you ran `node scripts/initAdmin.js`
- Use exact credentials: `ammarahmadkhan757@gmail.com` / `Ammar12@`

### AI not working
- Check Gemini API key in `backend/.env`
- Make sure you have internet connection

### Contact form emails not sending
- Update `EMAIL_PASS` in `backend/.env` with Gmail App Password
- See main README for Gmail setup instructions

## 📝 Important Notes

- **Backend** runs on: `http://localhost:5000`
- **Frontend** runs on: `http://localhost:5173`
- **Both must be running** for the app to work
- Database is already configured (MongoDB Atlas cloud)
- Gemini AI API key is already configured

## 🆘 Need Help?

Email: ammarahmadkhan757@gmail.com

## 📚 Full Documentation

See `README.md` for:
- Complete feature list
- API documentation
- Deployment guide
- Security features
- And more!

---

**Happy Affiliate Marketing! 🎯**
