import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_js = """
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('active');
            });

            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                });
            });
        }

        // Reveal Animations
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => {
            revealObserver.observe(el);
        });
"""

search_point = "// Navbar scroll effect"
if search_point in content:
    parts = content.split(search_point)
    # Insert before the scroll effect
    updated_content = parts[0] + new_js + "\n        " + search_point + parts[1]
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(updated_content)
    print("Successfully updated JS in index.html")
else:
    print("Search point not found")
