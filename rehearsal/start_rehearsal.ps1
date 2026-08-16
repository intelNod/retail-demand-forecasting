$ErrorActionPreference = "Stop"
$projectRoot = Split-Path -Parent $PSScriptRoot
$python = Join-Path $projectRoot ".venv\Scripts\python.exe"

if (-not (Test-Path -LiteralPath $python)) {
    Write-Error "Project virtual environment was not found. Follow rehearsal/README_RU.md."
}

Set-Location -LiteralPath $projectRoot
Write-Host "Showcase:     http://127.0.0.1:5000/showcase"
Write-Host "Prediction UI: http://127.0.0.1:5000/"
Write-Host "Stop server: Ctrl+C"
& $python -m src.app
