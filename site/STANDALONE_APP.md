# 🚀 Stash Mada - Standalone Independent App

Your project is now configured as a **single, independent application** where frontend and backend work together seamlessly.

## ✨ What This Means

✅ **Single Start Command** - Run everything with one command
✅ **Unified Backend** - Backend serves both API and frontend files
✅ **Production Ready** - Build once, deploy everything together
✅ **No Separate Ports in Production** - Everything runs on port 3000
✅ **True Full-Stack App** - Frontend + Backend + Database

---

## 🚀 Quick Start (Choose One)

### Option 1: PowerShell (Recommended)
```powershell
cd "site vitrine pour stash"
.\start.ps1
```

### Option 2: Batch File
```cmd
cd "site vitrine pour stash"
start.bat
```

### Option 3: npm (Manual)
```powershell
cd "site vitrine pour stash"
npm install
npm run dev
```

---

## 🎯 Development Mode

**Start both servers with one command:**

```powershell
npm run dev
```

This starts:
- ✅ Backend on http://localhost:3000 (API)
- ✅ Frontend on http://localhost:5173 (Dev Server with hot reload)

**Access the app:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000/api

---

## 🏭 Production Mode

**Build and serve as a single app:**

```powershell
# Build the frontend
npm run build

# This will:
# 1. Install frontend dependencies
# 2. Build React optimized production files
# 3. Copy files to backend/dist/

# Start production server
npm start

# App runs on: http://localhost:3000
```

---

## 📁 Project Structure (Independent App)

```
site vitrine pour stash/
├── backend/
│   ├── server.js              ← Main server (serves API + frontend)
│   ├── dist/                  ← Built frontend files (production)
│   ├── package.json
│   ├── .env
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   ├── package.json
│   ├── vite.config.js         ← Builds to ../backend/dist/
│   └── node_modules/
│
├── database.sql               ← Database schema
├── package.json               ← Root (install & run scripts)
├── start.ps1                  ← PowerShell setup script
├── start.bat                  ← Windows batch setup script
└── ...documentation files
```

---

## 🔧 How It Works

### Development
```
Browser (localhost:5173)
    ↓
React Dev Server (Vite)
    ↓
    → Proxies /api requests to localhost:3000
    → Hot reloads on code changes
    
Backend (localhost:3000)
    ↓
Express Server
    ↓
    → Handles /api endpoints
    → Returns JSON data
```

### Production
```
Browser (localhost:3000)
    ↓
Express Server
    ↓
    → Serves static React files (from dist/)
    → Handles /api endpoints
    ↓
PostgreSQL Database
```

---

## 📊 Environment Configuration

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stash
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Stash Mada
```

---

## 🎯 Key Commands

| Command | What It Does |
|---------|-------------|
| `npm run dev` | Start both servers (development) |
| `npm run build` | Build frontend for production |
| `npm start` | Start production server (must build first) |
| `.\start.ps1` | PowerShell setup script |
| `start.bat` | Batch file setup script |

---

## 🗄️ Database Setup

**Initialize the database once:**

```powershell
psql -U postgres -f database.sql
```

This creates:
- Database named `stash`
- Table `comptes` for user accounts

---

## 🔐 Authentication Flow

```
1. User fills login form → Frontend (HomePage.jsx)
2. Form submission → useAuth() hook from AuthContext
3. AuthContext calls → authService.login()
4. authService sends → POST /api/login to Backend
5. Backend validates → Email & password check
6. Backend returns → User data + success message
7. AuthContext stores → User in state + localStorage
8. User redirected → To HomePage
9. Header shows → User name + Logout button
```

---

## 📦 Dependencies

### Root (for orchestration)
```json
{
  "concurrently": "^8.2.0"  // Run both servers at once
}
```

### Backend
```json
{
  "express": "^4.21.2",
  "pg": "^8.13.1",
  "bcryptjs": "^2.4.3",
  "cors": "^2.8.5",
  "dotenv": "^16.4.5"
}
```

### Frontend
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.3",
  "axios": "^1.6.7",
  "vite": "^5.1.0"
}
```

