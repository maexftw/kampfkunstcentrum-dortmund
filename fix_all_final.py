import re

with open('index.html', 'r') as f:
    content = f.read()

# 1. Fix Schedule Status
def replace_status(match):
    text = match.group(1)
    if 'keine' in text:
        return f'<span class="schedule-status" style="color: #dc2626; font-weight: 600; font-size: 0.9rem;"><i aria-hidden="true">✕</i> {text}</span>'
    else:
        # Avoid double checkmark if already present
        clean_text = text.replace('✓ ', '')
        return f'<span class="schedule-status" style="color: #16a34a; font-weight: 600; font-size: 0.9rem;"><i aria-hidden="true">✓</i> {clean_text}</span>'

content = re.sub(r'<span style="color: #(?:dc2626|16a34a); font-weight: 600; font-size: 0.9rem;">(.*?)</span>', replace_status, content)

# 2. Add Mobile Toggle CSS
mobile_css = """
        /* Mobile Menu Toggle */
        .menu-toggle {
            display: none;
            flex-direction: column;
            gap: 6px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.5rem;
            z-index: 1001;
        }

        .menu-toggle span {
            display: block;
            width: 25px;
            height: 2px;
            background: var(--dark);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (max-width: 768px) {
            .menu-toggle {
                display: flex;
            }

            .nav-links {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                height: 100vh;
                background: white;
                flex-direction: column;
                justify-content: center;
                padding: 2rem;
                transition: right 0.4s ease;
                box-shadow: -10px 0 30px rgba(0,0,0,0.1);
                z-index: 1000;
            }

            .nav-links.active {
                right: 0;
            }

            .menu-toggle.active span:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .menu-toggle.active span:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }
"""

if '/* Mobile Menu Toggle */' not in content:
    content = content.replace('/* Hero Section */', mobile_css + '\n        /* Hero Section */')

with open('index.html', 'w') as f:
    f.write(content)
