# 🚀 Getting Started - Independent App Setup

## Step 1: Choose Your Setup Method

Pick **ONE** of these options:

### Option A: PowerShell (Easiest - Recommended)
```powershell
cd "C:\Users\Antenaina\Documents\template\site vitrine pour stash"
.\start.ps1
```
✅ Automatically installs dependencies
✅ Creates environment files
✅ Initializes database (optional prompt)
✅ Starts both servers

---

### Option B: Batch File (Windows)
```cmd
cd "C:\Users\Antenaina\Documents\template\site vitrine pour stash"
start.bat
```
✅ Same as PowerShell but simpler interface
✅ No admin rights needed usually

---

### Option C: Manual Commands (Most Control)
```powershell
cd "C:\Users\Antenaina\Documents\template\site vitrine pour stash"

# 1. Install all dependencies
npm install
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# 2. Create .env files if they don't exist
# (They should already be created, but verify them)

# 3. Initialize database (one-time only)
psql -U postgres -f database.sql

# 4. Start the development servers
npm run dev
```

---

## Step 2: Wait for Servers to Start

You should see output like:
```
✓ Backend running on http://localhost:3000
✓ Frontend running on http://localhost:5173
```

---

## Step 3: Open Your Browser

Navigate to: **http://localhost:5173**

You should see the Stash Mada homepage with:
- ✅ Hero section
- ✅ Product grid (4 products)
- ✅ Navigation header
- ✅ Footer

---

## Step 4: Test the Features

### Test Navigation
- Click "Accueil" (Home) - stays on homepage
- Click "Collection" - scrolls to products
- Click "Contact" - scrolls to footer

### Test Authentication
1. Click "Connexion" in header
2. Switch between "Connexion" and "S'inscrire"
3. Fill out the form
4. Try signup or login

### Test Shopping Cart
1. Click "Ajouter au panier" on any product
2. See confirmation message
3. Watch cart counter in header increase

---

## Step 5: Stop the Servers

When done, press `Ctrl+C` in the terminal to stop both servers.

---

## Common Issues & Fixes

### "Module not found" error
```powershell
# Reinstall dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..
npm install
```

### "Port 3000 already in use"
```powershell
# Kill the process
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F

# Or change port in backend/.env
PORT=3001
```

### "Port 5173 already in use"
```powershell
# Kill the process
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Or change port in frontend/vite.config.js
server: { port: 5174 }
```

### "Cannot connect to database"
```powershell
# Initialize database
psql -U postgres -f database.sql

# Or create manually
createdb stash
psql -U postgres -d stash -f database.sql
```

### "Cannot find module" in frontend
```powershell
cd frontend
npm install
npm run dev
```

---

## Next: Production Deployment

When you're ready to deploy:

```powershell
# Build the frontend
npm run build

# Start the production server
npm start

# App will be on http://localhost:3000
```

---

## File Locations

```
Your Project:
C:\Users\Antenaina\Documents\template\site vitrine pour stash\

Key Files:
├── start.ps1                    ← Run this for setup
├── start.bat                    ← Or this
├── STANDALONE_APP.md            ← Full documentation
├── QUICK_START.md               ← Quick reference
├── package.json                 ← Root scripts
├── database.sql                 ← Database schema
│
├── frontend/
│   ├── src/                     ← React code
│   ├── package.json
│   └── .env                     ← Configuration
│
└── backend/
    ├── server.js                ← Express server
    ├── package.json
    └── .env                     ← Configuration
```

---

## Commands Cheat Sheet

```powershell
# Start development (easiest)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm install

# Run setup script
.\start.ps1
```

---

## Documentation Files

| File | Purpose |
|------|---------|
| **STANDALONE_APP.md** | Complete independent app guide |
| **QUICK_START.md** | 5-minute quick start |
| **README.md** | Documentation index |
| **GETTING_STARTED.md** | This file - step by step |

---

## Tech Stack

- **Frontend**: React 18, Vite, React Router
- **Backend**: Express, Node.js
- **Database**: PostgreSQL
- **Styling**: CSS Modules
- **HTTP**: Axios

---

## Support

If you encounter issues:

1. Check **STANDALONE_APP.md** troubleshooting section
2. Verify all dependencies are installed: `npm install`
3. Check .env files exist and have correct values
4. Ensure PostgreSQL is running
5. Check console for error messages

---

**Ready to start?**

```powershell
.\start.ps1
```

Then open: **http://localhost:5173**

Happy coding! 🎉
