@echo off
REM Stash Mada - React Project Setup Script
REM This script sets up the entire project for development

echo.
echo ====================================
echo  Stash Mada - React Project Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version
echo.

REM Setup Backend
echo [1/4] Installing Backend Dependencies...
cd backend
if exist node_modules (
    echo Backend dependencies already installed
) else (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ERROR: Failed to install backend dependencies
        pause
        exit /b 1
    )
)
cd ..
echo ✓ Backend dependencies installed
echo.

REM Setup Frontend
echo [2/4] Installing Frontend Dependencies...
cd frontend
if exist node_modules (
    echo Frontend dependencies already installed
) else (
    call npm install
    if %ERRORLEVEL% neq 0 (
        echo ERROR: Failed to install frontend dependencies
        pause
        exit /b 1
    )
)
cd ..
echo ✓ Frontend dependencies installed
echo.

REM Create Backend .env if not exists
echo [3/4] Checking Environment Configuration...
if not exist "backend\.env" (
    echo Creating backend\.env...
    (
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=stash
        echo DB_USER=postgres
        echo DB_PASSWORD=postgres
        echo PORT=3000
    ) > "backend\.env"
    echo ✓ Created backend\.env - Please update credentials
) else (
    echo ✓ backend\.env already exists
)

if not exist "frontend\.env" (
    echo Creating frontend\.env...
    (
        echo VITE_API_URL=http://localhost:3000
        echo VITE_APP_NAME=Stash Mada
    ) > "frontend\.env"
    echo ✓ Created frontend\.env
) else (
    echo ✓ frontend\.env already exists
)
echo.

REM Database setup instructions
echo [4/4] Database Setup...
echo.
echo To initialize the database, run:
echo   psql -U postgres -f database.sql
echo.
echo Or manually:
echo   createdb stash
echo   psql -U postgres -d stash -f database.sql
echo.
echo ====================================
echo  Setup Complete!
echo ====================================
echo.
echo Next Steps:
echo  1. Update database credentials in backend\.env
echo  2. Initialize PostgreSQL database
echo  3. Open 2 terminals:
echo     - Terminal 1: cd backend ^&^& npm run dev
echo     - Terminal 2: cd frontend ^&^& npm run dev
echo  4. Open browser: http://localhost:5173
echo.
echo Documentation:
echo  - QUICK_START.md - Fast 5-minute setup
echo  - REACT_MIGRATION_GUIDE.md - Complete guide
echo  - TRANSFORMATION_SUMMARY.md - What was created
echo.
pause
