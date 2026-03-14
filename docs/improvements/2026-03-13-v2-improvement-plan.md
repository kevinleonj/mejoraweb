# mejoraweb v2 — Improvement Plan
**Created:** 2026-03-13
**Status:** Approved — pending branch creation
**Branch to create:** `feature/v2-improvements`

---

## Context

mejoraweb is a production landing page at https://mejoraweb.app, built with React 19 + Vite 7, deployed on Azure Static Web Apps. It is a sub-brand of **limeralda** (the parent company). All improvements below are to be implemented in a single feature branch, reviewed, then merged to `main`.

---

## Agreed Improvements

### 1. Language Toggle (ES / EN)

- Custom React context — no new heavy dependencies (single-page site, react-i18next is overkill)
- Translation files: `src/locales/es.json` (default) and `src/locales/en.json`
- **Default language: Spanish**
- Language preference persisted in `localStorage` key: `mejoraweb-language`
- Toggle UI: `ES | EN` in the header, active language highlighted in accent color (`#a5b4fc`)
- All visible text — headings, stats, descriptions, form labels, cookie banner, legal modals, footer — must be translatable

---

### 2. Team Cards — Content Update + Photos

- Add circular or rounded-rect avatar photo per card
- **Photo path:** `public/team/` — place files here as `kevin.jpg` (or `.webp`) and `andres.jpg` (or `.webp`)
  - Example: `public/team/kevin.jpg` → accessible in app as `/team/kevin.jpg`
- Card layout (top to bottom): photo → name → role → short bio → LinkedIn link
- Existing 2-column grid is preserved
- Content to be provided by Andres (names, roles, bios, LinkedIn URLs)

---

### 3. Contact Form

