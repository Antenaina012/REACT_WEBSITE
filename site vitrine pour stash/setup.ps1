# Stash Mada - React Project Setup Script (PowerShell)
# This script sets up the entire project for development

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Stash Mada - React Project Setup" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

# Setup Backend
Write-Host "[1/4] Installing Backend Dependencies..." -ForegroundColor Yellow
$backendPath = Join-Path $PSScriptRoot "backend"
if (Test-Path "$backendPath\node_modules") {
    Write-Host "Backend dependencies already installed" -ForegroundColor Gray
} else {
    Push-Location $backendPath
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install backend dependencies" -ForegroundColor Red
        Pop-Location
        Read-Host "Press Enter to exit"
        exit 1
    }
    Pop-Location
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
Write-Host ""

# Setup Frontend
Write-Host "[2/4] Installing Frontend Dependencies..." -ForegroundColor Yellow
$frontendPath = Join-Path $PSScriptRoot "frontend"
if (Test-Path "$frontendPath\node_modules") {
    Write-Host "Frontend dependencies already installed" -ForegroundColor Gray
} else {
    Push-Location $frontendPath
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install frontend dependencies" -ForegroundColor Red
        Pop-Location
        Read-Host "Press Enter to exit"
        exit 1
    }
    Pop-Location
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
Write-Host ""

# Create Backend .env if not exists
Write-Host "[3/4] Checking Environment Configuration..." -ForegroundColor Yellow
$backendEnv = Join-Path $backendPath ".env"
if (-not (Test-Path $backendEnv)) {
    Write-Host "Creating backend\.env..." -ForegroundColor Gray
    $envContent = @"
DB_HOST=localhost
DB_PORT=5432
DB_NAME=stash
DB_USER=postgres
DB_PASSWORD=postgres
PORT=3000
"@
    Set-Content -Path $backendEnv -Value $envContent
    Write-Host "✓ Created backend\.env - Please update credentials" -ForegroundColor Green
} else {
    Write-Host "✓ backend\.env already exists" -ForegroundColor Green
}

$frontendEnv = Join-Path $frontendPath ".env"
if (-not (Test-Path $frontendEnv)) {
    Write-Host "Creating frontend\.env..." -ForegroundColor Gray
    $envContent = @"
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=Stash Mada
"@
    Set-Content -Path $frontendEnv -Value $envContent
    Write-Host "✓ Created frontend\.env" -ForegroundColor Green
} else {
    Write-Host "✓ frontend\.env already exists" -ForegroundColor Green
}
Write-Host ""

# Database setup instructions
Write-Host "[4/4] Database Setup..." -ForegroundColor Yellow
Write-Host ""
Write-Host "To initialize the database, run:" -ForegroundColor Yellow
Write-Host "  psql -U postgres -f database.sql" -ForegroundColor Cyan
Write-Host ""
Write-Host "Or manually:" -ForegroundColor Yellow
Write-Host "  createdb stash" -ForegroundColor Cyan
Write-Host "  psql -U postgres -d stash -f database.sql" -ForegroundColor Cyan
Write-Host ""

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Update database credentials in backend\.env" -ForegroundColor Cyan
Write-Host "  2. Initialize PostgreSQL database" -ForegroundColor Cyan
Write-Host "  3. Open 2 terminals:" -ForegroundColor Cyan
Write-Host "     - Terminal 1: cd backend; npm run dev" -ForegroundColor Cyan
Write-Host "     - Terminal 2: cd frontend; npm run dev" -ForegroundColor Cyan
Write-Host "  4. Open browser: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Documentation:" -ForegroundColor Yellow
Write-Host "  - QUICK_START.md - Fast 5-minute setup" -ForegroundColor Cyan
Write-Host "  - REACT_MIGRATION_GUIDE.md - Complete guide" -ForegroundColor Cyan
Write-Host "  - TRANSFORMATION_SUMMARY.md - What was created" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
