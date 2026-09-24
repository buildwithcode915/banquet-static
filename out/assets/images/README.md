# Gallery image sources and prompts

Generated with the built-in image-generation tool for this website. These are fictional celebration inspiration images, not photos of Shyama Utsav Hall. The website labels them accordingly.

Saved assets in this directory:
- inspiration-stage.webp
- inspiration-dining.webp
- inspiration-entrance.webp
- inspiration-cake.webp

All four were resized to 960 x 1200 and encoded as WebP at quality 85. Original generations remain in the Codex generated_images directory.

## Exact prompt construction

Each prompt combines the following prefix, one subject paragraph, and the suffix.

Prefix: Create one photorealistic editorial inspiration photograph for a banquet website gallery. Portrait 4:5 composition.

Stage: An elegant Indian wedding stage with ivory floral arch, restrained blush roses and champagne drapery, warm amber lighting, symmetrical architecture, no people.

Dining: An intimate celebration dining table, ivory linen, brass candle holders, blush roses, refined place settings, warm evening bokeh, close three-quarter view, no people.

Entrance: A welcoming Indian celebration entrance with marigold garlands, ivory flowers and brass lanterns, softly lit at dusk, sophisticated plum and gold accents, no people.

Cake: An elegant ivory two-tier celebration cake with delicate blush flowers, on a brass pedestal, plum fabric background and warm fairy-light bokeh, editorial still life, no text or people.

Suffix: Warm cinematic light, tactile natural materials, refined realistic details, premium photography. No logos, text, watermarks, collages or UI. This is a fictional celebration inspiration image, not documentation of any actual venue.

## Replacing with venue photographs

The current gallery entries are in components/celebration-gallery.tsx, relative to the project root. Update their filenames, captions and alt text when actual photos are supplied, and remove the inspiration label only for verified venue photos. Hero photo configuration remains in content/photos.ts.
