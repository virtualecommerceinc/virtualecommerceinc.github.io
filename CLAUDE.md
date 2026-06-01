# VirtualEcommerce Inc. — Flagship Marketing Website

Project-level instructions for the new AI-agency marketing site. These OVERRIDE Dan's
global Claude_Workspace rules when working inside this folder.

Build date: 2026-06-01 · Time zone: America/New_York (Eastern)

---

## What this project is

A flagship, bold, high-energy marketing website for **VirtualEcommerce Inc.** — Dan's
AI website agency. Its one job: when a corporate decision-maker (e.g. a national
appliance franchise) clicks the link in Dan's outreach email, they feel within 10
seconds that "these people are clearly the real deal in AI." Treat it as a premium
custom build, never templated.

This replaces the current affiliate/eCommerce homepage that lives in this repo.

## How we work (the division of labor — important)

- **Cowork (this assistant)** = writes the **prompts for Claude Design**, and later helps
  Dan drive **Claude Code**. Cowork does **not** hand-code the site itself.
- **Claude Design** = builds v1 of the site from Cowork's prompts.
- **Claude Code** = finishes and enhances v1. Cowork assists Dan during this phase.
- Flow: Cowork prompt → Claude Design v1 → Claude Code polish → deploy.

## Positioning — the spine of the whole site

- **Hero promise:** "We bring your business into the AI age — then hand you the keys."
- **The differentiator (the moat):** after we build your site, **you** control it. You make
  changes by typing plain-English prompts to AI tools like ChatGPT and Claude — no
  developers, no support tickets, no per-change fees, no waiting. VirtualEcommerce stays
  on as the safety net: enterprise-grade security, automatic backups, and real human
  support whenever you want it. Goal = client self-sufficiency with a professional guardrail.
- **Primary CTA everywhere:** "Book a free 10-minute call."
- **Secondary CTA:** call/text (716) 713-6537.

## Business facts (use exactly — never invent)

- **Company:** VirtualEcommerce Inc.
- **Domain:** virtualecommerceinc.com (owned; served by the `virtualecommerceinc.github.io` repo)
- **Phone / text:** (716) 713-6537
- **Email:** sales@virtualecommerceinc.com
- **Flagship live demo:** https://virtualecommerceinc.com/Appliances4Less
  (custom site for CNY Appliances 4 Less, Syracuse NY — lives in a SEPARATE repo)
- **Pricing:** Simple AI websites from $500 · Corporate/Enterprise from $2,000
- **Logo:** none yet — use a clean text wordmark placeholder with an easy swap slot.

## Confirmed decisions (2026-06-01)

- **Palette:** near-black background, electric blue primary, with **magenta + amber** as a
  dual-accent system (used sparingly). Premium, bold, high-energy — not neon-cheap.
- **Pricing = three tiers:** Simple AI Website (from $500) · **Growth tier (proposed ~$1,000,
  name + scope TBD with Dan)** · Corporate/Enterprise (from $2,000). Each drives to Book a Call.
- **Portfolio/Work page:** scaffold with placeholders. Feature A4L Syracuse as the live
  flagship; other ~10 cards use clearly marked tokens: [PROJECT NAME] / [LIVE URL] /
  [GITHUB URL] / [SCREENSHOT] for Dan to fill later.
- **About page:** Dan will provide his real bio/story — leave an editable placeholder until then.

## Open items to confirm with Dan

- Growth (middle) tier name, price, and what it includes.
- About-page bio/story copy (Dan to supply).
- Keep Google Analytics (GA4 `G-Q599X59GY2`) on the new site? (Likely yes.)
- Drop the AdSense script (`ca-pub-4347572891242162`) on the premium agency site? (Likely yes — no ads.)
- Any additions/cuts to the sitemap.

## Sitemap (multi-page)

1. **Home** — hero promise; a "run your site with a sentence" demo moment; 3-step How It
   Works; flagship proof; strong CTA.
2. **The AI Advantage** — visualize the prompt-to-edit workflow; tell the security +
   automatic-backups story (the moat — concrete and reassuring).
