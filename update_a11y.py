import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update status indicators with icons for color-blind accessibility
content = content.replace('keine Plätze mehr verfügbar', '✕ keine Plätze mehr verfügbar')
content = content.replace('noch 4 Plätze frei', '✓ noch 4 Plätze frei')

# 2. Add title/aria-label to navigation links if missing
nav_links_replacements = {
    'href="#willkommen" class="nav-link"': 'href="#willkommen" class="nav-link"', # Already has good text
}

# 3. Add focus-visible styles to CSS
focus_styles = """
        :focus-visible {
            outline: 3px solid var(--secondary);
            outline-offset: 2px;
        }
"""

if ":focus-visible" not in content:
    content = content.replace("/* Section Base */", focus_styles + "\n        /* Section Base */")

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully updated accessibility in index.html")
