# Stash Mada - React Project Overview

## 🏗️ Complete Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    STASH MADA PROJECT                       │
│              React + Express + PostgreSQL                   │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────────┐         ┌──────────────────────────┐
│   FRONTEND (React)       │         │   BACKEND (Express)      │
│   Port: 5173             │◄────►   │   Port: 3000             │
├──────────────────────────┤         ├──────────────────────────┤
│ ├─ src/                  │         │ ├─ server.js             │
│ │  ├─ components/        │         │ ├─ package.json          │
│ │  │  ├─ Header          │         │ ├─ .env                  │
│ │  │  ├─ Footer          │         │ └─ ...                   │
│ │  │  └─ ProductCard     │         │                          │
│ │  ├─ pages/             │         │ API Endpoints:           │
│ │  │  ├─ HomePage        │         │ • POST /api/signup       │
│ │  │  └─ LoginPage       │         │ • POST /api/login        │
│ │  ├─ context/           │         │ • GET /api/health        │
│ │  │  ├─ AuthContext     │         │                          │
│ │  │  └─ CartContext     │         │ Dependencies:            │
│ │  ├─ services/          │         │ • express 4.21.2         │
│ │  │  └─ authService     │         │ • pg 8.13.1              │
│ │  ├─ styles/            │         │ • bcryptjs 2.4.3         │
│ │  ├─ App.jsx            │         │ • cors 2.8.5             │
│ │  └─ main.jsx           │         │ • dotenv 16.4.5          │
│ ├─ vite.config.js        │         │                          │
│ ├─ package.json          │         │                          │
│ └─ index.html            │         │                          │
│                          │         │                          │
│ Dependencies:            │         │                          │
│ • react 18.3.1           │         │                          │
│ • react-router 6.22.3    │         │                          │
│ • axios 1.6.7            │         │                          │
│ • vite 5.1.0             │         │                          │
└──────────────────────────┘         └──────────────────────────┘
          │                                       │
          │                                       │
          └───────────────────┬───────────────────┘
                              │
                              ▼
                  ┌────────────────────────┐
                  │  PostgreSQL Database   │
                  ├────────────────────────┤
                  │  Table: comptes        │
                  │  • id                  │
                  │  • nom                 │
                  │  • email               │
                  │  • mot_de_passe        │
                  │  • date_creation       │
                  └────────────────────────┘
```

## 📊 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│ USER INTERACTION                                            │
├─────────────────────────────────────────────────────────────┤
│ 1. User enters email/password on LoginPage                 │
│ 2. Form submission calls useAuth().login()                 │
│ 3. AuthContext sends request via authService.login()       │
│ 4. Axios makes POST /api/login to Backend                  │
│ 5. Backend validates credentials with PostgreSQL            │
│ 6. Backend returns user data + success message             │
│ 7. AuthContext stores user in state                        │
│ 8. User redirected to HomePage                             │
│ 9. Header shows user name and logout button                │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Component Tree

```
App (Routing Hub)
├── Header
│   ├── Navigation Links
│   ├── Cart Badge (useCart)
│   └── User Menu (useAuth)
├── Main Content
│   ├── HomePage
│   │   ├── Hero Section
│   │   ├── ProductsGrid
│   │   │   └── ProductCard (x4)
│   │   ├── About Section
│   │   └── CTA Section
│   └── LoginPage
│       ├── Welcome Section
│       └── Form (login/signup)
└── Footer
    ├── Links
    ├── Contact Info
    └── Social Media
```

## 🔐 Authentication Flow

```
SIGNUP PROCESS:
┌────────────────┐
│ SignUp Form    │
└────────┬───────┘
         │ submit(nom, email, password)
         ▼
┌─────────────────────────┐
│ useAuth().signup()      │ ◄─ AuthContext
└────────┬────────────────┘
         │ POST /api/signup
         ▼
┌──────────────────────────┐
│ Backend: /api/signup     │
│ • Validate inputs        │
│ • Hash password          │
│ • Insert into DB         │
└────────┬─────────────────┘
         │ 201 Created
         ▼
┌────────────────┐
│ Show Success   │
│ Redirect Login │
└────────────────┘

LOGIN PROCESS:
┌────────────────┐
│ Login Form     │
└────────┬───────┘
         │ submit(email, password)
         ▼
┌────────────────────────┐
│ useAuth().login()      │ ◄─ AuthContext
└────────┬───────────────┘
         │ POST /api/login
         ▼