3. **Services** — AI-enhanced website builds, AI chatbots, AI search, the self-edit handoff
   system, ongoing support/monitoring.
4. **Work** — case studies. A4L Syracuse as the flagship with its live link; portfolio grid
   with ~10 placeholder cards.
5. **Pricing** — three tiers, each driving to Book a Call.
6. **About** — VirtualEcommerce Inc. + Dan's story (editable placeholder until bio arrives).
7. **Contact / Book a Call** — phone, email, simple contact form driving the primary CTA.

## Design direction

- Bold, high-energy: big confident typography, vivid color, purposeful motion (scroll
  reveals, subtle parallax, animated gradients/hero) — fast and tasteful, never gimmicky.
- **Mobile-first** and flawless on phones (decision-makers open on mobile). Fast load,
  smooth 60fps motion, accessible contrast.
- Content must be easy for a non-coder to edit — the site itself is proof of the
  "edit with simple AI prompts" promise.

## Tech & constraints

- Static site: pure HTML + CSS + vanilla JS. No framework, no build step. Deploys cleanly
  to GitHub Pages.
- SEO basics required (titles/meta/OpenGraph), plus accessibility (semantic HTML, alt text,
  keyboard nav) and performance.
- Keep the repo clean and deployable; keep working notes out of the shippable site.

## Repo + deploy (set up 2026-06-01)

- **Repo:** `github.com/virtualecommerceinc/virtualecommerceinc.github.io` (branch `main`)
- **Local clone:** this folder (`R:\Documents\Claude\Projects\VirtualECommerceinc.com`)
- **Auth:** account-level SSH key `virtualecommerceinc_account` added under the
  `virtualecommerceinc` GitHub account → reaches ALL VEI repos (current + future).
- **SSH alias:** `github-vei` (in `~/.ssh/config`, `IdentitiesOnly yes`) keeps this key
  isolated from Dan's other GitHub profiles.
- **Remote:** `git@github-vei:virtualecommerceinc/virtualecommerceinc.github.io.git`
- **Live URL:** https://virtualecommerceinc.com (custom domain via `CNAME`).
- **Deploys run on Dan's Windows machine**, not from Cowork's sandbox (sandbox has no
  GitHub network access). Cowork prepares files; Dan runs the git commands.

## Existing repo contents — preserve vs replace

- **PRESERVE (do not delete):** `CNAME` (→ virtualecommerceinc.com — breaking it breaks the
  domain), `blog/`, `earbuds/`, `partners.html`, `assets/`, `robots.txt`, `sitemap.xml`.
- **REPLACE:** the current `index.html` homepage (old affiliate/eCommerce positioning) with
  the new AI-agency homepage. New sitemap pages get added as new `.html` files — avoid name
  collisions with existing files like `partners.html`.
- Update `sitemap.xml` and `robots.txt` to reflect the new pages before final deploy.

## Safety rules (NEVER weaken)

- One repo = its own folder pointed at its own remote. Cross-repo accidents come from a
  folder's remote, not the key — so never repoint this folder at another repo.
- Never delete `CNAME`. Never force-push `main`. Pull/sync latest `main` before changes.
- Never touch any other VEI repo from this folder.
- Never invent business facts. If it isn't in this file, ask Dan.
- No outbound messages (email/SMS/Telegram) without explicit per-task authorization.
- Warn about secrets in configs; never echo private keys. `X`s in Dan's messages = redacted
  secrets, don't ask him to re-share.

## Working cadence (Dan's preferences)

- One step at a time. Give exactly one action, then wait for "N" or a screenshot. Never
  preview future steps as a numbered list.
- Rewrite entire files top to bottom — never partial snippets.
- Shell/PowerShell: single uninterrupted one-line commands, triple-checked.
- Dates: strict YYYY-MM-DD. Treat Dan as a novice coder, expert in business/marketing.
- For GitHub work, prefer giving Dan prompts/commands to paste; remind him to pull/sync
  `main` first, and to refresh the preview or restart any affected service after a change.
