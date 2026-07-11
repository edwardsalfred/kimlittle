# Website Build Brief — Gulf Coast Clinical Consulting

**Client:** Dr. Kim D. Littles, DNP, MSN, RN-BC
**Date:** 2026-07-10
**Deliverable:** Single-page premium site with GSAP scroll motion, deployable to Netlify or Vercel.

---

## Design Direction

### Palette (final)
| Role | Hex | Where it appears |
|---|---|---|
| **Ink** | `#0A0A0A` | Body text, hero background, footer |
| **Paper** | `#FFFFFF` | Light sections, card backgrounds |
| **Bone** | `#F5F2EC` | Alternate light sections for visual rhythm |
| **Teal** | `#0E9F8F` | Section eyebrows, iconography, hover accents, hairlines |
| **Deep teal** | `#0A5B54` | Secondary buttons, gradient toning |
| **Red** | `#C8102E` | Primary CTA button only. One eyebrow accent. Nothing else. |
| **Muted ink** | `#4A4A4A` | Secondary body copy, captions |

Restraint rule: red is a spotlight color. If it shows up more than three times on the homepage, we've done it wrong.

### Typography
- **Headings:** Playfair Display (600, 700)
- **Body:** Inter (400, 500, 600)
- **Eyebrows:** Inter uppercase, tracked +.16em, 12–13px, teal or muted ink
- **Numbers/stats:** Playfair Display italic

### Photography
- Hero: Dr. Littles' portrait, right-aligned on desktop, framed by teal geometric accents. Framed diplomas in the background stay visible — free credentialing.
- No stock photography anywhere. If we need visual weight elsewhere, use typographic pull-quotes and subtle abstract accents, not generic law-office shots.

### Motion (GSAP + ScrollTrigger)
- **Hero:** Fade + slide-up on load. Subtle parallax on the portrait (max 8%). Cursor-following highlight glow behind the portrait — low intensity.
- **Section transitions:** `.reveal` class with y-offset + opacity, staggered by 60ms per child.
- **Stats band:** Count-up numbers (credentials, years, cases-reviewed) triggered on scroll. Never animate years.
- **Case-type strip:** Horizontal marquee that pauses on hover, scrolls in from right.
- **Cards:** Subtle 2px lift + shadow on hover. Teal underline expands under headings on hover.
- **CTA button:** Red with sub-pixel border, gentle scale on hover.
- **Fallback:** 3-second force-reveal so no `.reveal` element can stay `opacity: 0` on old browsers or accessibility tools.
- **Respect `prefers-reduced-motion`:** all animations disabled if requested; content is fully readable.

### What to avoid (based on competitor sins)
- Blue-and-white template look
- Carousels in the hero
- Generic "Contact us" CTAs
- Stock photos of gavels, stethoscopes, or handshakes
- Corporate deep-navy chrome
- ALL-CAPS hero headlines
- Anonymous testimonials

---

## Site Architecture

Single-page homepage with anchor navigation. Structure top-to-bottom:

1. **Nav** — logo left, anchor links (About, Services, For Attorneys, Contact) center, "Request a Case Review" CTA right.
2. **Hero** — headline + tagline + primary CTA + credentials strip + Dr. Littles' portrait.
3. **Credentials band** — dark strip with DNP • MSN • RN-BC • Board Certified badges.
4. **What We Do (Services)** — six service cards in a grid.
5. **Case Types We Support** — horizontal marquee of case-type verticals.
6. **About Dr. Littles** — bio, credential deep-dive, second CTA.
7. **Why Gulf Coast** — three-point value prop (regional expertise, doctorate-tier credentials, court-ready deliverables).
8. **Testimonial slot** — placeholder for two named-attorney quotes. Marked clearly with `<!-- TESTIMONIAL PLACEHOLDER -->`.
9. **FAQ** — five common questions attorneys ask (turnaround time, case types, fee structure, jurisdictions, deliverables).
10. **Contact / Request a Case Review** — form with attorney-friendly fields.
11. **Footer** — nav mirror, contact info, credit line, copyright.

