# Decisionary — Official Website

Official website for Decisionary, a South Korea-based custom software development and delivery business.
English is the default language; the site is also available in Korean, Japanese, Simplified Chinese, Traditional Chinese, Vietnamese, Thai, Indonesian and Malay.

**Live:** https://decisionarypro.com  
**Contact:** hello@decisionarypro.com

## Site structure

- `index.html` — homepage: hero, track record (founder line, outcome figures, six project cells with detail panels), services, who does what, what we agree before starting, process, FAQ and contact
- `cases.html` — case studies page: six projects led by the founder (overview, challenge, contribution, outcomes) with per-case inquiry links
- `privacy.html` — privacy information
- `i18n/<lang>.json` — translations for every language except English (ko, ja, zh-Hans, zh-Hant, vi, th, id, ms)
- `site.css` — design system and layouts, including per-language font and line-height rules
- `site.js` — language selection and loading, plus all interactions (menu, language menu, project panels, role rings, carousel, contact toggle)
- `assets/fonts/` — self-hosted fonts (see the README there)
- `assets/og/cases.png` — LinkedIn share preview image for the case studies page
- `favicon.svg`, `CNAME`, `robots.txt`, `sitemap.xml`

## Publishing

The website is served by GitHub Pages from `main` / `(root)`. Pushing to `main` triggers the deploy workflow. The custom domain is managed through Cloudflare DNS. Do not remove the `CNAME` file or alter MX/SPF/DKIM/DMARC email DNS records when updating the site.

## Languages

- English copy is written in the HTML. Elements with `data-i18n="key"` (and `data-i18n-aria` for labels) are replaced from `i18n/<lang>.json`.
- Language choice: `?lang=<code>` in the URL, then the visitor's saved choice (`localStorage` key `decisionary-lang`), then the browser language, otherwise English.
- Every key used in the pages must exist in every language file. Japanese and Chinese use full-width punctuation.
- Japanese, Chinese and Thai use the visitor's system fonts so no large font files are downloaded and no third-party font service is used.
- Translations other than English and Korean were machine-assisted and should be reviewed by native speakers before relying on them commercially, especially `privacy.html`. For those languages the privacy page notes that the English text prevails.

## Business copy policy

- Describe Decisionary as the customer-facing **contracting and delivery service provider**, not a freelance marketplace.
- Team composition, budget, technology and timelines must be verified for each engagement before making a commitment.
- Case studies are projects **led by the founder through previous employment and contractual engagements**. State this positively ("Projects led by Decisionary's founder"), keep the per-case badge and the fact note, and never present them as projects contracted or delivered by Decisionary.
- Keep client and product names out. Use the fixed industry labels on cells, case pages and inquiry subjects.
- Use outcome figures exactly as in the founder's manuscript, with the "Per project records" note once per outcome area.
- The founder appears as a one-line introduction with name, role, bio and LinkedIn link. No founder photo is published.
- Company details shown publicly: trade name (Decisionary · 디시저너리) and location (Seoul, Republic of Korea) only. Do not publish the business registration number or a detailed address. Revisit if payments or orders are added.
- Company LinkedIn: https://www.linkedin.com/company/decisionarypro/. Founder LinkedIn: https://www.linkedin.com/in/seoksoo-ko/. Keep the founder bio consistent with that profile.
- Add Decisionary's own delivery references only after client/publication permission.

## Maintenance notes

- Case inquiry buttons use `data-mail-case`; the email subject is built from the industry label in the selected language.
- There is no lead form, CRM integration, analytics or external ad tracking. Inquiry links use `mailto:`.
- Update the privacy notice if contact forms, analytics, cookies or third-party processors are added.
