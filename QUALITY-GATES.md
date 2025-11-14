# Quality Gates Checklist

Run these checks before every merge to production.

## Pre-Commit (Local Development)

### Code Quality
- [ ] No syntax errors or linter warnings
- [ ] Code follows project style guide
- [ ] Meaningful commit messages
- [ ] No commented-out code or debug statements
- [ ] No hardcoded credentials or API keys

### Functionality
- [ ] Feature works as intended
- [ ] Edge cases handled
- [ ] Error states implemented
- [ ] Loading states implemented (if applicable)

---

## Pre-Push (Before GitHub)

### Browser Testing
- [ ] Open `index.html` in browser (or dev server)
- [ ] No console errors (check DevTools)
- [ ] No 404s in Network tab
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] All interactive elements working

### Asset Verification
- [ ] All images load correctly
- [ ] External fonts rendering (Google Fonts, etc.)
- [ ] CDN resources loading (Tailwind, Flowbite, icons)
- [ ] Asset paths are relative (not absolute)

---

## Pre-Merge (After Preview Deploy)

### Preview URL Testing
- [ ] Preview URL loads without errors
- [ ] Test all pages/routes
- [ ] Test all user interactions (clicks, forms, navigation)
- [ ] Test on real mobile device (or browser DevTools)
- [ ] Check Network tab: no 404s, all resources loading
- [ ] Check Console: no JavaScript errors

### Performance
- [ ] Lighthouse audit run (Performance > 90)
- [ ] First Contentful Paint < 1.8s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Images optimized and lazy-loaded where appropriate
- [ ] Minimal JavaScript in initial load

### Accessibility (A11y)
- [ ] Visible focus states on interactive elements
- [ ] Alt text on all images
- [ ] Semantic HTML used (`<nav>`, `<main>`, `<footer>`, etc.)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] `prefers-reduced-motion` respected for animations
- [ ] ARIA labels where needed
- [ ] Color contrast ratio meets WCAG AA (4.5:1 for text)

### Security & Best Practices
- [ ] No mixed content warnings (HTTP resources on HTTPS page)
- [ ] External links have `rel="noopener noreferrer"` (if applicable)
- [ ] Forms have CSRF protection (if applicable)
- [ ] Sensitive data not exposed in client code

### Content
- [ ] No placeholder text (Lorem Ipsum, etc.)
- [ ] Correct spelling and grammar
- [ ] Links go to correct destinations
- [ ] Contact info is accurate
- [ ] Copyright year is current

---

## Deployment Checklist

### GitHub
- [ ] Branch is up-to-date with `main`
- [ ] No merge conflicts
- [ ] PR description includes: changes, testing notes, preview URL
- [ ] PR has meaningful title

### Cloudflare Pages
- [ ] Preview deploy successful (green checkmark)
- [ ] Preview URL tested and approved
- [ ] Build logs show no errors
- [ ] Custom domain configured (if applicable)

---

## Post-Merge (Production Monitoring)

### Immediate Checks (within 5 minutes)
- [ ] Production URL loads correctly
- [ ] No console errors on production
- [ ] No 404s or 500 errors
- [ ] Analytics tracking working (if applicable)

### 24-Hour Monitoring
- [ ] Check error logs (Cloudflare Analytics)
- [ ] Monitor performance metrics
- [ ] User feedback (if available)
- [ ] No security alerts

---

## Rollback Plan

If production has critical issues:

1. **Immediate**: Revert merge on GitHub
2. **Notify**: Inform team/stakeholders
3. **Investigate**: Review logs and errors
4. **Fix**: Create hotfix branch
5. **Test**: Run full QA checklist on hotfix
6. **Deploy**: Merge hotfix after approval

---

## Common Issues & Quick Fixes

### Assets Not Loading
- Check asset paths (relative vs absolute)
- Verify CDN URLs are correct
- Check browser DevTools Network tab

### Layout Broken
- Check CSS file loading order
- Verify Tailwind/Flowbite scripts loading
- Test in different browsers

### JavaScript Errors
- Check script loading order
- Verify CDN dependencies loaded
- Check for typos in function names

### Performance Issues
- Optimize images (compress, use WebP)
- Defer non-critical JavaScript
- Remove unused CSS/JS

---

## Quality Metrics

### Must-Have (Blocking)
- ❌ Any console errors
- ❌ Any 404/500 errors
- ❌ Broken core functionality
- ❌ Failed Lighthouse Accessibility score < 90

### Should-Have (Non-Blocking but Important)
- ⚠️ Lighthouse Performance < 90
- ⚠️ Layout shifts > 0.1
- ⚠️ Missing alt text on images
- ⚠️ Missing focus states

### Nice-to-Have (Future Improvements)
- ℹ️ Advanced animations
- ℹ️ Offline support (PWA)
- ℹ️ Advanced SEO optimization
- ℹ️ Multi-language support

---

## Automation Ideas (Future)

- **GitHub Actions**: Auto-run Lighthouse on PR
- **Pre-commit hooks**: Run linter before commit
- **Status badges**: Show build/deploy status in README
- **Automated testing**: Playwright/Cypress for E2E tests

---

**Remember**: Quality gates are not obstacles—they're guardrails that keep production stable and users happy.