---

## 🐛 Troubleshooting

### "Port 3000 already in use"
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID 1234 /F
```

### "Port 5173 already in use"
```powershell
# Same as above but with :5173
netstat -ano | findstr :5173
```

### "Cannot connect to database"
```powershell
# Verify PostgreSQL is running
psql -U postgres -c "SELECT 1"

# Create database if missing
createdb stash

# Initialize schema
psql -U postgres -d stash -f database.sql
```

### "Frontend shows blank page"
- Check browser console for errors
- Verify backend is running on port 3000
- Check VITE_API_URL is correct in frontend/.env

---

## 🚀 Deployment

### For Production Hosting:

1. **Build the application:**
   ```powershell
   npm run build
   ```

2. **Install production dependencies:**
   ```powershell
   cd backend
   npm install --production
   cd ..
   ```

3. **Set environment variables** (on hosting server):
   - `NODE_ENV=production`
   - Database credentials

4. **Start the server:**
   ```powershell
   npm start
   ```

5. **Access the app:**
   - http://your-domain.com:3000

---

## 📱 Features

✅ **Home Page**
- Hero section
- Product grid (4 items)
- About section
- Call-to-action

✅ **Login Page**
- Login form
- Signup form
- Form validation
- Error handling

✅ **Navigation**
- Header with menu
- User authentication display
- Shopping cart counter
- Footer with contact

✅ **State Management**
- User authentication (AuthContext)
- Shopping cart (CartContext)
- localStorage persistence

✅ **API Integration**
- Login endpoint
- Signup endpoint
- Health check endpoint
- Error handling

✅ **Responsive Design**
- Mobile (< 768px)
- Tablet (768-1199px)
- Desktop (1200px+)

---

## 🎨 Customization

### Add a New Page
1. Create `src/pages/NewPage.jsx`
2. Create `src/pages/NewPage.css`
3. Add route to `src/App.jsx`:
```jsx
import NewPage from './pages/NewPage';

// Inside Routes:
<Route path="/newpage" element={<NewPage />} />
```

### Add a New Component
1. Create `src/components/NewComponent.jsx`
2. Create `src/components/NewComponent.css`
3. Import and use in pages

### Change Colors
- Edit CSS files
- Look for: `#667eea` (purple) and `#764ba2` (dark purple)

### Add New Products
- Edit `src/pages/HomePage.jsx`
- Modify `PRODUCTS` array

---

## 📚 Additional Resources

- **React Docs**: https://react.dev
- **Express Docs**: https://expressjs.com
- **Vite Docs**: https://vitejs.dev
- **React Router**: https://reactrouter.com
- **Axios**: https://axios-http.com

---

## ✅ Verification Checklist

Before deploying:

- [ ] All npm dependencies installed
- [ ] Backend and frontend .env files created
- [ ] Database initialized with `psql -U postgres -f database.sql`
- [ ] Both servers start without errors (`npm run dev`)
- [ ] Frontend accessible at http://localhost:5173
- [ ] Backend API accessible at http://localhost:3000/api
- [ ] Login/signup forms work
- [ ] Navigation between pages works
- [ ] Add to cart works
- [ ] Mobile responsive design looks good
- [ ] No console errors in browser

---

## 🎉 Summary

Your application is now a **complete, independent, production-ready full-stack app**:

- ✅ Single codebase (frontend + backend)
- ✅ Single start command
- ✅ Single deployment process
- ✅ Frontend served from backend
- ✅ All API calls working
- ✅ Database integrated
- ✅ User authentication ready
- ✅ Ready for production

**To start developing:**
```powershell
npm run dev
```

**To deploy to production:**
```powershell
npm run build && npm start
```

---

**Happy coding! 🚀**
