# QuickStart Guide

Dieses Template in 5 Minuten starten.

## Schritt 1: Template kopieren

```bash
# Neues Projekt anlegen
mkdir mein-neues-projekt
cd mein-neues-projekt

# Template-Dateien kopieren (passe den Pfad an!)
cp -r /pfad/zu/TEMPLATE/* .
cp -r /pfad/zu/TEMPLATE/.cursor .
```

**Windows (PowerShell):**
```powershell
mkdir mein-neues-projekt
cd mein-neues-projekt
Copy-Item -Recurse "C:\Pfad\zu\TEMPLATE\*" .
Copy-Item -Recurse "C:\Pfad\zu\TEMPLATE\.cursor" .
```

## Schritt 2: SuperDesign-Struktur einrichten

```bash
mkdir -p .superdesign/design_iterations
mkdir -p css js images
```

**Windows:**
```powershell
New-Item -ItemType Directory -Force -Path ".superdesign\design_iterations"
New-Item -ItemType Directory -Force -Path "css", "js", "images"
```

## Schritt 3: Cursor öffnen & SuperDesign starten

1. **Cursor öffnen**: `cursor .` oder öffne den Ordner in Cursor
2. **SuperDesign Canvas öffnen**: `Ctrl/Cmd + Shift + P` → `SuperDesign: Open Canva`
3. **Design starten**: Sage dem Agenten: "Design [deine Idee]"

**Beispiele:**
- "Design a modern landing page for a bakery"
- "Design a dark mode dashboard for analytics"
- "Design a mobile-first portfolio page"

## Schritt 4: Dem Workflow folgen

Der Agent führt dich automatisch durch:

### 1️⃣ **Layout** (ASCII Wireframe)
Agent zeigt dir Layout-Optionen → Du bestätigst

### 2️⃣ **Theme** (CSS Variablen)
Agent erstellt Farbpalette & Fonts → Du bestätigst

### 3️⃣ **Animation** (Micro-Syntax)
Agent definiert Transitions → Du bestätigst

### 4️⃣ **HTML** (Fertiges Prototype)
Agent baut Single-File HTML in `.superdesign/design_iterations/`

## Schritt 5: Lokal testen

```bash
# Öffne das HTML im Browser
open .superdesign/design_iterations/dein_design_1.html

# Oder mit Live Server (VSCode Extension)
# Rechtsklick auf HTML → "Open with Live Server"
```

## Schritt 6: Für Production anpassen

**Styles extrahieren:**
```bash
# Verschiebe inline <style> nach css/main.css
# Verschiebe <script> nach js/main.js
```

**Asset-Pfade anpassen:**
- ✅ `./css/main.css` (relativ)
- ❌ `/css/main.css` (absolut)

## Schritt 7: Git & Cloudflare

```bash
# Git initialisieren
git init
git add .
git commit -m "Initial commit from SuperDesign"

# GitHub Repo erstellen (auf GitHub.com)
# Dann remote hinzufügen:
git remote add origin https://github.com/dein-username/dein-repo.git
git push -u origin main
```

**Cloudflare Pages verbinden:**
1. [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create Project
2. GitHub verbinden → Repo auswählen
3. Build Settings:
   - Framework: `None`
   - Build command: (leer)
   - Output: `/`
4. Deploy!

---

## Häufige Befehle

### SuperDesign
```
Ctrl/Cmd + Shift + P → SuperDesign: Open Canva
```

### Git
```bash
git status                  # Zeige Änderungen
git add .                   # Stage alles
git commit -m "Nachricht"   # Commit
git push                    # Push zu GitHub
```

### Neue Features
```bash
git checkout -b feature/neues-design
# ... arbeiten ...
git push origin feature/neues-design
# Dann PR auf GitHub erstellen
```

---

## Troubleshooting

### Problem: Agent folgt nicht dem SuperDesign-Workflow
**Lösung**: Prüfe ob `.cursor/rules/design.mdc` existiert und SuperDesign Extension installiert ist

### Problem: Assets laden nicht auf Cloudflare
**Lösung**: Nutze relative Pfade (`./css/main.css` statt `/css/main.css`)

### Problem: Fonts werden nicht angezeigt
**Lösung**: Füge `<link rel="preconnect">` für Google Fonts hinzu

### Problem: Design sieht in Production anders aus
**Lösung**: Extrahiere inline Styles in externe CSS-Dateien

---

## Nächste Schritte

1. ✅ Template kopiert
2. ✅ SuperDesign gestartet
3. ✅ Erstes Design erstellt
4. ➡️ **Lies**: `SUPERDESIGN-WORKFLOW.md` (kompletter Design-Prozess)
5. ➡️ **Lies**: `SUPERDESIGN-TO-PRODUCTION.md` (Deployment-Guide)
6. ➡️ **Lies**: `QUALITY-GATES.md` (QA-Checkliste)
7. ➡️ **Lies**: `CURSOR-ROLES.md` (Agent-Verhalten)

---

**Viel Erfolg! 🚀**

Bei Fragen: Frag den Agent oder checke die ausführlichen Guides im Template.

