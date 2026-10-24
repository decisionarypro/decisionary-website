# Decisionary — Official Website

Official bilingual website for Decisionary, a South Korea-based custom software development and delivery business.

**Live:** https://decisionarypro.com  
**Contact:** hello@decisionarypro.com

## Site structure

- `index.html` — English-first semantic homepage, services, client types, delivery process, founder experience, FAQ, and contact
- `site.css` — responsive design system, mobile navigation and layouts
- `site.js` — English/Korean translations and mobile menu interactions
- `privacy.html` — bilingual privacy information
- `favicon.svg` — brand icon
- `CNAME` — custom domain for GitHub Pages
- `robots.txt` and `sitemap.xml` — search visibility

## Publishing

The website is served by GitHub Pages from `main` / `(root)`. Pushing to `main` triggers the deploy workflow. The custom domain is managed through Cloudflare DNS. Do not remove the `CNAME` file or alter MX/SPF/DKIM/DMARC email DNS records when updating the site.

## Business copy policy

- Describe Decisionary as the customer-facing **contracting and delivery service provider**, not a freelance marketplace.
- Team composition, budget, technology and timelines must be verified for each engagement before making a commitment.
- The Founder Experience section is explicitly **prior personal employment/engagement experience**, not independent delivery references of Decisionary.
- Add actual project delivery references only after client/publication permission.
- Link the LinkedIn company page when it has been created and its real URL is confirmed.

## Maintenance notes

- English copy is embedded in `index.html`; matching Korean translations appear under `const ko` in `site.js`, referenced by `data-i18n` keys.
- Update both languages when changing copy and verify no untranslated keys remain.
- There is no lead form, CRM integration, analytics or external ad tracking. Inquiry links use `mailto:`.
- Update the privacy notice if contact forms, analytics, cookies or third-party processors are added.
