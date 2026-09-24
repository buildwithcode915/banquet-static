# Shyama Utsav Hall

A standalone Next.js 16 / React 19 / TypeScript banquet website with a static export for temporary hosting.

## Local development

Requires Node.js 20.19+ (Node.js 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3003.

## Validate and build

```sh
npm test
npm run build
npm run typecheck
```

Upload the contents of `out/` to the domain's public root, including `_next/` and `assets/`. No Node server, database or API is needed on the host. `out/` is committed as a ready-to-upload deliverable; rebuild and commit it alongside source changes. Opening the HTML as a local file is not supported; use an HTTP server.

## Features

- Hero and gallery image sliders with optional play/pause, keyboard arrows, image selectors and touch swipe.
- Rotation pauses on keyboard focus and mouse hover; hidden-page and offscreen behavior avoids unnecessary work.
- 3D gallery tilt, animated highlights, entrance animations and reduced-motion support.
- Planning steps, native FAQ disclosures, phone/WhatsApp contact and map directions.
- Four local WebP inspiration images, clearly labelled as AI-generated rather than actual venue photos.

## Editing

- `app/page.tsx`: page sections and public business information.
- `components/image-slider.tsx`: hero/gallery slides and controls.
- `components/celebration-gallery.tsx`: 3D image cards and captions.
- `components/planning-guide.tsx`: planning steps and FAQ answers.
- `app/globals.css`: responsive layout and animations.
- `public/assets/images/`: images and generation provenance.
- `RESEARCH.md`: reference sites, design decisions and validation notes.

To add real venue photos, put them in `public/assets/images/` and update the slider and gallery entries, captions and alt text. Remove the inspiration label only for verified venue photos. The optional invitation component and `content/photos.ts` remain available for the alternate invitation design.

Business information and branding originally came from the Business OS public website. No unverified prices, capacity, reviews or amenities were added. The website is an enquiry experience, not an online booking or payment system.

The GitHub repository contains this companion website only; it does not contain the Business OS backend or customer portal. Publishing the code to GitHub does not deploy the website to a hosting provider.
