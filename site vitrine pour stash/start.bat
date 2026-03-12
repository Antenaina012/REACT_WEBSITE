@echo off
REM Stash Mada - Complete Setup & Run Script
REM Configures and starts the entire application as a single independent app

setlocal enabledelayedexpansion

echo.
echo ════════════════════════════════════════════
echo   STASH MADA - INDEPENDENT APP SETUP
echo ════════════════════════════════════════════
echo.

REM Check Node.js
echo [1/5] Verifying Node.js...
node --version >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js not found!
    echo Please install from https://nodejs.org/
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo + Node.js %NODE_VERSION%
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo + npm %NPM_VERSION%
echo.

REM Install root dependencies
echo [2/5] Installing dependencies...
if not exist node_modules (
    echo   Installing root dependencies...
    call npm install --silent
) else (
    echo   + Root dependencies already installed
)

REM Install backend dependencies
cd backend
if not exist node_modules (
    echo   Installing backend dependencies...
    call npm install --silent
) else (
    echo   + Backend dependencies already installed
)
cd ..

REM Install frontend dependencies
cd frontend
if not exist node_modules (
    echo   Installing frontend dependencies...
    call npm install --silent
) else (
    echo   + Frontend dependencies already installed
)
cd ..

echo + All dependencies installed
echo.

REM Create backend .env
echo [3/5] Configuring environment...
if not exist "backend\.env" (
    echo   Creating backend\.env...
    (
        echo DB_HOST=localhost
        echo DB_PORT=5432
        echo DB_NAME=stash
        echo DB_USER=postgres
        echo DB_PASSWORD=postgres
        echo PORT=3000
        echo NODE_ENV=development
    ) > "backend\.env"
    echo   + Created backend\.env
) else (
    echo   + backend\.env already exists
)

if not exist "frontend\.env" (
    echo   Creating frontend\.env...
    (
        echo VITE_API_URL=http://localhost:3000
        echo VITE_APP_NAME=Stash Mada
    ) > "frontend\.env"
    echo   + Created frontend\.env
) else (
    echo   + frontend\.env already exists
)

echo + Environment configured
echo.

REM Database setup prompt
echo [4/5] Database setup...
echo   To initialize PostgreSQL database, run:
echo   psql -U postgres -f database.sql
echo   + Database setup (manual - optional)
echo.

REM Start development servers
echo [5/5] Starting application...
echo.
echo ════════════════════════════════════════════
echo   DEVELOPMENT MODE - Both Servers
echo ════════════════════════════════════════════
echo.
echo   Frontend: http://localhost:5173
echo   Backend:  http://localhost:3000
echo   API:      http://localhost:3000/api
echo.
echo   Press Ctrl+C to stop both servers
echo.

call npm run dev

pause
