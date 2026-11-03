# Decisionary — Official Website

Official bilingual website for Decisionary, a South Korea-based custom software development and delivery business.

**Live:** https://decisionarypro.com  
**Contact:** hello@decisionarypro.com

## Site structure

- `index.html` — English-first semantic homepage, services, client types, delivery process, founder project summary cards, FAQ, and contact
- `cases.html` — case studies page: six projects led by the founder (overview, challenge, contribution, outcomes) with per-case inquiry links
- `assets/og/cases.png` — LinkedIn share preview image for the case studies page (rendered from `assets/linkedin/decisionary-cover.svg`)
- `site.css` — responsive design system, mobile navigation and layouts
- `site.js` — English/Korean translations and mobile menu interactions
- `privacy.html` — bilingual privacy information (shares the site footer content)
- `favicon.svg` — brand icon
- `CNAME` — custom domain for GitHub Pages
- `robots.txt` and `sitemap.xml` — search visibility

## Publishing

The website is served by GitHub Pages from `main` / `(root)`. Pushing to `main` triggers the deploy workflow. The custom domain is managed through Cloudflare DNS. Do not remove the `CNAME` file or alter MX/SPF/DKIM/DMARC email DNS records when updating the site.

## Business copy policy

- Describe Decisionary as the customer-facing **contracting and delivery service provider**, not a freelance marketplace.
- Team composition, budget, technology and timelines must be verified for each engagement before making a commitment.
- Case studies are projects **led by the founder through previous employment and contractual engagements**. State this positively ("Projects led by Decisionary's founder"), keep the per-case badge and the one-line fact note, and never present them as projects contracted or delivered by Decisionary.
- Keep client and product names out. Use the fixed industry labels (Education, Insurance, Mobility, Translation services, Consumer mobile, Public sector & Tourism) on cards, case pages and inquiry subjects.
- Use outcome figures exactly as in the founder's manuscript, with the "Per project records" note once per outcome area.
- Company details shown publicly: trade name (Decisionary · 디시저너리) and location (Seoul, Republic of Korea) only. Do not publish the business registration number or a detailed address. Revisit if payments or orders are added.
- Company LinkedIn: https://www.linkedin.com/company/decisionarypro/ (footer and contact section, not the header). Founder LinkedIn: https://www.linkedin.com/in/seoksoo-ko/. Keep the founder bio consistent with that profile.
- Add Decisionary's own delivery references only after client/publication permission.

## Maintenance notes

- English copy is embedded in `index.html` and `cases.html`; matching Korean translations appear under `const ko` in `site.js`, referenced by `data-i18n` keys. Both pages load `site.js`; the Korean page title comes from `data-title-ko` on `<html>`.
- Case inquiry buttons use `data-mail-industry` so the email subject follows the selected language.
- Update both languages when changing copy and verify no untranslated keys remain.
- There is no lead form, CRM integration, analytics or external ad tracking. Inquiry links use `mailto:`.
- Update the privacy notice if contact forms, analytics, cookies or third-party processors are added.
