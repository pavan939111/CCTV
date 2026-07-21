# Antigravity Starting Prompt — paste this as the first message

You are building a production website for Nakshatra CCTV Services, a local
CCTV installation business. This is a lead-generation site, not a portfolio.

Two spec files in this folder are your source of truth — read both fully
before writing any code:

1. `nakshatra-cctv-website-prompt.md` — features, pages, SEO, Firebase,
   WhatsApp integration, lead form, admin CRM
2. `nakshatra-design-spec.md` — design tokens, dark/light themes, minimalist
   color rules, section layouts, 3D hero spec, Nano Banana image prompts,
   Stitch prompts, admin dashboard design, build order

Follow them exactly. Where the two files overlap, the design spec wins for
visuals and the main prompt wins for functionality.

## Workflow

1. First, use the Stitch MCP to generate the 4 reference screens using the
   prompts in design-spec §6 (desktop dark, mobile dark, then light variants).
   Show them to me for approval BEFORE writing code.
2. After I approve, scaffold the Next.js 15 project (App Router, TypeScript,
   Tailwind) and follow the build order in design-spec §8 step by step.
3. Generate images with Nano Banana using the exact prompts in design-spec §5
   as each section needs them. Export WebP.
4. Use placeholder values [PHONE], [WHATSAPP_NUMBER], [CITY], [FULL_ADDRESS],
   [LATITUDE], [LONGITUDE], [GOOGLE_MAPS_LINK] etc. in a single config file
   (site.config.ts) so I can fill real client details in one place later.
5. Set up Firebase (Firestore, Storage, Auth) behind environment variables;
   give me the exact console steps and security rules when you get there.

## Rules

- Stop and show me the result after each major step (design refs, homepage,
  inner pages, admin dashboard) before continuing. Do not build everything
  in one shot.
- Never fabricate testimonials, reviews, ratings, or install counts beyond
  what the spec states.
- Every page must be server-rendered for SEO. Lighthouse targets:
  Performance 95+, SEO 100, Accessibility 95+, both themes, mobile + desktop.
- If anything in the specs is ambiguous, ask me instead of guessing.

Start with step 1 now: read both files, then generate the Stitch references.
