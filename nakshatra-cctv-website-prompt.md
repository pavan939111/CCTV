# Antigravity Prompt — Nakshatra CCTV Services Website

> **Before pasting:** Replace every `[PLACEHOLDER]` with the client's real details.
> `[PHONE]` `[WHATSAPP_NUMBER]` (with country code, e.g. 91XXXXXXXXXX) `[EMAIL]` `[FULL_ADDRESS]` `[CITY]` `[SERVICE_AREAS]` (comma-separated localities/cities) `[LATITUDE]` `[LONGITUDE]` `[GOOGLE_MAPS_LINK]` (business location share link) `[WORKING_HOURS]` `[GST_NUMBER]` (optional)

---

## PROMPT STARTS HERE

Build a modern, premium, conversion-focused, SEO-first website for **Nakshatra CCTV Services**, a company in [CITY] specializing in CCTV sales, installation, repair, maintenance, and Annual Maintenance Contracts (AMC).

**Primary objectives, in order:**
1. Rank on Google Search and Google Maps for local queries like "CCTV installation near me", "CCTV installation in [CITY]", "CCTV camera shop [CITY]", "CCTV repair [CITY]", "security camera installation [CITY]", "CCTV dealer [CITY]".
2. Generate maximum WhatsApp inquiries and phone calls (lead generation, not just a portfolio).
3. Feel comparable to enterprise security brands (Hikvision, CP Plus, Dahua) while staying lightweight and mobile-first.

Avoid generic template designs.

---

## 1. Technical Stack

**Frontend**
- Next.js 15 (App Router) + TypeScript + React
- Tailwind CSS
- React Three Fiber / Three.js for the 3D hero (must lazy-load and degrade gracefully to a static WebP poster on low-end mobiles / `prefers-reduced-motion`)
- Framer Motion for animations; GSAP ScrollTrigger optional for scroll effects
- Leaflet + React-Leaflet with OpenStreetMap tiles for maps (free, no Google Maps API key; load client-side only via dynamic import with `ssr: false`)
- Static generation (SSG/ISR) or SSR for every page — all content must be in the HTML for crawlers, never client-rendered-only
- Images: WebP/AVIF, `next/image`, lazy loading, explicit width/height

**Backend — Firebase**
- Cloud Firestore: leads/inquiries, testimonials, FAQs, services, products/pricing, site settings (content CMS)
- Firebase Storage: gallery images, documents, brochures, certificates, logos
- Firebase Authentication: **admin login only** — a single pre-created email/password account for the owner. No visitor sign-up, no login UI for customers anywhere on the public site. Do not build registration flows.
- Firebase Analytics (alongside GA4)
- Firebase Cloud Messaging: optional, future notifications
- Deploy on Vercel (or Firebase Hosting)

Design the architecture so features can be added later without restructuring (see Future Features).

## 2. Design System

- Glassmorphism cards (subtle blur, 1px borders), rounded-2xl corners, soft shadows
- Premium typography: a geometric sans (e.g. Inter/Space Grotesk via `next/font`, self-hosted, no layout shift)
- Smooth scrolling, micro-interactions on hover, staggered reveal animations on scroll
- Futuristic but trustworthy — inspiration: Tesla, Apple, Hikvision, CP Plus, Dahua, Google Material

**Dual theme with user toggle (dark + light):**

- **Dark (default):** background Black `#0A0A0A` / Dark Blue `#0B1D3A`, white text, Electric Blue accent `#2E7CF6`/`#00A8FF`, glowing accents
- **Light:** background White `#FFFFFF` / soft gray `#F5F7FA`, near-black text `#0A0A0A`, same Electric Blue accent (darkened where needed for WCAG AA contrast), softer shadows instead of glows
- Implement with Tailwind `dark:` classes and CSS variables for all colors — never hard-code hex in components
- Sun/moon toggle in the header (and mobile menu); animate the transition smoothly
- Respect `prefers-color-scheme` on first visit, persist the user's choice in `localStorage`, and apply it via a blocking inline script in `<head>` so there is **no flash of wrong theme** on load
- Both themes must pass accessibility contrast checks; the 3D hero, brand logos, gallery, and all sections must look premium in both

## 3. Site Architecture (multi-page, not a single landing page)

Create dedicated SEO pages, each with unique title/meta/H1/copy (min. 500 words of unique, locally-relevant content per page — no boilerplate duplication):

