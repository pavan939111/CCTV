# Nakshatra CCTV Services — Design Specification
### For Antigravity (with Stitch MCP + Nano Banana image generation)

This file is the single source of truth for design. Use it alongside `nakshatra-cctv-website-prompt.md` (which covers features, SEO, Firebase, WhatsApp).

**Design direction in one line: minimalist premium — dark, calm, lots of whitespace, one blue accent used sparingly. If a screen looks busy or colorful, it's wrong.**

---

## 1. Brand & Design Tokens

Define these as CSS variables — never hard-code hex values in components.

### Colors

| Token | Dark theme (default) | Light theme |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | `#FFFFFF` |
| `--bg-secondary` | `#0B1D3A` | `#F5F7FA` |
| `--bg-card` | `rgba(255,255,255,0.05)` | `rgba(11,29,58,0.04)` |
| `--text-primary` | `#FFFFFF` | `#0A0A0A` |
| `--text-secondary` | `#94A3B8` | `#475569` |
| `--accent` | `#2E7CF6` | `#1D5FD1` (darker for contrast) |
| `--accent-glow` | `#00A8FF` | `#2E7CF6` |
| `--success / WhatsApp` | `#25D366` | `#1DA851` |
| `--border` | `rgba(255,255,255,0.10)` | `rgba(11,29,58,0.12)` |
| `--shadow` | blue glow `0 0 40px rgba(46,124,246,0.15)` | soft gray `0 8px 30px rgba(0,0,0,0.08)` |

### Color Usage & Grading Rules — Minimalist (strict)

The look must be **clean and restrained, not neon**. Follow the 60-30-10 rule:

