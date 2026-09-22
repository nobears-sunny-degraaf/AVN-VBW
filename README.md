# AVN-VBW — Storyblok × Nuxt multi-site

A Nuxt 4 monorepo that serves multiple websites from one codebase and one Storyblok
space. Blocks are shared through a base Nuxt Layer; a site that needs something
different overrides that single file.

```
layers/base/      shared layer — blocks, composables, app shell, Nuxt UI, Storyblok
sites/avn/        site app  ·  port 3000  ·  Storyblok folder avn/
sites/vbw/        site app  ·  port 3001  ·  Storyblok folder vbw/
```

## Getting started

```bash
npm install
cp .env.example .env   # fill in STORYBLOK_DELIVERY_API_TOKEN
npm run dev            # both sites at once
```

`npm run dev` starts both dev servers side by side with prefixed output, and
stops both when you stop one. Use `npm run dev:avn` / `npm run dev:vbw` to run a
single site.

Both sites read the same root `.env` (each app passes `--dotenv ../../.env`).

### HTTPS certificates

The Storyblok Visual Editor loads the site in an iframe, so localhost needs a
certificate the browser actually trusts — an untrusted one fails silently in a
frame, with no click-through interstitial. Nuxt's `devServer.https: true` only
produces a self-signed certificate, so the repo uses mkcert instead:

```bash
brew install mkcert   # once
npm run certs         # writes .certs/, gitignored
```

`layers/base/nuxt.config.ts` picks `.certs/` up automatically and warns on start
if it is missing.

## How the scoping works

Each site app declares which Storyblok folder it owns, and nothing else:

```ts
// sites/avn/nuxt.config.ts
runtimeConfig: { public: { site: { key: SiteKey.Avn, label: "AVN" } } }
```

`useSiteStory()` in the base layer prefixes every request with that folder, so a
site cannot address content outside it: `/` fetches `avn/`, `/over-ons` fetches
`avn/over-ons`. `useSiteLink()` strips the prefix again when resolving Storyblok
multilinks back to local routes.

## How overriding works

Blocks live in `layers/base/app/storyblok/` and are registered globally so
Storyblok can resolve them by name. Each site declares its own block directory,
and because the root app has a higher layer priority than the layers it extends,
a file with the same name wins:

| Block   | AVN                              | VBW                              |
| ------- | -------------------------------- | -------------------------------- |
| page    | base                             | base                             |
| grid    | base                             | base                             |
| teaser  | base                             | `sites/vbw/app/storyblok/`       |
| feature | `sites/avn/app/storyblok/`       | base                             |

Colours are overridden the same way, through each site's `app/app.config.ts`.

## Adding a site

1. Copy `sites/avn/` to `sites/<new>/`, change the port and the `site` key.
2. Add the key to `SiteKey` in `layers/base/app/types/site.ts`.
3. Create the matching folder in Storyblok with real path `/`.

No blocks are duplicated. Drop the `components` line from the new site's config
until it actually needs a block of its own.

## Storyblok space

Folder-per-site. Every story has an explicit real path.

```
avn/            folder
  Home          /
  Over ons      /over-ons
  Navigation    /
vbw/            folder
  ...
```

Blocks: `page`, `teaser`, `grid`, `feature`, `navigation`, `nav_link`.

### Visual Editor preview URLs

Storyblok builds the preview URL by concatenating the environment URL with the
story's **real path**, with no slash normalisation. So every story carries its own
real path starting with `/` (`/`, `/over-ons`), and the environment URLs carry
**no trailing slash**.

Folder start pages are deliberately not used: the space option
`clear_real_path_on_startpage` wipes a start page's real path, which makes it fall
back to its full slug and produces `https://localhost:3001vbw/`.

Set these once under **Settings → Visual Editor** (they cannot be set through the
Management API):

| Environment | URL                      |
| ----------- | ------------------------ |
| AVN         | `https://localhost:3000` |
| VBW         | `https://localhost:3001` |

No trailing slashes.

Pick the matching environment in the editor when you open a story.

## Scripts

| Command                | What it does                        |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | Both dev servers at once            |
| `npm run dev:avn`      | AVN dev server on https://localhost:3000 |
| `npm run dev:vbw`      | VBW dev server on https://localhost:3001 |
| `npm run build:avn`    | Production build for AVN            |
| `npm run build:vbw`    | Production build for VBW            |
| `npm run typecheck`    | Typecheck every site                |
| `npm run certs`        | Generate trusted localhost certificates |
