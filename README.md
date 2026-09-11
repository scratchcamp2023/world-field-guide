# World Field Guide for GeoGuessr

Production-style static front-end for the World Field Guide concept.

## Pages
- `index.html` — landing page
- `guide.html` — country browser
- `country.html?id=japan` — dynamic country guide
- `explore.html` — Verified Clues browser
- `compare.html` — country comparison
- `contribute.html` — 100,000 Clues Project contribution flow
- `methodology.html` — verification standard

## Run locally
Because the site loads `data.json`, use a local HTTP server:

```bash
cd world_field_guide
python3 -m http.server 8000
```

Then open http://localhost:8000

## Important
This version is a complete static front-end, not a hosted production service.
A real public launch still needs:
- backend/database
- authentication and contributor profiles
- reviewer permissions
- image storage and licensing policy
- moderation / abuse controls
- version history and evidence logs
- deployment / domain / analytics

The seed data for Japan, Ghana, Colombia, Guatemala, and Taiwan is paraphrased from current Plonk It country guides for demonstration. Brazil, Indonesia, and South Africa are intentionally shown as “Building” rather than filled with unreviewed claims.

Independent community concept. Not affiliated with or endorsed by GeoGuessr.