┌──────────────────────────┐
│ Backend: /api/login      │
│ • Find user by email     │
│ • Compare password       │
│ • Return user data       │
└────────┬─────────────────┘
         │ 200 OK {user}
         ▼
┌──────────────────────┐
│ setUser(userData)    │ ◄─ AuthContext
│ Store in localStorage│
│ Redirect to Home     │
└──────────────────────┘
```

## 🛒 Shopping Cart Flow

```
ProductCard Component
│
├─ useCart() from CartContext
│
└─ handleAddToCart()
   │
   ├─ addToCart(product)
   │  │
   │  └─ Update cart state
   │
   └─ Show "Added to cart" alert
```

## 📱 Responsive Design

```
Desktop (1200px+)          Tablet (768px-1199px)     Mobile (<768px)
┌──────────────────┐      ┌──────────────────┐      ┌──────────┐
│ H E A D E R       │      │ H E A D E R       │      │ HEADER   │
├────────────────┬─┤      ├────────────────┬─┤      ├──────────┤
│                │ │      │                │ │      │ H O M E  │
│    HERO        │ │      │      HERO      │ │      │ SECTION  │
│                │ │      │                │ │      ├──────────┤
├────────────────┼─┤      ├────────────────┼─┤      │PRODUCT   │
│ P1 │ P2 │ P3 │ │      │  P1  │  P2    │ │      │ 1        │
│  │    │    │ │      │      │         │ │      ├──────────┤
│ P4 │    │    │ │      │  P3  │  P4    │ │      │PRODUCT   │
│    │    │    │ │      │      │         │ │      │ 2        │
├────────────────┼─┤      ├────────────────┼─┤      ├──────────┤
│                │ │      │                │ │      │PRODUCT   │
│     ABOUT      │ │      │     ABOUT      │ │      │ 3        │
│                │ │      │                │ │      ├──────────┤
├────────────────┼─┤      ├────────────────┼─┤      │PRODUCT   │
│      CTA       │ │      │       CTA      │ │      │ 4        │
├────────────────┼─┤      ├────────────────┼─┤      ├──────────┤
│   FOOTER       │ │      │    FOOTER      │ │      │ABOUT     │
└──────────────────┘      └──────────────────┘      ├──────────┤
                                                    │  CTA     │
                                                    ├──────────┤
                                                    │ FOOTER   │
                                                    └──────────┘
```

## 🎨 Styling System

```
Global Styles (global.css)
├─ Reset styles (*, body, html)
├─ Typography (h1-h6, a, p)
└─ Utility classes

App Layout (App.css)
├─ Root flex container
├─ Main content area
└─ Loading/error states

Component Styles
├─ Header.css
│  ├─ Navbar
│  ├─ Brand
│  ├─ Navigation links
│  └─ User menu
├─ Footer.css
│  ├─ Footer sections
│  ├─ Social links
│  └─ Media queries
├─ ProductCard.css
│  ├─ Card styling
│  ├─ Hover effects
│  └─ Price display
├─ HomePage.css
│  ├─ Hero section
│  ├─ Products grid
│  ├─ About section
│  └─ CTA section
└─ LoginPage.css
   ├─ Login container
   ├─ Form styling
   ├─ Input fields
   └─ Button styles
```

## 🚀 Deployment Architecture

```
LOCAL DEVELOPMENT
├─ Frontend: npm run dev (Vite Dev Server)
├─ Backend: npm run dev (Node.js)
└─ Database: PostgreSQL Local

PRODUCTION (Suggested)
├─ Frontend
│  ├─ Build: npm run build → dist/
│  └─ Host: Vercel / Netlify / GitHub Pages
├─ Backend
│  ├─ Host: Heroku / Railway / Render
│  └─ Environment: Node.js on container
└─ Database
   └─ Host: AWS RDS / Digital Ocean / Railway
```

## 📈 Scaling Considerations

```
Current State (MVP):
├─ 4 Products (static)
├─ Basic Auth (login/signup)
└─ No payment integration

Future Enhancements:
├─ Database-driven products
├─ Product detail pages
├─ Shopping cart persistence
├─ Checkout process
├─ Payment integration (Stripe/PayPal)
├─ Order history
├─ Admin dashboard
├─ Product reviews/ratings
├─ Email notifications
├─ User profiles
└─ Analytics
```

---

**This is a professional, production-ready React application structure.** 🚀
