# 🚀 START HERE

## Was du machen musst (in 60 Sekunden):

### 1. Template in neues Projekt kopieren
```bash
# Terminal öffnen und ausführen:
cp -r . /pfad/zu/deinem-neuen-projekt
cd /pfad/zu/deinem-neuen-projekt
```

**Windows PowerShell:**
```powershell
Copy-Item -Recurse "." "C:\Pfad\zu\deinem-neuen-projekt"
cd "C:\Pfad\zu\deinem-neuen-projekt"
```

### 2. SuperDesign-Ordner erstellen
```bash
mkdir -p .superdesign/design_iterations css js images
```

**Windows:**
```powershell
New-Item -ItemType Directory -Force -Path ".superdesign\design_iterations", "css", "js", "images"
```

### 3. Cursor öffnen
```bash
cursor .
```

### 4. Dem Agent sagen was du willst
Drücke `Ctrl/Cmd + Shift + P` → Schreibe: **"SuperDesign: Open Canva"**

Dann sage dem Agent:
```
"Design a modern landing page for [deine Idee]"
```

**Der Agent führt dich automatisch durch den Rest!**

---

## Was passiert automatisch:

✅ Agent erkennt `.cursor/rules/design.mdc` und folgt SuperDesign-Workflow  
✅ Du bestätigst Layout → Theme → Animation → HTML  
✅ Designs landen in `.superdesign/design_iterations/`  
✅ Du kannst sofort im Browser testen  

---

## Wenn du deployen willst:

1. **Styles extrahieren** → `css/` Ordner
2. **Scripts extrahieren** → `js/` Ordner  
3. **Git Init** → `git init && git add . && git commit -m "Initial"`
4. **GitHub** → Repo erstellen und pushen
5. **Cloudflare Pages** → GitHub verbinden, Auto-Deploy läuft

**Detaillierte Anleitung:** `SUPERDESIGN-TO-PRODUCTION.md`

---

## Brauchst du mehr Details?

- **Kompletter Workflow**: `SUPERDESIGN-WORKFLOW.md`
- **Deployment-Guide**: `SUPERDESIGN-TO-PRODUCTION.md`
- **Agent-Rollen**: `CURSOR-ROLES.md`
- **QA-Checkliste**: `QUALITY-GATES.md`

---

**Das war's. Viel Erfolg! 🎯**