- **60% background** (`--bg-primary`), **30% surfaces/secondary** (`--bg-secondary`, cards), **10% accent** (`--accent`) — blue appears ONLY on: primary CTA buttons, links, icons, active states, thin highlights, and star ratings. Never as large filled areas or full-section backgrounds.
- **Section background rhythm:** alternate `--bg-primary` → `--bg-secondary` → `--bg-primary` down the page so sections separate by tone, not by borders or heavy dividers. Transitions between them can be a very subtle vertical gradient (≤4% lightness shift), nothing more.
- **Gradients:** maximum ONE hero gradient (radial, `#0B1D3A` → `#0A0A0A`, barely visible). No rainbow, no multi-color, no gradient text except optionally the H1 (white → 80% white).
- **Glow discipline:** glow effects only on the hero 3D scene and the primary CTA hover. Cards get flat soft shadows, not glows.
- **One accent color.** Green is reserved exclusively for WhatsApp elements. No purples, teals, oranges anywhere.
- **Whitespace is the main design element:** generous spacing (§ padding below), short line lengths (65ch max), no decorative clutter, no background patterns behind text.
- **Consistent grading:** all imagery (§5) shares the same treatment — dark navy environment, single blue rim light, neutral midtones, slightly lifted blacks (#0A0A0A floor, never #000), no oversaturation. Light theme images: white/neutral background, same product angle and lighting direction.
- **Text contrast:** body text is `--text-secondary` (muted), headings `--text-primary`. Never place long text on blue.

### Typography
- Font: **Space Grotesk** (headings) + **Inter** (body), via `next/font`, self-hosted
- H1: 56px/1.1 desktop, 34px mobile, weight 700
- H2 (section titles): 40px desktop, 28px mobile, weight 700
- H3 (card titles): 22px, weight 600
- Body: 16–18px, weight 400, `--text-secondary`
- CTA buttons: 16px, weight 600, letter-spacing 0.02em

### Shape & Effects
- Cards: `rounded-2xl` (16px), glassmorphism: `backdrop-blur(12px)`, 1px `--border`, `--bg-card`
- Buttons: `rounded-full`, 48px height (44px+ tap target on mobile)
- Section padding: 96px vertical desktop, 56px mobile
- Max content width: 1200px, centered

### Theme Toggle
- Sun/moon icon in header (desktop) and mobile menu
- Tailwind `dark:` strategy + CSS variables; respect `prefers-color-scheme` first visit; persist in `localStorage`; blocking inline `<head>` script → no flash of wrong theme
- Both themes must pass WCAG AA contrast

### Motion
- Library: Framer Motion. Scroll-triggered staggered reveals (fade-up 24px, 0.5s, ease-out, 80ms stagger)
- Hover: cards lift 4px + border brightens to `--accent`; buttons scale 1.03
- Respect `prefers-reduced-motion`: disable 3D + parallax, keep opacity fades only

---

## 2. Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | < 768px | Single column, hamburger menu, sticky bottom action bar |
| Tablet | 768–1023px | 2-column grids |
| Desktop | ≥ 1024px | Full layout, 3–4 column grids |

One responsive codebase — the mobile Stitch design drives `<768px`, the desktop design drives `≥1024px`.

**Mobile-only elements:** sticky bottom bar with 3 buttons — Call | WhatsApp (green) | Get Quote (blue) — 56px tall, safe-area padding. Floating WhatsApp button sits above it.
**Desktop-only elements:** full nav in header, hero 3D canvas at full fidelity.

---

## 3. Section-by-Section Layout

### 3.1 Header (sticky, glass)
Desktop: logo left · nav (Services, Products, Gallery, About, Contact) · theme toggle · "Get Free Site Visit" button right. Blur background on scroll.
Mobile: logo · theme toggle · hamburger → full-screen slide-in menu with big links + Call/WhatsApp buttons.

### 3.2 Hero
Desktop: 2 columns — left: H1 "Secure Your Home & Business with Professional CCTV Installation", subheading, 2 CTAs (solid blue "Get Free Site Visit", green outline "Chat on WhatsApp" with WhatsApp icon), trust micro-row (★ rating, 500+ installs). Right: 3D CCTV camera scene (see §4).
Mobile: single column, text centered, 3D scene as dimmed background layer or static image, CTAs stacked full-width.

### 3.3 Trust Bar
Horizontal row (grid 2×2 wrap on mobile) of 7 badges with animated counters: 500+ Installations · Certified Technicians · Same-Day Service · 24×7 Support · Genuine Products · Affordable Pricing · Warranty Available.

### 3.4 Services Grid
Tabbed categories (Residential / Commercial / Cameras / Systems / Support). Glass cards: icon (SVG), title, 1-line description, "Learn more →". Desktop 4 cols, tablet 2, mobile 1 (or horizontal snap-scroll).

### 3.5 Products
Cards: product image (Nano Banana, §5), name, 3 feature bullets, "Starting at ₹____", buttons: Call · WhatsApp · Get Quote. Desktop 4 cols, mobile horizontal snap-scroll.

### 3.6 Why Choose Nakshatra
10 icon cards, desktop 5×2, mobile 2×5.

### 3.7 Installation Process
Vertical timeline, 8 steps, animated line draws on scroll; step number in glowing blue circle. Mobile: same vertical layout, left-aligned.

### 3.8 Brands Strip
Auto-scrolling marquee of 10 logos, grayscale → color on hover. Pause on hover.

### 3.9 Industries Served
13 compact cards with icons, desktop 4–5 cols, mobile 2 cols.

### 3.10 Testimonials
Carousel: glass card with photo, name, locality, 5-star row (accent color), review text, date. Auto-advance 6s, swipe on mobile, dots + arrows. (Real reviews only — see main prompt §4.9.)

### 3.11 Gallery
Masonry/grid, before–after slider component for comparison pairs, lightbox on tap.

### 3.12 FAQ
Accordion, single-open, chevron rotates, smooth height animation.

### 3.13 Contact
Desktop 2 columns: left = lead form (Name, Phone, Email optional, Address, Service dropdown, No. of Cameras, Requirements → Firestore → "Continue on WhatsApp"); right = info card (phone, WhatsApp, email, address, hours, service areas) + Leaflet/OSM map with branded blue marker + "Open in Google Maps" / "Get Directions" buttons. Mobile: stacked, form first.

### 3.14 Footer
4 columns desktop (About + NAP, Quick Links, Services, Service Areas), stacked mobile. Social icons, Privacy/Terms. Bottom line: © Nakshatra CCTV Services.

### 3.15 Floating Elements
WhatsApp button bottom-right (pulse animation, 56px), Scroll-to-top appears after 600px, Call button (mobile, in bottom bar).

---

## 4. 3D Hero Spec (React Three Fiber)

- Scene: one detailed **dome or bullet CCTV camera** model, slowly rotating (0.15 rad/s), slight tilt following cursor (desktop only)
- Behind it: glowing wireframe network grid / particle field in `--accent-glow`, subtle pulse
- A thin scanning beam sweeps from the lens every ~5s
- Lighting: rim light electric blue, soft key light; dark theme = glow on black, light theme = softer blue on white
- Budget: ≤300KB JS + model (use compressed glTF/Draco or build from primitives), lazy-load after LCP, `prefers-reduced-motion` and mobile fallback = static WebP poster (generate with Nano Banana, prompt in §5)
- H1 text renders server-side FIRST; canvas hydrates after — the 3D must never block LCP

---

## 5. Image Generation — Nano Banana Prompts

Generate all images with Nano Banana in Antigravity. Export as **WebP**. Keep a consistent style: *"photorealistic product render, dark navy studio background, electric blue rim lighting, high detail, no text, no watermark"* for dark theme; swap background to *"clean white studio"* for light-theme variants where needed.

| Asset | Size | Prompt |
|---|---|---|
| Hero poster (3D fallback, dark) | 1600×900 | "Photorealistic white dome CCTV camera floating in dark navy space, glowing electric blue wireframe network grid behind it, blue rim lighting, thin blue scanning beam from lens, futuristic, cinematic, no text" |
| Hero poster (light) | 1600×900 | Same, but "clean white studio background, soft blue accents" |
| OG share image | 1200×630 | "Wide banner: modern CCTV dome camera on dark navy background with glowing blue security grid, space on left for headline text, premium tech aesthetic, no text" |
| Product — IP Camera | 800×800 | "Photorealistic white IP bullet security camera product shot, three-quarter angle, dark navy studio background, electric blue rim light, no text" |
| Product — WiFi Camera | 800×800 | "Photorealistic compact white WiFi home security camera on stand, product render, dark navy background, blue rim light" |
| Product — Bullet Camera | 800×800 | "Photorealistic outdoor bullet CCTV camera, metal housing, product render, dark navy background, blue rim light" |
| Product — Dome Camera | 800×800 | "Photorealistic ceiling dome CCTV camera, smoked glass dome, product render, dark navy background, blue rim light" |
| Product — PTZ Camera | 800×800 | "Photorealistic PTZ speed dome security camera, large lens, product render, dark navy background, blue rim light" |
| Product — NVR | 800×800 | "Photorealistic black NVR network video recorder box, front panel LEDs, product render, dark navy background, blue rim light" |
| Product — DVR | 800×800 | "Photorealistic black DVR recorder unit, product render, dark navy background, blue rim light" |
| Product — Hard Disk | 800×800 | "Photorealistic surveillance hard disk drive, product render, dark navy background, blue rim light" |
| Product — PoE Switch | 800×800 | "Photorealistic 8-port PoE network switch, product render, dark navy background, blue rim light" |
| Product — SMPS/Power | 800×800 | "Photorealistic CCTV power supply unit metal box, product render, dark navy background, blue rim light" |
| Product — Accessories | 800×800 | "Flat-lay of CCTV accessories: BNC connectors, cable, mounts, on dark navy surface, blue accent lighting, no text" |
| Service illustrations (×8) | 1200×800 | "Isometric illustration of [home / office / factory / school / hospital / shop / warehouse / apartment building] protected by mounted CCTV cameras with visible blue field-of-view cones, dark navy and electric blue palette, clean minimal tech illustration style, no text" |
| Industries icons background | 600×400 | Same isometric style per industry |
| About / team | 1200×800 | "Professional technician in uniform installing a dome CCTV camera on a wall with a ladder, realistic photo style, modern Indian commercial interior, no visible faces prominent, no text" |
| Gallery placeholders (×6) | 1200×900 | "Realistic photo of completed CCTV installation: [shop counter with monitor showing camera grid / warehouse ceiling cameras / apartment entrance camera / office corridor camera / factory floor cameras / home exterior camera], natural lighting, no text" — **replace with client's real photos before launch** |
| 404 illustration | 800×600 | "Cute isometric CCTV camera looking at an empty spotlight, dark navy background, electric blue accents, minimal, no text" |

**Icons (do NOT generate as images):** use **Lucide** SVG icons (camera, shield, wrench, clock, phone, etc.) tinted with `--accent` — crisp at every size and theme-aware.

**Alt text rule:** every image gets descriptive alt with service + location keywords, e.g. `alt="Dome CCTV camera installation at retail shop in [CITY]"`.

---

## 6. Stitch MCP Prompts (visual reference generation)

Generate 4 screens: desktop dark → mobile dark → then ask "same design in light theme" for each.

**Desktop (Web, 1440px):**
> Minimalist premium dark landing page for "Nakshatra CCTV Services", a CCTV installation company. Lots of whitespace, calm and clean, NOT neon or busy. Background near-black #0A0A0A alternating with dark navy #0B1D3A sections, electric blue #2E7CF6 used sparingly only on buttons, icons and links. Subtle glassmorphism cards, rounded corners, flat soft shadows. Sticky glass header with logo, nav, sun/moon theme toggle, "Get Free Site Visit" button. Hero: large headline "Secure Your Home & Business with Professional CCTV Installation", subtext, solid blue CTA "Get Free Site Visit" + green outline "Chat on WhatsApp", photorealistic CCTV camera with glowing blue network grid on right. Then: trust badge row, services grid of glass cards with icons, product cards with ₹ prices and WhatsApp buttons, why-choose-us icon row, 8-step vertical timeline, brand logo strip, testimonial carousel, FAQ accordion, contact form + map, footer. Floating WhatsApp button bottom-right. Futuristic, trustworthy, Tesla/Hikvision inspired.

**Mobile (390px):**
> Mobile version of the same Nakshatra CCTV Services landing page. Same dark theme and sections, single column, hamburger menu, centered hero text with camera visual as dim background, full-width stacked CTAs, sticky bottom bar with Call | WhatsApp (green) | Get Quote (blue) buttons, floating WhatsApp button above the bar, large tap targets.

---

## 7. Admin Dashboard Design (`/admin`)

The owner is non-technical and will mostly use this **on a phone**. Design it like a simple app, not a developer console. Same design tokens as the site, but utilitarian: less glass, flat cards, higher information density, light theme default (better for daytime business use) with dark optional.

### 7.1 Login (`/admin`)
Centered card: logo, email, password, "Sign in" button, error state. Nothing else — no sign-up, no social buttons, no forgot-password flow in v1 (owner contacts developer).

### 7.2 Layout
- Desktop: fixed left sidebar (icons + labels) + content area
- Mobile: bottom tab bar with 4 tabs — **Leads · Content · Gallery · Settings** (Content groups Services/Products/FAQs/Testimonials/Blog as a sub-list)
- Header: page title + logout icon
- Every destructive action gets a confirm dialog

### 7.3 Leads (default page after login)
- Cards list (mobile) / table (desktop): name, phone, service, cameras, city, time ago
- Status pill per lead: **New** (blue) / **Contacted** (amber) / **Closed** (gray) — tap to cycle
- Each lead card has two big action buttons: **Call** (tel:) and **WhatsApp** (wa.me with the customer's number) — this is the killer feature: owner taps a lead and calls back in one touch
- Top bar: search (name/phone), filter chips (service, status, date range), export CSV button
- New-lead badge count on the tab icon

### 7.4 Content editors (Services / Products / FAQs / Testimonials / Blog)
- List view: rows with title, thumbnail, visibility toggle (published/hidden), edit + delete icons, drag handle to reorder
- Edit view: simple form — text fields, price field (₹), feature list (add/remove rows), image upload (to Firebase Storage, with preview and auto-compression), Save/Cancel sticky at bottom
- Testimonials list shows **Pending approval** section on top (from the website submission form) with Approve / Reject buttons
- No rich-text complexity: blog editor = title, cover image, plain paragraphs with bold/links only

### 7.5 Settings
Single form: phone, WhatsApp number, email, address, working hours, service areas (tag input), emergency contact, social links. Save button with "Saved ✓" toast. Warn: "These appear on every page of the website."

### 7.6 Dashboard design rules
- Big tap targets (48px+), one-hand reachable actions on mobile
- Optimistic UI with toasts; skeleton loaders, never spinners on full pages
- Empty states with friendly copy ("No leads yet — share your website link!")
- All writes behind Firestore rules: only the authenticated owner UID can write

## 8. Build Order for Antigravity

1. Design tokens + theme toggle (CSS variables, no-flash script)
2. Layout shell: header, footer, floating buttons, mobile bottom bar
3. Hero with static poster image → then wire the R3F 3D scene
4. Sections top-to-bottom (§3), all content from Firestore per the main prompt
5. Generate images with Nano Banana (§5) as sections are built
6. Lead form + Firestore + WhatsApp handoff
7. Admin dashboard (§7): login → leads page → content editors → settings
8. Responsive pass at 390 / 768 / 1024 / 1440 (site + admin)
9. Lighthouse pass: Performance 95+, SEO 100, both themes, mobile + desktop
