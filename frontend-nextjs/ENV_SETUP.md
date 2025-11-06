# Environment Variables Setup Guide

This guide will help you configure your Next.js application with the same credentials from your MERN backend.

## 📝 Steps to Configure

### 1. Copy Values from Backend .env

You need to copy the values from your backend `.env` file located at:
```
d:\Batch No 10\Personal Project\E-Commerce\backend\.env
```

### 2. Update `.env.local` File

The `.env.local` file has been created in the root of this Next.js project. You need to update it with your actual values:

#### Required Environment Variables:

1. **MONGO_URI**
   - Copy the MongoDB connection string from your backend `.env` file
   - Example: `mongodb://localhost:27017/affiliatesphere` or `mongodb+srv://...`

2. **SESSION_SECRET**
   - Copy the session secret from your backend `.env` file
   - This should be a long random string for security

3. **EMAIL_PASS**
   - This is your Gmail App Password (not your regular Gmail password)
   - To generate a Gmail App Password:
     - Go to Google Account Settings → Security
     - Enable 2-Step Verification if not already enabled
     - Go to App Passwords
     - Generate a new app password for "Mail"
   - Copy this value from your backend `.env` file

4. **GEMINI_API_KEY**
   - Copy your Gemini API key from your backend `.env` file
   - If you don't have one, get it from: https://makersuite.google.com/app/apikey

### 3. Example .env.local File

After copying values, your `.env.local` should look like this:

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/affiliatesphere

# Session Secret (use a strong random string)
SESSION_SECRET=super-secret-random-string-here-make-it-long

# Email Configuration (Gmail)
EMAIL_USER=ammarahmadkhan757@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop

# Admin Email
ADMIN_EMAIL=ammarahmadkhan757@gmail.com

# Gemini AI API Key
GEMINI_API_KEY=AIzaSy...your-key-here

# Environment
NODE_ENV=development
```

## 🔐 Admin Account Setup

The admin credentials are already configured:
- **Email**: ammarahmadkhan757@gmail.com
- **Password**: Ammar12@

### Initialize Admin User

After setting up your `.env.local` file, run this command to create the admin user in the database:

```bash
npm run init:admin
```

This will:
- Connect to your MongoDB database
- Create the admin user with the email and password above
- If the admin already exists, it will skip creation

## 🚀 Running the Application

1. Make sure all environment variables are set in `.env.local`
2. Initialize the admin user: `npm run init:admin`
3. Start the development server: `npm run dev`
4. Visit http://localhost:3000
5. Login to admin panel at http://localhost:3000/admin/login

## 🔍 Verification Checklist

- [ ] Copied MONGO_URI from backend .env
- [ ] Copied SESSION_SECRET from backend .env
- [ ] Copied EMAIL_PASS from backend .env (Gmail App Password)
- [ ] Copied GEMINI_API_KEY from backend .env
- [ ] Ran `npm run init:admin` successfully
- [ ] Can start the app with `npm run dev`
- [ ] Can login to admin panel with the credentials above

## ⚠️ Important Notes

1. **Never commit** the `.env.local` file to Git (it's already in .gitignore)
2. **Gmail App Password**: Use an app-specific password, not your regular Gmail password
3. **MongoDB URI**: Make sure the database name matches your backend
4. **Session Secret**: Should be the same as your backend for session compatibility

## 🆘 Troubleshooting

### Issue: Admin login fails
- Run `npm run init:admin` again
- Check that MONGO_URI is correct
- Verify the database has the admin user

### Issue: Email not sending
- Verify EMAIL_USER and EMAIL_PASS are correct
- Make sure you're using a Gmail App Password, not regular password
- Check that 2-Step Verification is enabled on your Google account

### Issue: AI features not working
- Verify GEMINI_API_KEY is correct
- Check API key has proper permissions
- Ensure you haven't exceeded API quotas

## 📚 Related Files

- `.env.local` - Environment variables (in project root)
- `scripts/initAdmin.js` - Admin initialization script
- `src/lib/db.js` - Database connection
- `src/lib/services/emailService.js` - Email configuration
- `src/lib/services/geminiService.js` - AI service configuration
