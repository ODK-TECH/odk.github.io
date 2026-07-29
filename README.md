# odk.github.io

Personal site for **Dominic Obeng Koranteng**, data scientist in Accra, Ghana.
Machine learning for education, health and agriculture. Founder of ODK Solutions Hub.

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

- `nana.jpg` — portrait, **square (1:1)**, ideally 1200×1200 or larger
- `THESIS.jpg` — mathematics performance project, 3:2 landscape. **Supplied** (schematic)
- `PoultryTech.jpg` — poultry monitoring project, 3:2 landscape. **Supplied** (schematic)
- `africare.jpg` — Africare project, 3:2 landscape. **Supplied** (refitted from your 1:1 original, nothing cropped)
- `premix.jpg` — premix fuel dissertation, 3:2 landscape. **Supplied.** Regenerate with
  `analysis/make_premix_figure.py` in the Premix-Fuel-Price-Analysis repo
- `mlworkflow.jpg` — breast cancer classifier, 3:2 landscape. **Supplied.** Real screenshot
  of the Streamlit prediction form, cropped to the app column with the Streamlit Cloud
  toolbar and deploy badge removed

Missing images fall back to a neutral placeholder block, so nothing breaks while you gather them.

**Every project image must be 3:2.** The card image box is locked to `aspect-ratio: 3 / 2`
with `object-fit: cover`, so a 3:2 file displays whole at every screen size and anything
else gets cropped to fit. The hero portrait box is 1:1, so `nana.jpg` should be square.

`THESIS.jpg` and `PoultryTech.jpg` are schematic illustrations, not plots of results. They
encode no accuracy, feature importance, mAP or confidence figures. Replace them with real
output whenever you have it. Regenerate either with `make_thumbnails.py`.

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