Navigation:
- Desktop: horizontal nav.
- Mobile: hamburger drawer that overlays the full screen, closes on link click / Escape / resize above breakpoint.
- CTA button visible in both nav layouts.

---

## Content Framework

### Homepage headline options
1. **"Clinical expertise. Legal clarity."**  (short, memorable, ownable)
2. **"The medical record, decoded for the courtroom."** (specific, benefit-forward)
3. **"Board-certified nursing insight for attorneys who need answers, not opinions."** (long, credential-forward)

**Recommendation:** Option 1 for the H1 headline, Option 2 as the sub-headline. Together they read as a poised opening for a doctorate-credentialed practitioner.

### Value proposition (sub-hero paragraph)
> Dr. Kim D. Littles, DNP, MSN, RN-BC translates complex medical records into clear, defensible narratives. Attorneys retain Gulf Coast Clinical Consulting to evaluate case merit faster, prepare experts with confidence, and put decades of clinical experience to work in the courtroom.

### Services (six cards, each specific)
1. **Medical Record Review & Chronology** — Complete, court-ready timelines of care.
2. **Case Merit Screening** — Fast, honest go/no-go assessments before you commit resources.
3. **Standard-of-Care Analysis** — Clinical evaluation against accepted nursing and medical benchmarks.
4. **Expert Witness Location & Prep** — Match cases with credentialed experts, brief them on the record.
5. **Life Care Planning Support** — Long-range care projections for damages calculation.
6. **Deposition & Trial Preparation** — Turn clinical facts into cross-examination-ready material.

### Case types strip
Medical malpractice · Nursing home neglect · Birth injury · Personal injury · Product liability · Wrongful death · Elder abuse · Pharmaceutical liability

### About section beats
- Doctor of Nursing Practice (DNP).
- Master of Science in Nursing (MSN).
- Registered Nurse, Board Certified (RN-BC).
- Decades of bedside and clinical leadership experience.
- Trained specifically to bridge clinical practice and legal analysis.
- Gulf Coast-based, serving attorneys and firms nationwide.

### FAQ
1. What types of cases do you review?
2. How quickly can I get an initial merit assessment?
3. Do you work with plaintiff and defense counsel?
4. What deliverables come with a full case review?
5. What are your fees and engagement structure?

### SEO targets
- Primary: `legal nurse consultant Gulf Coast`
- Secondary: `medical record review attorneys`, `case merit review legal nurse consultant`, `nursing home neglect expert nurse`, `DNP legal nurse consultant`

---

## Conversion Playbook

- **Primary conversion:** "Request a Case Review" contact form submission.
- **Secondary conversion:** phone / email fallback links in the hero-meta bar and footer.
- **Social proof plan:**
  - Credentials band directly under hero.
  - Named-attorney testimonial slot mid-page (placeholder).
  - Case-type breadth strip signals depth of experience.
- **Trust signals checklist:**
  - Doctorate credential in H1's sub-copy.
  - Framed-diploma portrait background.
  - Board certification badge (RN-BC) in credentials band.
  - Named service deliverables (chronology, merit letter, life care plan).

---

## Tech Stack & Deliverables

- HTML5, CSS3, vanilla JS.
- GSAP 3 + ScrollTrigger from CDN.
- Google Fonts: Playfair Display + Inter.
- Single-page site: `site/index.html`.
- Deploy config: `netlify.toml` at project root pinning publish dir to `site/`.
- SEO: schema.org LocalBusiness + ProfessionalService JSON-LD, Open Graph tags, sitemap.xml, robots.txt.
- Accessibility: WCAG AA color contrast, semantic HTML, `prefers-reduced-motion`.
- Attribution: "Created by Chatbot Boy AI" credit in the footer.

---

# HARD STOP — Approval

**Approve this brief before I start building.**

If you want changes, tell me now:
- Different headline choice?
- Different service names / order?
- Different case-type list?
- Change to the palette?
- Add or remove sections?

If everything looks good, reply **"Approved, build it."** and I'll start Phase 5.
