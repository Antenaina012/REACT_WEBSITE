#!/usr/bin/env pwsh
<#
.SYNOPSIS
Stash Mada - Complete Setup & Run Script
Configures and starts the entire application as a single independent app

.DESCRIPTION
This script:
1. Installs all dependencies (backend & frontend)
2. Creates environment configuration files
3. Initializes the database
4. Starts both servers (or builds for production)
#>

param(
    [ValidateSet('dev', 'build', 'start')]
    [string]$Mode = 'dev'
)

Write-Host ""
Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║     STASH MADA - INDEPENDENT APP SETUP    ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$rootPath = Get-Location

# ============================================================================
# STEP 1: Check Node.js
# ============================================================================
Write-Host "[1/5] Verifying Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js $nodeVersion" -ForegroundColor Green
    Write-Host "✓ npm $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "✗ Node.js not found! Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}
Write-Host ""

# ============================================================================
# STEP 2: Install Dependencies
# ============================================================================
Write-Host "[2/5] Installing dependencies..." -ForegroundColor Yellow

# Root dependencies
if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing root dependencies..." -ForegroundColor Gray
    npm install --silent
}
else {
    Write-Host "  ✓ Root dependencies already installed" -ForegroundColor Gray
}

# Backend dependencies
Push-Location "backend"
if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing backend dependencies..." -ForegroundColor Gray
    npm install --silent
}
else {
    Write-Host "  ✓ Backend dependencies already installed" -ForegroundColor Gray
}
Pop-Location

# Frontend dependencies
Push-Location "frontend"
if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing frontend dependencies..." -ForegroundColor Gray
    npm install --silent
}
else {
    Write-Host "  ✓ Frontend dependencies already installed" -ForegroundColor Gray
}
Pop-Location

Write-Host "✓ All dependencies installed" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 3: Create Environment Files
# ============================================================================
Write-Host "[3/5] Configuring environment..." -ForegroundColor Yellow

$backendEnvPath = "backend\.env"
if (-not (Test-Path $backendEnvPath)) {
    Write-Host "  Creating backend\.env..." -ForegroundColor Gray
    $backendEnv = @"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stash
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
NODE_ENV=development
"@
    Set-Content -Path $backendEnvPath -Value $backendEnv
    Write-Host "  ✓ Created backend\.env" -ForegroundColor Green
}
else {
    Write-Host "  ✓ backend\.env already exists" -ForegroundColor Gray
}

$frontendEnvPath = "frontend\.env"
if (-not (Test-Path $frontendEnvPath)) {
    Write-Host "  Creating frontend\.env..." -ForegroundColor Gray
    $frontendEnv = @"
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Stash Mada
"@
    Set-Content -Path $frontendEnvPath -Value $frontendEnv
    Write-Host "  ✓ Created frontend\.env" -ForegroundColor Green
}
else {
    Write-Host "  ✓ frontend\.env already exists" -ForegroundColor Gray
}

Write-Host "✓ Environment configured" -ForegroundColor Green
Write-Host ""

# ============================================================================
# STEP 4: Database Setup (optional)
# ============================================================================
Write-Host "[4/5] Database setup..." -ForegroundColor Yellow

$setupDb = Read-Host "Initialize PostgreSQL database now? (y/n)" 
if ($setupDb -eq 'y' -or $setupDb -eq 'Y') {
    try {
        $pgPath = "C:\Program Files\PostgreSQL\*\bin\psql.exe"
        $psqlExe = Get-Item $pgPath -ErrorAction SilentlyContinue | Select-Object -First 1
        
        if ($psqlExe) {
            Write-Host "  Running database migration..." -ForegroundColor Gray
            & $psqlExe.FullName -U postgres -f database.sql 2>$null
            Write-Host "  ✓ Database initialized" -ForegroundColor Green
        }
        else {
            Write-Host "  ⚠ PostgreSQL not found in Program Files" -ForegroundColor Yellow
            Write-Host "    Run manually: psql -U postgres -f database.sql" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "  ⚠ Could not initialize database" -ForegroundColor Yellow
        Write-Host "    Run manually: psql -U postgres -f database.sql" -ForegroundColor Gray
    }
}
else {
    Write-Host "  ⚠ Skipped database setup" -ForegroundColor Yellow
    Write-Host "    Run manually: psql -U postgres -f database.sql" -ForegroundColor Gray
}
Write-Host ""

# ============================================================================
# STEP 5: Start Application
# ============================================================================
Write-Host "[5/5] Starting application..." -ForegroundColor Yellow
Write-Host ""

if ($Mode -eq 'dev') {
    Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║      DEVELOPMENT MODE - Both servers       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Frontend: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "  Backend:  http://localhost:3000" -ForegroundColor Cyan
    Write-Host "  API:      http://localhost:3000/api" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Press Ctrl+C to stop both servers" -ForegroundColor Gray
    Write-Host ""
    
    npm run dev
}
elseif ($Mode -eq 'build') {
    Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║      BUILDING FOR PRODUCTION               ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    
    npm run build
    
    Write-Host ""
    Write-Host "✓ Build complete!" -ForegroundColor Green
    Write-Host "  Frontend built to: backend/dist/" -ForegroundColor Gray
    Write-Host ""
    Write-Host "  To start the production server, run:" -ForegroundColor Yellow
    Write-Host "  npm start" -ForegroundColor Cyan
    Write-Host ""
}
elseif ($Mode -eq 'start') {
    Write-Host "╔════════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║      PRODUCTION MODE - Single Server       ║" -ForegroundColor Green
    Write-Host "╚════════════════════════════════════════════╝" -ForegroundColor Green
    Write-Host ""
    Write-Host "  App: http://localhost:3000" -ForegroundColor Cyan
    Write-Host "  API: http://localhost:3000/api" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  Press Ctrl+C to stop" -ForegroundColor Gray
    Write-Host ""
    
    npm start
}
