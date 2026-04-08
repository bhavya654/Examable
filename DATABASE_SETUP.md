# MongoDB Atlas Database Setup Guide

## Step 1: Create a MongoDB Atlas Account

1. Go to https://www.mongodb.com/cloud/atlas
2. Click **Sign Up** (if you don't have an account)
3. Fill in your details and create an account
4. Verify your email address

---

## Step 2: Create a Cluster

1. Log in to MongoDB Atlas
2. Click **Create** (or **+ Create New Project**)
3. Name your project: `ExamAble` (optional)
4. Click **Create Project**
5. Click **Create Cluster**
6. Choose **Free Tier M0** (free option)
7. Select your cloud provider (AWS, Google Cloud, or Azure) - any is fine
8. Select your region (closest to you)
9. Click **Create Cluster**
10. Wait for cluster creation (usually 2-5 minutes)

---

## Step 3: Whitelist Your IP Address

**IMPORTANT:** Without this step, the connection will fail.

1. In MongoDB Atlas, go to **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Choose one option:
   - **Option A (Secure):** Click **Add Current IP Address** to add only your IP
   - **Option B (Easy for Development):** Click **Allow Access from Anywhere** and type `0.0.0.0/0`
4. Click **Confirm**

---

## Step 4: Create Database User Credentials

1. Go to **Database Access** (left sidebar)
2. Click **Add Database User**
3. **Username:** `bhavyaksingh654_db_user`
4. **Password:** `faslDeOImf3QaDW8`
5. **Database User Privileges:** Select **Atlas Admin** (for development)
6. Click **Add User**

---

## Step 5: Get Connection String

1. Go back to **Clusters** (left sidebar)
2. Click **Connect** on your cluster
3. Select **Drivers** (or **Connect your application**)
4. Choose **Node.js** and your version (3.12.0 or later)
5. Copy the connection string

It should look like:
```
mongodb+srv://bhavyaksingh654_db_user:faslDeOImf3QaDW8@cluster0.nampn7n.mongodb.net/?appName=Cluster0
```

---

## Step 6: Update Server Environment File

1. Open `server/.env` in your project
2. Find the line: `MONGO_URI=...`
3. Replace it with your connection string:
   ```
   MONGO_URI=mongodb+srv://bhavyaksingh654_db_user:faslDeOImf3QaDW8@cluster0.nampn7n.mongodb.net/?appName=Cluster0
   ```

---

## Step 7: Configure Other API Keys (Optional but Recommended)

Add these to `server/.env` for full functionality:

### Google Gemini API Key (for AI image descriptions)
1. Go to https://aistudio.google.com
2. Click **Get API Key**
3. Create new API key for your project
4. Copy and add to `.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```

### Cloudinary (for image storage)
1. Go to https://cloudinary.com
2. Sign up for free account
3. In Dashboard, copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add to `server/.env`:
   ```
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

---

## Step 8: Start the Application

### Terminal 1 - Backend:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
cd "d:\VS Code Projects\Examable\server"
npm run dev
```

You should see: `Server running on port 5000` ✅

### Terminal 2 - Frontend:
```powershell
$env:Path = "C:\Program Files\nodejs;" + $env:Path
cd "d:\VS Code Projects\Examable\client"
npm run dev
```

You should see: `Local: http://localhost:5173/` ✅

---

## Step 9: Verify Everything Works

1. Open browser: http://localhost:5173
2. Try logging in with test credentials:
   - **Student:** email: `chandu7a7@gmail.com` | password: `123456`
   - **Admin:** email: `admine@gmail.com` | password: `123456`

---

## Troubleshooting

### ❌ "MongoDB Error: querySrv ECONNREFUSED"
**Solution:** Whitelist your IP in MongoDB Atlas Network Access

### ❌ "Authentication failed"
**Solution:** Check username/password in `.env` matches MongoDB Atlas Database User credentials

### ❌ "Cannot connect to cluster"
**Solution:** 
- Wait 2-5 minutes after creating the cluster
- Check internet connection
- Verify IP is whitelisted

### ❌ "Client can't reach backend"
**Solution:** Ensure `VITE_API_URL=http://localhost:5000` in `client/.env`

---

## Collections Created Automatically

Once connected, these collections will be created:
- **users** - Student and admin accounts
- **exams** - Exam configurations and questions
- **questions** - Question bank (for admin)
- **results** - Student exam submissions and scores
- **violations** - Proctoring violations (tab switch, fullscreen exit)

---

## Your Current Status

✅ Already configured:
- MongoDB URI
- JWT Secret Key
- Node.js installed
- Dependencies installed
- Frontend & Backend running

⏳ Next:
- Whitelist IP in MongoDB Atlas
- Access the application at http://localhost:5173
