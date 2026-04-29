# Muhammad Hoque Portfolio — Fixed Static Version

This is a fully static portfolio. Open it by double-clicking `index.html`.


## What was fixed

- Cleaned `index.html` formatting and indentation.
- Fixed the Leadership / Impact section closing indentation.
- Added `css/impact.css` for the new Leadership Highlights design.
- Imported `impact.css` in `css/main.css` before responsive styles.
- Added responsive rules for the Leadership Highlights grid.
- Updated social icon references to the included SVG files.

## Structure

```text
index.html
css/
  main.css          imports all CSS files
  tokens.css        colors, shadows, widths
  base.css          body, typography, global elements
  layout.css        sections, footer, broad layout
  header.css        top navigation
  social.css        right-side social/contact bar
  buttons.css       button styles
  hero.css          hero, operations panel, impact metrics
  sections.css      section headings, about flow, contact card
  cards.css         experience, skill, cert, education cards
  journey.css       career path timeline
  impact.css        leadership / impact highlights
  modal.css         resume popup
  animations.css    reveal animation
  responsive.css    tablet/mobile styles
js/
  navigation.js     mobile nav + active nav link
  modal.js          resume popup
  reveal.js         scroll reveal animation
  script.js         current year
assets/
  social_media/     LinkedIn, email, Medium icons
  favicon_io/       favicon.ico
```

## Common edits

- Hero text: edit `SECTION: HERO` in `index.html`.
- Leadership highlights: edit `SECTION: LEADERSHIP / IMPACT HIGHLIGHTS` in `index.html`.
- Leadership design: edit `css/impact.css`.
- Colors: edit `css/tokens.css`.
- Medium link: search for `href="#"` in `index.html` and replace it.
