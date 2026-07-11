# Gulf Coast Clinical Consulting

Premium single-page site for Dr. Kim D. Littles, DNP, MSN, RN-BC — Legal Nurse Consulting.

## Local preview

```bash
cd site
python -m http.server 8765
# open http://localhost:8765
```

## Project structure

```
kimlittle/
├── netlify.toml                    # Pins publish = "site"
├── README.md
├── research/
│   ├── 01-client-brand.md
│   ├── 02-competitor-analysis.md
│   ├── 03-build-brief.md
│   └── 04-quality-audit.md
└── site/
    ├── index.html                  # Homepage
    ├── competitive-analysis.html   # Client-only competitive report (noindex)
    ├── robots.txt
    ├── sitemap.xml
    ├── css/style.css
    ├── js/main.js
    └── assets/
        ├── logo.png                # Gulf Coast Clinical Consulting mark
        └── founders/
            └── kim-littles.jpg     # Dr. Littles hero portrait
```

## Deploy — Netlify

1. Sign in at netlify.com and click **Add new site → Import from Git** (or drag-drop the project folder).
2. Netlify auto-detects `netlify.toml`. `publish = "site"` pins the correct directory.
3. Set the site's custom domain when ready (Site Settings → Domain management).

## Deploy — Vercel

If you prefer Vercel, add a `vercel.json` at the project root:

```json
{ "outputDirectory": "site" }
```

Or use the Vercel CLI: `vercel --prod` from the project root.

## Editing the site

- **Copy changes:** edit `site/index.html` directly.
- **Palette / typography:** all tokens live at the top of `site/css/style.css` under `:root`.
- **Motion:** all animation lives in `site/js/main.js`. GSAP + ScrollTrigger are loaded from CDN.

## Contact form

The form currently posts to a Formspree placeholder. Two options:

1. **Formspree:** replace `YOUR_FORM_ID` in `site/index.html` with your Formspree endpoint.
2. **Netlify Forms:** add `data-netlify="true"` and a `name` attribute to the `<form>` element. Netlify picks it up automatically.

## Attribution

The footer credit "Created by Chatbot Boy AI" is a required element on this build. Please keep it in place.
