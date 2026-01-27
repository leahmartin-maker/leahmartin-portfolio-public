# Security Checklist for Web Projects

Use this checklist before launching any new site and during regular maintenance. Completing all items ensures your site meets industry security standards.

---

## 🚀 Pre-Launch Checklist (Before Going Live)

### Dependencies & Vulnerabilities
- [ ] Run `npm audit` in terminal (must show 0 vulnerabilities)
- [ ] Run `npm outdated` to check for out-of-date packages
- [ ] Update packages with `npm update` if needed
- [ ] Review any deprecation warnings in the console

### Environment Variables & Secrets
- [ ] Check .gitignore file includes .env.local
- [ ] Verify .env.local is NOT in GitHub repo
- [ ] Search code for any hardcoded API keys (use Ctrl+F to search for "sk-", "pk_", "API_KEY", "SECRET")
- [ ] All secrets use process.env.VARIABLE_NAME (not hardcoded strings)
- [ ] Verify all API keys are stored in .env.local

### Form Validation & User Input
- [ ] All forms validate required fields (no empty submissions)
- [ ] Email inputs validate correct format (uses email regex)
- [ ] All inputs trim whitespace: name.trim()
- [ ] Input length limits enforced (e.g., max 100 chars for name)
- [ ] Spam protection implemented (e.g., keyword blocking, rate limiting)
- [ ] Server-side validation on all form submissions (not just client-side)

### User Data Protection
- [ ] No user data (emails, phone numbers, submissions) in /public folder
- [ ] No sensitive files in /public folder (.env, passwords, etc.)
- [ ] User submissions stored securely (database or protected server location)
- [ ] Only public assets (images, fonts, icons) in /public

### Authentication & Admin Areas
- [ ] All admin/protected routes use real authentication (Supabase Auth, NextAuth.js, etc.)
- [ ] No simple code/password checks for admin access
- [ ] Admin passwords are strong and unique
- [ ] Admin pages cannot be accessed without login

### HTTP Security Headers
- [ ] Content-Security-Policy (CSP) header implemented in next.config.ts
- [ ] Referrer-Policy header set to 'strict-origin-when-cross-origin'
- [ ] X-Content-Type-Options header set to 'nosniff'
- [ ] X-Frame-Options header set to 'DENY' or 'SAMEORIGIN'
- [ ] Run security scan at https://securityheaders.com and review results

### HTTPS & Deployment
- [ ] Site uses HTTPS (verify URL starts with https://)
- [ ] Vercel or hosting platform is set to enforce HTTPS
- [ ] No mixed content warnings (all resources load over HTTPS)

### Code Review
- [ ] No test/debug routes exposed in production
- [ ] No console.log() statements with sensitive data
- [ ] No unused API routes or pages left behind
- [ ] Review /app/api folder for any routes that shouldn't be public

### Testing
- [ ] Test site on desktop and mobile
- [ ] Verify forms work and validate correctly
- [ ] Check that external services (Mapbox, Supabase, etc.) connect properly
- [ ] No JavaScript errors in browser console

---

## 🔄 Regular Maintenance (Weekly & Monthly)

### Weekly (Takes 10 minutes)
- [ ] Run `npm audit` (check for new vulnerabilities)
- [ ] Run `npm update` (update packages)
- [ ] If updates were made, test site locally and review changelog for breaking changes
- [ ] Monitor form submissions for spam or suspicious activity

### Monthly (Takes 30 minutes)
- [ ] Run `npm outdated` to see what packages can be updated
- [ ] Review security scan results at https://securityheaders.com
- [ ] Check GitHub for any security alerts on your repo
- [ ] Review user data stored (ensure it's still secure and necessary)
- [ ] Verify admin authentication still working properly
- [ ] Document any security changes or updates made

### Quarterly (Takes 1 hour)
- [ ] Review all environment variables and secrets
- [ ] Check if any third-party services (Mapbox, Supabase, etc.) have updates
- [ ] Run full security audit: npm audit + securityheaders.com + manual code review
- [ ] Update ABOUT_LEAH.md or project documentation with security status
- [ ] Test admin dashboard and any protected routes

### Annually (Takes 2 hours)
- [ ] Major version updates to Next.js, React, or other core dependencies
- [ ] Review all API integrations for security best practices
- [ ] Check if CSP or other headers need adjustment
- [ ] Review and update this checklist based on what you've learned

---

## 🛡️ Security Checklist by Feature Type

### For Portfolio/Personal Sites
- [ ] No authentication required (public site)
- [ ] No user data collection (or minimal)
- [ ] Security headers implemented
- [ ] Dependencies up to date

### For Contact Forms
- [ ] Email validation
- [ ] Spam protection
- [ ] Server-side form validation
- [ ] No user data stored in /public
- [ ] Rate limiting (optional but recommended)

### For Admin Dashboards
- [ ] Real authentication system (not just a code)
- [ ] Secure password management
- [ ] Admin routes protected from public access
- [ ] All actions logged (who did what, when)

### For Database Integration (Supabase, etc.)
- [ ] API key in .env.local only
- [ ] Row-level security (RLS) enabled on sensitive tables
- [ ] No direct database access from frontend
- [ ] Regular backups enabled

### For File Uploads
- [ ] File type validation (not just by extension)
- [ ] File size limits enforced
- [ ] Virus scanning (if handling user uploads)
- [ ] Store outside /public folder

---

## 📋 What "Secure" Means

**Your site is secure when:**
- ✅ Dependencies have 0 vulnerabilities (npm audit shows 0)
- ✅ Secrets are protected (.env.local in .gitignore)
- ✅ Forms validate and sanitize input
- ✅ User data is not publicly accessible
- ✅ Admin areas use real authentication
- ✅ Security headers are implemented
- ✅ You have a maintenance plan (and follow it)

**What "100% Secure" means:**
- It doesn't exist. Security is an ongoing process, not a destination.
- Even large companies have breaches. You're protecting against *common* attacks.
- Following this checklist puts you ahead of 90% of beginner developers.

---

## 🚨 If You Find a Security Issue

1. **Stop**: Don't publish or deploy further changes.
2. **Assess**: Is it a critical issue (e.g., exposed API key) or minor (e.g., outdated package)?
3. **Fix**: Address the issue and test locally.
4. **Deploy**: Push to GitHub and let Vercel redeploy.
5. **Document**: Add a note to this checklist if it's a recurring issue.

---

## 💡 Real World Context

Professional developers use checklists like this for every project. Before any production launch or client handoff, you go through this list. It takes time initially, but once it's a habit, it's automatic. Security isn't something you add "later"—it's built in from day one.

---

**Last Updated:** January 27, 2026  
**Status:** Ready for use on all new projects
