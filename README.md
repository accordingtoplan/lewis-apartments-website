# Lewis Apartments Website Redesign

Brand-faithful redesign of [lewisapartments.com](https://www.lewisapartments.com), built to match the Lewis Group of Companies brand system.

## Brand
- **Sub-brand color:** Teal `#196464`
- **Primary:** Lewis Blue `#052C37`
- **Background:** Cream `#FFFBF8`
- **Type:** Haffer SQ (Regular, Medium, SemiBold), self-hosted in `fonts/`
- **Copy and facts:** follow the Lewis brand system (voice, names, claims, awards). Change list: `apartments-redesign-changes.md` in the Lewis project folder

## Structure
```
/
├── index.html              # Home
├── about-us/               # About
├── our-communities/        # Communities, with filters
├── single-family-homes/    # Rental homes
├── residents/              # Resident's corner
├── contact-us/             # Contact
├── 404.html
├── includes/               # nav.html, footer.html, shared.css
├── js/includes.js          # Loads the nav; loads the footer only where a page lacks it
├── fonts/                  # Haffer SQ
└── tools/sync-footer.py    # Copies includes/footer.html into every page
```

The footer lives in `includes/footer.html`. After editing it, run `python3 tools/sync-footer.py` so every page carries it in its HTML (the legal lines must not depend on JavaScript).

Links between pages are relative (`about-us/`, `../contact-us/`), so they work on GitHub Pages and on a root domain. The nav and footer still use `/lewis-apartments-website/` paths; change those when the site moves to lewisapartments.com.

## Roadmap
- [x] Phase 1: homepage prototype (HTML)
- [x] Inner pages: Communities, Single-family homes, About, Residents, Contact, 404
- [x] Copy aligned with the Lewis brand system
- [ ] Open questions for Lewis: community list, legal footer, ranking source, business colors (see `apartments-redesign-changes.md` in the Lewis project folder)
- [ ] Next.js scaffold and component library
- [ ] Headless WordPress integration (WP REST API)
- [ ] Production deploy

## Reference
- Parent brand: [lewisgroupofcompanies.com](https://lewisgroupofcompanies.com)
- Sub-brand reference: [lewisretailcenters.com](https://lewisretailcenters.com)
- Current site (to replace): [lewisapartments.com](https://www.lewisapartments.com)

