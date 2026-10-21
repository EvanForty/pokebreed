# PokéBreed

A pixel-art Pokémon breeding-agent launchpad with a warm meadow palette, an interactive family map, coin hover details, token discovery, agent controls, and card vault views.

## Use this repository

Extract the ZIP and place its contents at the root of your GitHub repository. Commit and push the extracted files, including `index.html`, the image, fonts, and `vercel.json`. Do not upload only the ZIP itself.

Every file is at the repository root. There are no nested folders. All image and font references have been updated for this flat layout.

The site is static HTML, CSS, and JavaScript. No build step or dependency installation is required.

To view locally with Python installed, run `python -m http.server 4173` from this directory, then open `http://localhost:4173`.

## Deploy on Vercel

Import the GitHub repository into Vercel. Keep the Root Directory at the repository root (leave it unset); do not select a nested folder. The included `vercel.json` selects the Other framework preset, skips build and install commands, and serves the root directory (`.`). No environment variables are required.

If an existing Vercel project points at a subfolder, clear its Root Directory before redeploying. Navigation uses URL hashes such as `/#map` and `/#vault`, so no rewrite rules are needed.

These settings follow [Vercel’s static-site build documentation](https://vercel.com/docs/builds/configure-a-build#skip-build-step) and [project configuration documentation](https://vercel.com/docs/project-configuration/vercel-json).

For GitHub Pages, publish the repository root.

## Files

- `index.html`: site shell, navigation, and the X profile link.
- `app.js`: page rendering, family data, and browser-persistent interactions.
- `map-expansion.js`: deterministic map generation across 43 families and six generations.
- `map-hover.js` and `map-hover.css`: coin detail cards for pointer hover and keyboard focus.
- `style.css`: layout and responsive styling.
- `daycare.css`: green, cream, yellow, and coral color theme.
- `pokebreed-egg.png`, the `.ttf` files, and the `*-OFL.txt` files: logo, fonts, and font licenses, all at the root.
- `vercel.json`: static deployment configuration.
- `.nojekyll`: keeps GitHub Pages serving these files directly.

## Data and integrations

The map and card records are generated from client-side data. Hatches, agent cycles, fee ledger state, and trainer progress are stored in the visitor's browser. Browser-wallet connection reads the public account address when a Solana provider is available. Blockchain transactions, card purchases, market feeds, and server-side autonomous agents are not implemented.

The site contains no API keys, hosting credentials, Git metadata, or account-specific hosting configuration. Connect your own services before using it for real token launches or financial activity.

## Assets

The pixel egg is a user-provided asset. Silkscreen and Space Grotesk font licenses are included at the root alongside the font files. The house postcard is not included.
