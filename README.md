# Design Planner

Premium portfolio website for a design studio.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (ready to use via `framer-motion` package)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — redirects to `/ru` by default.

## Project Structure

```
src/
├── app/
│   ├── [locale]/           # /ru and /en routes
│   │   ├── layout.tsx      # Locale layout with nav + footer
│   │   ├── page.tsx        # Home page
│   │   └── projects/
│   │       ├── page.tsx    # Projects grid
│   │       └── [slug]/     # Individual project
│   │           └── page.tsx
│   ├── globals.css
│   └── layout.tsx          # Root layout (fonts, metadata)
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx  # Fixed nav with language switcher
│   │   └── Footer.tsx      # Minimal footer
│   ├── sections/
│   │   ├── Hero.tsx        # Full-screen hero
│   │   ├── ProjectsPreview.tsx
│   │   ├── Services.tsx
│   │   ├── Approach.tsx
│   │   ├── About.tsx
│   │   └── Contact.tsx     # Form with submit
│   └── ui/
│       └── FadeIn.tsx      # Scroll animation wrapper
├── lib/
│   ├── translations.ts     # RU/EN content
│   └── projects.ts         # Project data
└── hooks/
    └── useInView.ts
```

## Adding Projects

Edit `src/lib/projects.ts` — add a new entry with `slug`, bilingual text, and image URLs.

## Translations

All UI copy lives in `src/lib/translations.ts`. Both `ru` and `en` keys are fully typed.

## Customization

- Colors: `src/app/globals.css` (CSS variables) and `tailwind.config.ts`
- Typography: `--font-cormorant` (Cormorant Garamond from Google Fonts)
- Spacing / layout: each section component is self-contained

## Deployment

Works with Vercel out of the box. Set `NEXT_PUBLIC_SITE_URL` if needed.

```bash
npm run build
npm start
```