- `/` — main landing page (all sections below)
- `/cctv-installation`
- `/cctv-repair`
- `/wireless-cctv-installation`
- `/ip-camera-installation`
- `/amc-services`
- `/video-door-phone`
- `/access-control-system`
- `/biometric-attendance-system`
- `/products`
- `/gallery`
- `/about`
- `/contact`
- Location pages for each area in [SERVICE_AREAS]: `/cctv-installation-[area-slug]` — each with area-specific H1, intro copy, map, and LocalBusiness/Service schema
- `/privacy-policy`, `/terms`

Clean URL structure, breadcrumbs on every inner page, internal linking between service ↔ location ↔ product pages.

## 4. Homepage Sections (in order)

### 4.1 Hero
- H1: **"Secure Your Home & Business with Professional CCTV Installation in [CITY]"**
- Subheading: "Premium CCTV installation, repair, maintenance, and surveillance solutions for homes, apartments, offices, factories, shops, schools, hospitals, warehouses, and commercial spaces."
- Primary CTA: **Get Free Site Visit** (opens lead form) · Secondary CTA: **Chat on WhatsApp**
- Background: animated 3D scene in React Three Fiber — a slowly rotating CCTV dome/bullet camera with a glowing electric-blue network grid / scanning beam. Keep it under ~300KB of JS, lazy-loaded, static poster fallback.

### 4.2 Trust Bar
Animated counters/badges: ✓ 500+ Installations ✓ Certified Technicians ✓ Same-Day Service ✓ 24×7 Support ✓ Genuine Products ✓ Affordable Pricing ✓ Warranty Available

### 4.3 Services Grid
Premium illustrated cards linking to their service pages. Services: Home CCTV Installation, Office CCTV Installation, Apartment Security, Factory Surveillance, Warehouse Monitoring, School CCTV, Hospital Security, Retail Shop CCTV, Industrial CCTV, Wireless CCTV, IP Camera Installation, WiFi Camera Setup, Bullet Camera, Dome Camera, PTZ Camera, Night Vision Cameras, 4K CCTV, Solar CCTV, Video Door Phone, Biometric Attendance, Access Control, Intercom Systems, Network Cabling, CCTV Repair, AMC Services, Camera Relocation, Camera Upgrade. Group into categories with a filter/tab UI so the grid stays scannable.

### 4.4 Products
Category cards: IP Camera, WiFi Camera, Bullet Camera, Dome Camera, PTZ Camera, NVR, DVR, Hard Disks, PoE Switches, SMPS, Power Supply, CCTV Accessories. Each card: image, short description, key features, "Starting at ₹[PRICE]", **Inquiry** button that opens WhatsApp with a pre-filled message naming that product.

### 4.5 Why Choose Nakshatra
Icon cards: Experienced Engineers, Branded Products, Affordable Price, Quick Installation, Best After-Sales Support, Warranty, Free Site Survey, Customized Solutions, Latest Technology, Professional Team.

### 4.6 Installation Process
Animated vertical timeline (scroll-triggered): 1 Free Consultation → 2 Site Visit → 3 Requirement Analysis → 4 Quotation → 5 Installation → 6 Testing → 7 Training → 8 Support.

### 4.7 Brands We Deal In
Logo marquee: CP Plus, Hikvision, Dahua, Godrej, UNV, Honeywell, Panasonic, Bosch, Axis, EZVIZ. Grayscale → color on hover.

### 4.8 Industries Served
Cards: Homes, Apartments, Schools, Hospitals, Banks, Factories, Warehouses, Retail Shops, Hotels, Restaurants, Construction Sites, Corporate Offices, Government Buildings.

### 4.9 Testimonials — authentic only, never fabricated
Animated carousel: photo, name, locality, star rating, review text, date. Pull from Firestore. **Do NOT generate fake testimonials** — build the section to render real content from these sources, in priority order:

1. **Google Reviews** (best): display customer name, star rating, review text, date from the client's Google Business Profile
2. **WhatsApp appreciation screenshots**: shown in a "Customer Feedback" subsection (not presented as formal reviews); client must get customer permission and blur/crop phone numbers and profile photos
3. **Customer photos of completed installations**
4. **"Share Your Experience" form**: name, rating, feedback, optional photo → saved to Firestore, published only after admin approval
5. Video testimonials (20–30s clips) supported in the carousel

