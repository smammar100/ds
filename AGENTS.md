<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-skills -->

# Design and frontend craft skills

This is a marketing site. Its whole job is how it looks and feels, so the
design-engineering skills are not optional extras here — reach for them the way
you would reach for a linter.

Install them with the token from the project owner:

```bash
npx @aiforui/install --token=<your-token>
```

They land in `~/.claude/skills` and are available in every session. They are
paid, per-seat content, so they are deliberately **not** committed here —
`.claude/skills/` is gitignored. Each person installs with their own token.

## When to load which

| Working on | Load |
| --- | --- |
| Any landing-page section, hero, pricing, FAQ, footer | `emil-marketing-pages` |
| Reel-card generation, fleet board, press marquee, scroll reveals | `emil-animations`, `emil-performance` |
| Type scale, the Moret display face, tracking, line length | `emil-typography` |
| Tokens in `globals.css`, the green accent, dark-mode surfaces | `emil-color`, `emil-surfaces` |
| Card borders, hairlines, nested radii, elevation | `emil-surfaces` |
| A new component under `src/components`, its props API | `emil-component-design` |
| Book-a-call form, inputs, buttons, submit states | `emil-forms-and-inputs` |
| Mobile layout, tap targets, keyboard order, reduced motion | `emil-touch-and-accessibility` |
| A polish pass, or something that just "feels off" | `emil-ui-polish`, `emil-design-foundations` |
| Reviewing a UI diff before it ships | `emil-ui-review` |
| Copy on the page, README, commit messages | `emil-unslop-writing` |
| Cleaning up generated code or generated visuals | `emil-unslop-code`, `emil-unslop-design` |
| Exploring several directions for one section | `emil-prototype` |

## House rules that follow from them

These are the ones this codebase has already committed to. Do not undo them.

- **No scroll-triggered motion beyond the existing `Reveal` component.** No
  parallax, no scroll hijacking, no auto-advancing carousels. The persona
  carousel advances only when someone picks an avatar.
- **Match the existing styling system.** Tailwind v4 utilities and the tokens in
  `src/app/globals.css`. Never introduce a second styling approach, and never
  hardcode a colour that already exists as a token.
- **Every animation settles into its final frame under
  `prefers-reduced-motion`.** `fleet-fx.tsx` shows the pattern.
- **Content ships in the DOM.** The site is a static export, so nothing
  above the fold may depend on a client fetch.

Run `/emil-ui-review` over the diff before pushing anything that touches the
interface.

<!-- END:design-skills -->
