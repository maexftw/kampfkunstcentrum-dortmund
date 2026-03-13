import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Update Hero visual styles
hero_styles_search = ".hero-title {"
hero_styles_replace = """.hero-title {
            font-family: 'Oswald', sans-serif;
            font-size: 4.5rem;
            font-weight: 700;
            line-height: 1.1;
            margin-bottom: 1.5rem;
            max-width: 800px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            background: linear-gradient(to right, #fff, #ccc);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }"""

# Update Comparison Card styles
card_styles_search = ".comparison-card {"
card_styles_replace = """.comparison-card {
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.08);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border: 1px solid rgba(0,0,0,0.05);
        }

        .comparison-card:hover {
            transform: translateY(-12px) scale(1.02);
            box-shadow: 0 20px 60px rgba(220, 38, 38, 0.15);
        }

        .comparison-card:hover .card-header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--dark) 100%);
        }"""

if hero_styles_search in content:
    content = content.replace(hero_styles_search + content.split(hero_styles_search)[1].split("}")[0] + "}", hero_styles_replace)

if card_styles_search in content:
    content = content.replace(card_styles_search + content.split(card_styles_search)[1].split("}")[0] + "}", card_styles_replace)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Successfully updated styles in index.html")
