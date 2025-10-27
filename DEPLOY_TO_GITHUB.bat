@echo off
echo.
echo ========================================
echo  Kampfkunstcentrum Dortmund
echo  GitHub Deployment Script
echo ========================================
echo.

echo Schritt 1: Erstelle GitHub Repository...
echo.
echo Bitte gehe zu: https://github.com/new
echo.
echo Einstellungen:
echo - Repository Name: kampfkunstcentrum-dortmund
echo - Description: Kampfkunstcentrum Dortmund - Wing Chun ^& Krav Maga
echo - Visibility: Public
echo - NICHT "Initialize with README" anklicken
echo - Klicke "Create repository"
echo.
pause

echo.
echo Schritt 2: Bitte gib deinen GitHub Username ein:
set /p GITHUB_USER="Username: "

echo.
echo Schritt 3: Remote hinzufuegen und pushen...
git remote add origin https://github.com/%GITHUB_USER%/kampfkunstcentrum-dortmund.git
git branch -M main
git push -u origin main

echo.
echo ========================================
echo Schritt 4: GitHub Pages aktivieren
echo ========================================
echo.
echo Gehe zu: https://github.com/%GITHUB_USER%/kampfkunstcentrum-dortmund/settings/pages
echo.
echo Einstellungen:
echo - Source: Deploy from a branch
echo - Branch: main
echo - Folder: / (root)
echo - Klicke Save
echo.
echo Deine Website wird verfuegbar sein unter:
echo https://%GITHUB_USER%.github.io/kampfkunstcentrum-dortmund/
echo.
pause
