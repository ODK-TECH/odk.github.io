# odk.github.io

Personal site for **Dominic Obeng Koranteng**, data scientist in Accra, Ghana.
Machine learning for education, health, and agriculture. Founder of ODK Solutions Hub.

Live: <https://odk-tech.github.io/odk.github.io/>

---

## Files

| File | What it does |
| --- | --- |
| `index.html` | All page content. Edit copy here. |
| `styles.css` | Design tokens at the top, then components in order. |
| `script.js` | Theme, menu, scroll axis, reveals. No dependencies. |

Three files, no build step. Push to `main` and GitHub Pages serves it.

## Images to add

Drop these in the repo root next to `index.html`:

- `nana.jpg` — portrait, portrait orientation, ideally 1040×1300 or larger
- `THESIS.jpg` — mathematics performance project, 3:2 landscape
- `PoultryTech.jpg` — poultry monitoring project, 3:2 landscape
- `africare.jpg` — Africare project, 3:2 landscape

Missing images fall back to a neutral placeholder block, so nothing breaks while you gather them.

## Adding your CV

Put `Dominic_Resume.pdf` in the repo root, then uncomment the download button
in `index.html` (search for `Dominic_Resume.pdf`).

## Changing the palette

Everything derives from custom properties in `:root` and `[data-theme="dark"]`
at the top of `styles.css`.

```css
--bronze:   #C08A2E;   /* accent for rules, ticks and marks */
--bronze-t: #8A5F12;   /* darker bronze, used wherever accent becomes text */
--ink:      #14211D;   /* body text and solid buttons */
--paper:    #F2F3F0;   /* page background */
```

Keep `--bronze-t` darker than `--bronze` in light mode. The lighter tone fails
contrast at body text sizes.

## Adding a project

Copy one `<article class="entry reveal">` block in the Work section and edit it.
The layout is a three-column grid: domain label, image, body. It collapses to a
single column below 760px on its own.

## Type

- **Fraunces** for display, loaded as a variable font
- **IBM Plex Sans** for body text
- **IBM Plex Mono** for labels, metadata and buttons

All three come from Google Fonts in a single request.

## Accessibility and performance

- Skip link, visible focus rings, `aria-expanded` on the menu toggle
- `prefers-reduced-motion` disables the reveals and the underline animation
- Theme is set before first paint, so no flash on load
- Project images lazy-load; scroll handlers are throttled with `requestAnimationFrame`
- Print stylesheet strips the chrome so the page prints as a clean CV

## Contact

- Email: <dominicobengkoranteng@gmail.com>
- LinkedIn: <https://www.linkedin.com/in/dominic-obeng-koranteng-565571276/>
- GitHub: <https://github.com/ODK-TECH>
- ODK Solutions Hub: <https://odksolutionshub.com/>
