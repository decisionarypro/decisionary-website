# Decisionary public website · v1.0

A bilingual (EN/KR) static marketing website for Decisionary's international software delivery business.

## Files

- `index.html`: main sales website with EN/KR language toggle
- `privacy.html`: current privacy information for an email-only inquiry workflow
- `favicon.svg`: brand mark
- `robots.txt` and `sitemap.xml`: search-engine discovery

## Preview

Open `index.html` in a web browser. No build system, packages, or external assets are required.

## Recommended go-live method

1. Create a **new** GitHub repository named `decisionary-website` under the connected GitHub account; keep unrelated repositories untouched.
2. Upload these files to the root of the new repository.
3. Enable GitHub Pages from `main` / root in repository **Settings → Pages** (or use a static hosting provider).
4. Confirm the temporary `.github.io` URL works and all navigation, bilingual content, privacy, and mailto links work on mobile.
5. In hosting configuration, add `decisionarypro.com` as custom domain. Add only the **website-specific** DNS records recommended by the hosting provider. **Do not remove or change existing MX, SPF, DKIM, or DMARC records**, since business email has already been tested and authenticated.
6. Enable HTTPS and check both apex and `www` redirect behaviors.
7. Inspect metadata/links, register site on Google Search Console, submit `sitemap.xml`, set up analytics only with a revised privacy disclosure, and test real enquiry messages from an external mailbox.
8. Then complete Clutch and Sortlist listing with the verified live site URL.

## Claims / compliance safeguards

- All four case studies are expressly founder-experience examples; they are **not** claimed as independently contracted Decisionary deliveries.
- No fabricated permanent engineering headcount, client logos, tech stack, SLA, testimonials, or delivery guarantees.
- Website uses `mailto:` rather than a fake form. Hosting/server logging may still occur, depending on provider.
- Update registered business disclosure, case-study publication permissions, tax / payment policies, and actual supplier availability before significant paid activity.