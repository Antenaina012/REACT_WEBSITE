# Quick Start Guide - Stash Mada React Project

## 🚀 Fast Setup (5 minutes)

### 1. Install Dependencies

**Easiest way - run from root:**
```powershell
cd "site vitrine pour stash"
npm install
cd frontend
npm install
cd ../backend
npm install
cd ..
```

**Or install individually:**
```powershell
cd "site vitrine pour stash\backend"
npm install

cd "site vitrine pour stash\frontend"
npm install
```

### 2. Setup Environment Variables

**Backend** - Create `backend\.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stash
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
```

**Frontend** - Create `frontend\.env`:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Stash Mada
```

### 3. Initialize Database

```powershell
psql -U postgres -f "site vitrine pour stash\database.sql"
```

### 4. Run Both Servers

**Single command (recommended):**
```powershell
cd "site vitrine pour stash"
npm run dev
```

**Or manually in separate terminals:**
```powershell
# Terminal 1 - Backend (Port 3000)
cd "site vitrine pour stash\backend"
npm run dev

# Terminal 2 - Frontend (Port 5173)
cd "site vitrine pour stash\frontend"
npm run dev
```

### 5. Open Browser

Navigate to: **http://localhost:5173**

## 📦 What's Included

✅ Modern React 18 with Vite
✅ React Router for navigation
✅ Context API for state management
✅ Responsive design
✅ Authentication system (login/signup)
✅ Product showcase
✅ Shopping cart
✅ Express backend with PostgreSQL
✅ CORS enabled for API calls

## 🎨 Features

- **Home Page**: Hero section, product grid, about section
- **Login Page**: Unified login/signup with form validation
- **Navigation**: Sticky header with cart counter
- **Footer**: Contact info and social links
- **Styling**: Modern gradient design with purple theme
- **API Integration**: Full backend connectivity

## 🔧 Development

### Add a New Page

1. Create file: `frontend/src/pages/MyPage.jsx`
2. Create styles: `frontend/src/pages/MyPage.css`
3. Add route in `frontend/src/App.jsx`:

```jsx
import MyPage from './pages/MyPage';

// Inside Routes:
<Route path="/mypage" element={<MyPage />} />
```

### Add a New Component

1. Create: `frontend/src/components/MyComponent.jsx`
2. Create: `frontend/src/components/MyComponent.css`
3. Import and use

## 📚 File Structure

```
frontend/src/
├── components/          # Reusable UI components
├── pages/              # Full page components
├── services/           # API calls (authService.js)
├── context/            # React Context (Auth, Cart)
├── styles/             # Global CSS
├── App.jsx             # Main component with routes
└── main.jsx            # Entry point
```

## 📚 File Structure

```
frontend/src/
├── components/          # Reusable UI components
├── pages/              # Full page components
├── services/           # API calls (authService.js)
├── context/            # React Context (Auth, Cart)
├── styles/             # Global CSS
├── App.jsx             # Main component with routes
└── main.jsx            # Entry point
```

## 🚀 Production Deploy (Single App)

Build frontend and serve from backend:

```powershell
# Build the frontend
cd "site vitrine pour stash"
npm run build

# Start the production server
npm start

# App will run on http://localhost:3000
# (Frontend files served from backend/server.js)
```

## ⚡ Common Tasks

### Login Test User
```
Email: test@example.com
Password: password123
```

### Add More Products
Edit `frontend/src/pages/HomePage.jsx` - modify `PRODUCTS` array

### Change Colors
Edit CSS files - look for hex colors like `#667eea`, `#764ba2`

### Add New API Endpoint
1. Create method in `backend/server.js`
2. Add call in `frontend/src/services/authService.js`
3. Use in component with `const { login } = useAuth()`

## 🐛 Quick Fixes

**Backend won't start?**
```powershell
# Check if port 3000 is in use, or:
npm install  # Reinstall dependencies
```

**Frontend won't connect?**
- Make sure backend is running first
- Check VITE_API_URL in .env

**Database error?**
- Create database: `createdb stash`
- Run schema: `psql -U postgres -d stash -f database.sql`

## 📞 Next Steps

1. Test login/signup functionality
2. Customize products and styling
3. Add more pages as needed
4. Connect to real payment system
5. Deploy to production

---

**Happy coding! 🎉**
