document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
  const chipTargets = Array.from(document.querySelectorAll('[data-animate="chip"]'));
  const allTargets = [...new Set([...revealTargets, ...chipTargets])];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const copyButton = document.querySelector('[data-copy]');
  const emailAddress = 'Probetraining-Kampfkunstcentrum-Dortmund@web.de';

  if (prefersReducedMotion) {
    allTargets.forEach((el) => el.classList.add('is-visible'));
  } else if (allTargets.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.matches('[data-animate="chip"]')) {
              const index = chipTargets.indexOf(entry.target);
              entry.target.style.transitionDelay = `${index * 80}ms`;
            }
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0.15 }
    );

    allTargets.forEach((el) => observer.observe(el));
  }

  if (copyButton && navigator.clipboard) {
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        const original = copyButton.textContent;
        copyButton.textContent = 'kopiert';
        copyButton.disabled = true;
        setTimeout(() => {
          copyButton.textContent = original;
          copyButton.disabled = false;
        }, 2000);
      } catch (error) {
        console.error('Clipboard error', error);
      }
    });
  }
});
