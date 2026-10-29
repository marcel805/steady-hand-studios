# Steady Hand Studios — Project Blueprint

## Purpose
Steady Hand Studios (SHS) is a Johannesburg fabrication/build studio: bars,
counters, arches, signage, props and custom home furniture. The website exists
for **clients to see our work**. Clients include Teremana, Astral Tequila, ZYN,
FYZ, Red Bull, Ice Tropez, Jägermeister and others.

Pages: Home, Work (index + a "plate" per project), Services, About,
Work with us (send a portfolio by email), Contact.

> **Removed (Oct 2026):** the private contractor marketplace (portal, admin,
> NDA signing, Supabase). It is still in git history — the last commit that
> contained it is `1cfa85c` — if it is ever wanted back.

## Tech stack
- **Next.js 16** (App Router, Turbopack), **TypeScript**, **Tailwind CSS v4**
- No database, no auth, no environment variables.
- **Vercel** hosting, custom domain `steadyhandstudios.co.za` (GoDaddy registrar,
  DNS A record → Vercel's `216.198.79.1`, root redirects to `www`)
- **GitHub**: `github.com/marcel805/steady-hand-studios` — pushed via **GitHub
  Desktop only** (no git CLI credentials on this machine; `git push` from Bash
  fails with "could not read Username")
- Local project lives at `~/Sites/steady-hand-studios` — **outside** the Google
  Drive folder on purpose (Drive is only the source of brand assets/photos,
  never the codebase, to avoid syncing `node_modules`)

## Folder structure
```
src/app/
  page.tsx               Home (hero, client strip, index of work, three rules)
  work/page.tsx          Index of work
  work/[slug]/page.tsx   One plate per project (static, from src/lib/work.ts)
  services/ about/ careers/ contact/
  layout.tsx             Fonts, header, footer
  globals.css            Palette + type utilities (.disp, .cap, .stripe, .roundel)
  icon.png, apple-icon.png, favicon.ico   Orange S emblem
src/components/          SiteHeader, SiteFooter, PageHeader, ProjectIndex,
                         Stripe, PortfolioCTA, ContactForm
src/lib/work.ts          ALL project data: copy, materials, photos + sizes
public/brand/            Logos (logo-reversed.svg in header, patch.png in footer)
public/work/             Project photos
```

## Design ("Livery")
- Quiet page, loud work: bone background, deep-green panels, patch orange
  (`#e4521b`), cream. The photos supply the colour.
- Fonts: **Barlow Condensed** (display and labels, caps) + **Barlow Semi
  Condensed** (body). CNRGN Wider (the logo font) was tried earlier and rejected.
- Signature devices, used sparingly: the **rally stripe** (orange/cream/green)
  and the **rally-door roundel** (project numbers).
- References: craighill.co (most liked), fortstandard.com, ianschragercompany.com.
  Feel: vintage Japanese automotive, care, precision, rules, method.
- No em dashes anywhere in copy (use a hyphen or rewrite).

## Adding or editing a project
Edit `src/lib/work.ts`: add photos to `public/work/` (about 1800px wide JPEG),
then add an entry with `slug`, `client`, `title`, `type`, `summary`, `cover` and
`images` (with true pixel `w`/`h`). Spec rows (`size`, `buildTime`, `install`,
`year`) only appear once filled in. `materials` on current plates were read off
the photos and still need confirming.

## Open items
- Confirm `materials` per project and add size / build time / install / year.
- Photos are WhatsApp-compressed; replace with originals when available.
- Capability list on the Services page (steel, CNC, electrical, etc.) predates
  the redesign and has not been re-confirmed.
- Supabase project `csrzwlhuayfpcihwhgrd` and the three Supabase variables in
  Vercel are no longer used and can be deleted.
