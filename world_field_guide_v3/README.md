# World Field Guide v3

This version adds the image-ready clue system:
- dedicated clue detail pages (`clue.html?id=...`)
- `clue-details.json` for reliability / scope / exceptions / false friends / visuals
- reviewed-image slots with attribution metadata
- contribution form fields for image URL, source URL, credit, and licence
- image-policy section in methodology

## Deploy
Use a simple local server because the site fetches JSON files:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Important
The visual slots are deliberately placeholders until you attach reviewed images with attribution and source links.
