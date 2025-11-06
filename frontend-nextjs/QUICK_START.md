# ⚡ Quick Start Guide

Get your Next.js AffiliateSphere app running in 3 simple steps!

## 🚀 Fast Setup (Recommended)

If you already have your backend configured with a `.env` file, follow these steps:

### Step 1: Copy Environment Variables
```bash
npm run copy:env
```

This automatically copies all credentials from your backend `.env` file to the frontend `.env.local`.

### Step 2: Initialize Admin User
```bash
npm run init:admin
```

This creates the admin user in your MongoDB database.

### Step 3: Start Development Server
```bash
npm run dev
```

That's it! Your app is now running at http://localhost:3000 🎉

## 🔐 Admin Login

Visit http://localhost:3000/admin/login and use these credentials:

- **Email**: `ammarahmadkhan757@gmail.com`
- **Password**: `Ammar12@`

## 📍 Important URLs

- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Categories**: http://localhost:3000/categories
- **Contact**: http://localhost:3000/contact

## ✅ What's Configured

After running the setup, your Next.js app has:

- ✅ MongoDB connection (same database as backend)
- ✅ Gmail email service (for contact forms)
- ✅ Gemini AI (for product extraction)
- ✅ Admin authentication (same credentials as backend)
- ✅ Session management (same secret as backend)

## 🔧 Troubleshooting

### Environment Variables Not Copying?

Make sure you have a `.env` file in your backend folder:
```
d:\Batch No 10\Personal Project\E-Commerce\backend\.env
```

### Admin User Already Exists?

This is normal! If the admin user was created before, you'll see:
```
✅ Admin user already exists!
```

You can still login with the credentials above.

### Database Connection Error?

1. Make sure MongoDB is running
2. Check that `MONGO_URI` in `.env.local` is correct
3. Verify you can connect from the backend

### Email Not Sending?

1. Check `EMAIL_USER` and `EMAIL_PASS` in `.env.local`
2. Make sure you're using a Gmail App Password (not regular password)
3. Enable 2-Step Verification on your Google account

## 📚 Need More Help?

- See [ENV_SETUP.md](./ENV_SETUP.md) for detailed environment setup
- See [README.md](./README.md) for full documentation
- Check [CONVERSION_COMPLETE.md](./CONVERSION_COMPLETE.md) for migration details

## 🎯 Next Steps

After setup, you can:

1. **Login to Admin**: http://localhost:3000/admin/login
2. **Add Categories**: Manage product categories
3. **Add Products**: Create affiliate products with AI extraction
4. **Browse Products**: View your products on the frontend
5. **Test Contact Form**: Send test messages

---

**Happy coding! 🚀**