- New `Contact` section added above the footer in `App.jsx`
- Section anchor: `id="contacto"`
- **Fields:** Name, Email, Message (all required)
- **Submission:** `fetch()` POST to Cloudflare Worker (separate from limeralda's worker, for isolated metrics)
  - Environment variable: `VITE_CONTACT_WORKER_URL`
  - Request body: `{ name, email, message }`
- **Recipients (configured in the Cloudflare Worker):** `info@limeralda.com`, `andres@limeralda.com`, `kevin@limeralda.com`
- **Form states:** idle → sending (button disabled) → success → error
- A separate `.env.example` file will document the required env vars
- The `.env` file (with real values) is already in `.gitignore`

---

### 4. Footer Redesign

New **3-column layout**, collapses to single column on mobile:

| Column 1 — Brand | Column 2 — Navigation | Column 3 — Legal |
|---|---|---|
| `mejoraweb` logotype | Servicios | Privacy Policy (→ modal) |
| "by limeralda" sub-label | Proceso | Terms of Service (→ modal) |
| Short tagline | Equipo | Cookie Settings (→ modal) |
| | Contacto | |

Navigation links are anchor scroll links (`#servicios`, `#proceso`, `#equipo`, `#contacto`).

**Bottom bar (two sides):**
```
© 2026 mejoraweb. All rights reserved.       mejoraweb by limeralda ®
```
"limeralda" in the bottom bar links to the limeralda main site.

---

### 5. GDPR Cookie Banner

- Fixed bottom pop-up, slides up on first visit (when no consent stored)
- Consent stored in `localStorage` key: `mejoraweb-cookie-consent`
- Three actions: **Rechazar** | **Solo necesarias** | **Aceptar todo**
- "Cookie Settings" link in footer reopens the cookie modal
- Since mejoraweb uses no analytics/tracking currently, this is informational GDPR compliance
- Only localStorage is used (language pref + cookie consent choice)
- Contact form data: transmitted to Resend + Google Workspace (both GDPR-compliant via Standard Contractual Clauses)

---

### 6. Legal Modals (Privacy Policy, Terms of Service, Cookies)

- Reusable modal component (`src/components/LegalModal.jsx`)
- Three pieces of content (drafted, GDPR-compliant, based on limeralda's legal framework):
  - **Privacy Policy** — data controller (limeralda), what data is collected, legal basis (Art. 6(1)(f)), contact form data retention (12 months), right to erasure/access
  - **Terms of Service** — scope of services, limitation of liability, governing law (Spain)
  - **Cookie Policy** — list of cookies used (only localStorage), no third-party tracking
- Both ES and EN versions (tied to language toggle)

---

### 7. Header Navigation + Mobile Menu

**Desktop header (left to right):**
```
mejoraweb     Servicios   Proceso   Equipo   Contacto     [ES|EN]     [Solicitar auditoría →]
```

- Anchor links to each section
- Active section highlighted as user scrolls (IntersectionObserver — already used in codebase)
- **"Solicitar auditoría" CTA button** scrolls to `#contacto`
- **Mobile (< 640px):** hamburger menu — collapses links + CTA into a slide-down or overlay menu

---

### 8. Scroll-to-Top Button

- Small fixed button (bottom-right), appears after scrolling 400px
- Smooth scrolls back to top
- Subtle, non-intrusive design consistent with the dark theme

---

### 9. Section Anchor IDs

Add `id` attributes to every major section so nav links and footer links work:

| Section | ID |
|---|---|
| Hero | `#inicio` |
| Problems | `#problemas` |
| Services | `#servicios` |
| Process | `#proceso` |
| Team | `#equipo` |
| Contact | `#contacto` |

---

### 10. Favicon

- **Path:** `public/` root directory — create a subfolder `public/icons/` for all sized variants
  - Example structure:
    ```
    public/icons/
      favicon.ico
      favicon-16x16.png
      favicon-32x32.png
      favicon-96x96.png
      apple-touch-icon.png        (180x180)
      android-chrome-192x192.png
      android-chrome-512x512.png
    ```
- The main `favicon.ico` (or `favicon.svg`) should also be placed directly at `public/favicon.ico` so browsers find it automatically
- `index.html` will be updated to reference all icon sizes with proper `<link>` tags

---

## New Files to Create

| File | Purpose |
|---|---|
| `src/locales/es.json` | Spanish translation strings |
| `src/locales/en.json` | English translation strings |
| `src/context/LanguageContext.jsx` | Language context + provider hook |
| `src/components/CookieBanner.jsx` | GDPR cookie consent banner |
| `src/components/LegalModal.jsx` | Reusable modal for legal content |
| `src/components/ContactForm.jsx` | Contact form section |
| `src/components/NavMenu.jsx` | Mobile hamburger navigation |
| `src/components/ScrollToTop.jsx` | Fixed scroll-to-top button |
| `public/team/kevin.jpg` | Kevin's team photo (you provide) |
| `public/team/andres.jpg` | Andres' team photo (you provide) |
| `public/icons/` | Favicon folder (you provide) |
| `.env.example` | Documents required env variables |
| `docs/` | Internal documentation folder (this folder) |

## Files to Modify

| File | Changes |
|---|---|
| `src/App.jsx` | Section IDs, i18n wiring, team card images, contact section, scroll-to-top, updated team content |
| `src/css/style.css` | Footer 3-col layout, team card with image, header nav links, hamburger menu, cookie banner, modal, scroll-to-top button |
| `index.html` | Favicon link tags for all sizes |

---

## Open Questions / Pre-work Needed Before Coding

- [ ] Team photos: Kevin and Andres (place in `public/team/`)
- [ ] Team card content: updated bios, roles, LinkedIn URLs for both
- [ ] Favicon folder (place contents in `public/icons/`, place `favicon.ico` also at `public/favicon.ico`)
- [ ] Cloudflare Worker setup for contact form (separate from limeralda's) — URL goes in `.env` as `VITE_CONTACT_WORKER_URL`

---

## Out of Scope (Deferred)

- Testimonials / reviews section (needs real content)
- FAQ section (needs real content)
- WhatsApp/chat widget (adds visual noise, reconsider later)
- Dark/light mode toggle (dark theme is core to brand identity)
- Analytics (deferred, but contact form worker isolation sets up for it)