Until real reviews exist, ship the section with clearly-labeled sample/placeholder styling the admin replaces. Add aggregate rating to schema only from genuine reviews.

### 4.10 Gallery
Grid of installation photos with Before/After comparisons, lightbox, lazy-loaded, descriptive alt text ("CCTV dome camera installation at apartment in [AREA]").

### 4.11 FAQ (Accordion)
- How much does CCTV installation cost in [CITY]?
- Which CCTV brand is best?
- How many cameras do I need for my home/shop?
- How long does installation take?
- Do you provide warranty?
- Do you provide AMC?
- Can I monitor cameras on my mobile?
Write full, helpful answers (not one-liners) — these feed FAQ schema.

### 4.12 Contact
Large glass contact card: Phone [PHONE], WhatsApp button, Email [EMAIL], Address [FULL_ADDRESS], Working Hours [WORKING_HOURS], Service Areas [SERVICE_AREAS], Emergency Contact.

**Map (Leaflet + OpenStreetMap — no Google Maps API):** interactive, responsive map centered on [LATITUDE], [LONGITUDE] with a custom electric-blue branded marker; clicking the marker shows a popup with business name, address, and hours. Below the map: **"Open in Google Maps"** and **"Get Directions"** buttons linking to [GOOGLE_MAPS_LINK] (opens the Google Maps app/site — this is what matters for navigation and reviews). Lazy-load the map so it never affects LCP. Plus a lead form: Name, Phone, Service Needed (dropdown), Message → on submit, send to WhatsApp AND store in the Google Sheet (see §7).

### 4.13 Footer
Quick links (Services, Products, Service Areas, Contact), social links, Privacy Policy, Terms — and full NAP (Name, Address, Phone) repeated, identical to header/contact.

## 5. WhatsApp Integration (Click-to-Chat — no WhatsApp Business API)

Use simple `wa.me` Click-to-Chat links (free, no API). The business uses a **WhatsApp Business account** on [WHATSAPP_NUMBER] with a complete profile (logo, description, address, hours, website, email, optional catalog).

**5.1 Floating button:** WhatsApp icon on every page, bottom-right, pulse animation. On mobile, deep-link opens the WhatsApp app directly; on desktop, open WhatsApp Web (`wa.me` handles both — detect device only if needed for UX polish).

**5.2 Context-aware pre-filled messages** — every CTA passes page context via `https://wa.me/[WHATSAPP_NUMBER]?text=<URL-encoded message>`:

| Page | Pre-filled message |
|---|---|
| Home | Hello Nakshatra CCTV Services. I would like to know more about your CCTV installation services. |
| Product card | Hello. I am interested in the [Product Name]. Please share the quotation. |
| Contact | Hello. I would like to schedule a free site visit. |
| AMC page | Hello. I need information about your CCTV Annual Maintenance Contract (AMC). |
| Repair page | Hello. My CCTV system needs repair. Can you help me? |
| Service pages | Hello. I need [Service Name] in [CITY]. Please share details. |

**5.3 Lead form → Firestore → WhatsApp:** the inquiry form collects Name, Phone Number, Email (optional), Address/City, Service Required (dropdown), Number of Cameras (optional), Additional Requirements. On submit: save to Firebase Firestore, show a success message with a **Continue on WhatsApp** button that opens WhatsApp pre-filled with the submitted details, e.g.:

```
Hello Nakshatra CCTV Services.
Name: Rahul
City: Hyderabad
Service: CCTV Installation
Cameras: 8
Please contact me.
```

**5.4 Every product card:** Call Now · WhatsApp (message auto-includes product name) · Get Quote.

**5.5 CTA placement:** CTA band after every major homepage section rotating between Call Now, Get Quote, Free Site Visit, Book Installation, Chat on WhatsApp. Sticky mobile bottom bar: Call | WhatsApp | Get Quote.

## 5A. Firebase Lead CRM + Admin Dashboard

**Firestore `leads` collection** — each inquiry stores: name, phone, city, service selected, product selected (if any), number of cameras, message, timestamp, referral source (UTM/referrer), device type, and status (`New` / `Contacted` / `Closed`).

**Firebase Storage** for gallery images and documents (quotations, brochures).

