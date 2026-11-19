# Decisionary — Official Website

Official website for Decisionary, a South Korea-based custom software development and delivery business.
English is the default language; the site is also available in Korean, Japanese, Simplified Chinese, Traditional Chinese, Vietnamese, Thai, Indonesian and Malay.

**Live:** https://decisionarypro.com  
**Contact:** hello@decisionarypro.com

## Site structure

- `index.html` — homepage: hero, track record (founder line, outcome figures, six project cells with detail panels), services, who does what, what we agree before starting, process, FAQ and contact
- `cases.html` — case studies page: six projects led by the founder (overview, challenge, contribution, outcomes) with per-case inquiry links
- `privacy.html` — privacy information
- `ko/`, `ja/`, `zh-hans/`, `zh-hant/`, `vi/`, `th/`, `id/`, `ms/` — localized static home, case studies, privacy and checklist pages, plus service pages and guides where available
- `i18n/<lang>.json` — translation files the pages are generated from (also kept for reference)
- `site.css` — design system and layouts, including per-language font and line-height rules
- `site.js` — explicit language selection and language hints, plus all interactions (menu, language menu, project panels, role rings, carousel, contact toggle)
- `assets/fonts/` — self-hosted fonts (see the README there)
- `assets/og/cases.png` — LinkedIn share preview image for the case studies page
- `favicon.svg`, `CNAME`, `robots.txt`, `sitemap.xml`

## Publishing

The website is served by GitHub Pages from `main` / `(root)`. Pushing to `main` triggers the deploy workflow. The custom domain is managed through Cloudflare DNS. Do not remove the `CNAME` file or alter MX/SPF/DKIM/DMARC email DNS records when updating the site.

## Languages

- English uses the root URLs and other languages use their own paths, for example `/ko/cases.html`. Translated pages are static HTML with `<html lang>`, a self-canonical URL, and reciprocal `hreflang` links for the translations that exist. The 52 sitemap URLs include nine versions of each home, case studies, privacy and checklist page, five service pages in English, Korean and Japanese, and a Japanese guide.
- A direct visit stays on the URL requested. A saved language choice or browser preference can show a language suggestion when the corresponding page exists. The visitor can switch through the suggestion, footer or language menu. Legacy `?lang=<code>` links still redirect to the matching version when it exists.
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

- Scope check (`scope-check.html` in all nine languages, `scope-check.js`, `scope-check.css`, preview images `assets/og/scope-check-<lang>.png`): each language has a search title matched to local queries and a three-question FAQ (FAQPage data). English, Korean and Japanese have their own Tally inquiry forms. Other languages use the English form.
- Guides (`/<lang>/guides/<slug>.html`, styles in `guides.css`): articles built from a content JSON with the same frame as the service pages, Article + FAQPage data, and links to the checklist (`?src=guide-<lang>`). First one: `/ja/guides/before-comparing-quotes.html`.
- Scope check result: the result screen can copy an internal-report text or open a print view for "Save as PDF". The report is generated in the browser. Shared result links keep answers in the URL fragment. The checklist excludes the fragment from Umami, sends the risk band and language in completion and report events, and passes the risk band and language to Tally when opening the result inquiry.
- Case inquiry buttons use `data-form-case`; they open the inquiry form with the case number and industry in its hidden `case` field.
- Inquiries use Tally, bookings use Cal.com, and cookie-free website statistics use Umami. Email links use `mailto:`. A visit source tag can be passed to Tally and included in Umami when an inquiry link is clicked.
- Update the privacy notice if contact forms, analytics, cookies or third-party processors are added.
