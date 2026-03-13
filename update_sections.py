import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Add scroll-margin-top to sections for better navigation with fixed header
section_search = "section {"
section_replace = """section {
            padding: 6rem 2rem;
            scroll-margin-top: 80px;
        }"""

if section_search in content:
    content = content.replace(section_search + content.split(section_search)[1].split("}")[0] + "}", section_replace)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully updated sections in index.html")
