import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

skip_link_css = """
        /* Accessibility & Focus */
        .skip-link {
            position: absolute;
            top: -40px;
            left: 0;
            background: var(--primary);
            color: white;
            padding: 8px;
            z-index: 1001;
            transition: top 0.3s;
            text-decoration: none;
            font-weight: 600;
        }

        .skip-link:focus {
            top: 0;
        }
"""

skip_link_html = '<a href="#willkommen" class="skip-link">Zum Inhalt springen</a>'

if ".skip-link" not in content:
    content = content.replace("/* Accessibility & Focus */" if "/* Accessibility & Focus */" in content else ":focus-visible {",
                              skip_link_css + "\n        :focus-visible {")

if "skip-link" not in content:
    content = content.replace("<body>", "<body>\n    " + skip_link_html)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully added skip-link in index.html")
