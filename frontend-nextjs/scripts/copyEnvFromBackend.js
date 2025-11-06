/**
 * Helper script to copy environment variables from backend .env to frontend .env.local
 * Usage: node scripts/copyEnvFromBackend.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const backendEnvPath = path.join(__dirname, '..', '..', 'backend', '.env');
const frontendEnvPath = path.join(__dirname, '..', '.env.local');

console.log('🔄 Copying environment variables from backend to frontend...\n');

try {
  // Check if backend .env exists
  if (!fs.existsSync(backendEnvPath)) {
    console.error('❌ Backend .env file not found at:', backendEnvPath);
    console.log('\nPlease make sure you have a .env file in your backend folder.');
    process.exit(1);
  }

  // Read backend .env file
  const backendEnv = fs.readFileSync(backendEnvPath, 'utf8');
  
  // Parse environment variables
  const envVars = {};
  backendEnv.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });

  // Create frontend .env.local content
  const frontendEnvContent = `# MongoDB Configuration
MONGO_URI=${envVars.MONGO_URI || 'your_mongodb_uri_here'}

# Session Secret (use a strong random string)
SESSION_SECRET=${envVars.SESSION_SECRET || 'your_session_secret_here'}

# Email Configuration (Gmail)
EMAIL_USER=${envVars.EMAIL_USER || 'ammarahmadkhan757@gmail.com'}
EMAIL_PASS=${envVars.EMAIL_PASS || 'your_gmail_app_password_here'}

# Admin Email
ADMIN_EMAIL=${envVars.ADMIN_EMAIL || envVars.EMAIL_USER || 'ammarahmadkhan757@gmail.com'}

# Gemini AI API Key
GEMINI_API_KEY=${envVars.GEMINI_API_KEY || 'your_gemini_api_key_here'}

# Environment
NODE_ENV=${envVars.NODE_ENV || 'development'}
`;

  // Write to frontend .env.local
  fs.writeFileSync(frontendEnvPath, frontendEnvContent, 'utf8');

  console.log('✅ Environment variables copied successfully!\n');
  console.log('Copied variables:');
  console.log('  ✓ MONGO_URI');
  console.log('  ✓ SESSION_SECRET');
  console.log('  ✓ EMAIL_USER');
  console.log('  ✓ EMAIL_PASS');
  console.log('  ✓ ADMIN_EMAIL');
  console.log('  ✓ GEMINI_API_KEY');
  console.log('  ✓ NODE_ENV\n');
  
  console.log('📝 Next steps:');
  console.log('  1. Review .env.local file to ensure all values are correct');
  console.log('  2. Run "npm run init:admin" to create the admin user');
  console.log('  3. Run "npm run dev" to start the development server\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
