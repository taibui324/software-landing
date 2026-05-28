# DESIGN.md: Orca

## Source
- URL: https://www.heyfabrika.com/
- Capture date: 2026-05-28
- Evidence: Firecrawl branding scrape, Firecrawl screenshot scrape, page markdown scrape, source HTML/CSS fetch, and direct page text inspection.

## Reference Screenshot
![Full-page screenshot of HeyFabrika](./.firecrawl/heyfabrika-firecrawl-screenshot.png)

Firecrawl's browser screenshot captured the source site's client-side error state. Use the downloaded source HTML and CSS as the source of truth for content, section order, tokens, and component behavior.

## Design Summary
Orca uses a stark monochrome software-consulting aesthetic: white canvas, near-black typography, square black highlight blocks, thin borders, compact navigation, and large centered type. The design relies on strong contrast, generous vertical spacing, sharp rectangular controls, amber signal accents, motion hints, skeleton brand blocks, and a dense but elegant service grid.

## Design Tokens

### Colors
- Background: `#ffffff`
- Foreground: `#18181b`
- Primary: `#27272a`
- Primary foreground: `#fafafa`
- Muted surface: `#f4f4f5`
- Border: `#e4e4e7`
- Signal/accent: `#f59e0b`
- Muted text: `#71717a`
- Success/status: `#34d399`

### Typography
- Primary font: Manrope, with system sans fallback.
- Headings: 600-800 weight, tight line height, no negative letter spacing.
- Hero scale: 44-72px desktop, 40px mobile.
- Body: 15-18px, medium weight in hero, regular elsewhere.
- Mono accent labels use a monospace fallback.

### Spacing And Layout
- 8px base unit.
- Sticky top header, 80-96px tall.
- Sections use 72-128px vertical rhythm.
- Content width ranges from 1120px to 1280px.
- Buttons are rectangular, 0px radius, 48px height.
- Cards and tiles use thin borders, 0-10px radius, subtle gray surfaces.

## Components
- Header: sticky, translucent white, logo at left, centered simple nav, circular placeholder at right, mobile menu button.
- Logo: abstract Orca mark with a dark rounded square, white orca-fin shape, and amber signal stroke.
- Hero: centered two-line headline with black highlighted animated word, rich inline highlighted description, two CTA buttons, availability status dot, and a Firecrawl-inspired moving partner/tool strip with bordered cells and amber underline accents.
- Services: headline plus six bordered service tiles with grid-pattern icon fields and short descriptions.
- CTA band: muted full-width section with split copy, rectangular button, process tags, and an animated code-generation console over a subtle dotted globe field.
- Product/client sections: large text with highlighted rotating word, Firecrawl-inspired overlapping product browser previews on an amber rail, and testimonial cards with carousel controls.
- FAQ: accordion rows with plus/minus indicator.
- Contact: left contact details and socials, right bordered form.

## Page Patterns
- Section order: header, hero, moving partner/tool strip, services, 24/7 CTA, products, client CTA/testimonial area, FAQ, contact/footer.
- Mobile: nav collapses, hero type scales down, cards become one column, contact form stacks.
- Interactions: rotating headline words, code typing animation, partner marquee, testimonial carousel controls, button hover contrast, FAQ accordion, mobile menu.
- Theme: header day/night toggle switches between bright and dark modes and persists the user's choice.

## Content Style
Short confident software-consulting copy, direct verbs, highlighted nouns, and CTAs such as "Book a Call", "See Our Work", and "Submit". Emphasis is created by black rectangular text highlights and small amber signal accents instead of decorative imagery.

## Agent Build Instructions
Build a monochrome, Manrope-style landing page for Orca with strong centered type and rectangular black highlight labels. Position Orca as a software consulting company that builds custom software, AI automations, internal tools, workflow integrations, product strategy, and ongoing support. Keep controls square, borders thin, backgrounds mostly white or light zinc gray, and use motion sparingly for rotating words, partner/tool marquees, code-generation previews, and fade-in sections. Use amber as a restrained operational signal color, especially for status indicators, partner-strip hover accents, and code cursors. Do not overdecorate; use dense service tiles, minimal icons, and strong copy hierarchy.

## Rerun Inputs
workflow: firecrawl-website-design-clone
source_url: https://www.heyfabrika.com/
target_stack: static HTML/CSS/JS
output: DESIGN.md plus implemented static page