**Admin dashboard** at `/admin` (protected by Firebase Auth — one owner account created manually in the Firebase console; no sign-up page, just a simple login form):
- View all inquiries in a table, newest first; update lead status (New → Contacted → Closed)
- Search leads by name/phone; filter by service and date range; export to CSV
- Manage gallery images (upload to Firebase Storage)
- Add/edit services, products, and pricing
- Approve and manage testimonials
- Manage FAQs and contact/business information
- Publish blog articles for SEO (stored in Firestore, rendered as static pages)
- View basic analytics summary

Secure Firestore with rules: public can only create leads/testimonial submissions; only the authenticated admin can read/update everything else.

**Analytics & tracking:** Google Analytics 4 + Firebase Analytics, Google Search Console verification tag, Google Tag Manager (optional), Meta Pixel (optional). Track events: `click_whatsapp`, `click_call`, `submit_lead_form`, `request_quote`, `product_inquiry`, page views, scroll depth, CTA conversions — each with page/service/product parameters. Google Ads-ready.

**Architecture:**

```text
Customer → Website (Next.js)
              ├── Firebase Firestore (leads / contact forms / customer details)
              ├── Firebase Storage (gallery / documents)
              └── WhatsApp Click-to-Chat → Business WhatsApp → Owner
```

**Future features (document in README, design for but do not build now):** official WhatsApp Business API (automated greetings, quick-reply templates, broadcast AMC-renewal reminders, multi-agent support), FAQ/AI chatbot, online payment for bookings, appointment scheduling, live installation tracking, customer login with service history and invoice downloads, multi-language support (English, Telugu, Hindi), online product catalog with inventory, CRM integration.

## 6. SEO Requirements (highest priority — do not skip any)

**Per page:** unique optimized `<title>` (≤60 chars, keyword + [CITY]), meta description (≤155 chars with CTA), canonical URL, Open Graph + Twitter Card tags, one H1, semantic heading hierarchy, descriptive image alt text.

**Structured data (JSON-LD):**
- `LocalBusiness` (with `@type: "Locksmith"`-adjacent → use `LocalBusiness` + `additionalType`), including name, address, geo, phone, openingHours, priceRange, areaServed ([SERVICE_AREAS]), aggregateRating — rendered on every page
- `Organization`, `Service` (per service page), `FAQPage` (homepage + service pages), `BreadcrumbList` (inner pages), `Product` with offers (product pages), `Review`

**Site-wide:** `sitemap.xml` (auto-generated, all pages), `robots.txt`, semantic HTML5 (`header/nav/main/section/article/footer`), NAP identical on every page (critical for Google Business Profile consistency), self-referencing hreflang not needed (single locale, `en-IN`).

**Google Business Profile support:** on-site map with "Open in Google Maps" link to the GBP listing, consistent NAP, review highlights, service-area list, and prominent Call/WhatsApp actions — all designed so the GBP listing and website reinforce each other. (The GBP itself matters far more for Maps ranking than which map library the site uses.)

**Performance budgets:** Lighthouse Performance 95+, SEO 100, Best Practices 100, Accessibility 95+. LCP < 2.5s on mid-range mobile, CLS < 0.1, INP < 200ms. The 3D hero must not block LCP — render headline text server-side first, hydrate the canvas after.

## 7. Admin-Friendly Content Management (Firestore)

All editable content lives in Firestore, managed through the `/admin` dashboard (§5A) so the owner never touches code: services, products (name, description, features, price, image), testimonials, gallery, FAQs, blog posts, and settings (phone, WhatsApp, address, hours, service areas). Pages read Firestore at build time with ISR (`revalidate: 3600`) so edits appear within an hour without redeploying — content must still be server-rendered for SEO.

## 8. Accessibility & Misc

- Keyboard navigable, visible focus states, ARIA on accordion/carousel, contrast-checked electric blue on dark
- `prefers-reduced-motion` disables 3D + heavy animation
- 404 page with links back to services
- Favicon + web manifest, OG share image with logo and tagline

**Deliver:** complete project code, Firebase setup instructions (Firestore collections, security rules, Storage, Auth), and a README with deployment (Vercel) and content-editing instructions for a non-technical owner.

## PROMPT ENDS HERE

---

## After the site is built — your checklist (not part of the prompt)

1. Create/claim the **Google Business Profile**, use the exact same NAP as the website, add the website URL, photos, services, and service areas.
2. Verify the site in **Google Search Console**, submit `sitemap.xml`.
3. Set up **GA4** and link conversion events.
4. Ask early customers for Google reviews (biggest local-ranking factor).
5. List the business on Justdial, IndiaMART, Sulekha with identical NAP.
