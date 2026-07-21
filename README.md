# Nakshatra CCTV Services Website

A lead-generation, high-performance web application built for **Nakshatra CCTV Services** using Next.js 15 (App Router), TypeScript, Tailwind CSS, Three.js / React Three Fiber, Framer Motion, and Firebase.

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Production Build**:
   ```bash
   npm run build
   ```

---

## 🔒 Firebase Security Rules Setup

To fix the `FirebaseError: Missing or insufficient permissions` console warning when fetching Firestore collections, copy and paste the following rules into your **Firebase Console → Firestore Database → Rules** tab:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Allow public read of site settings & published content
    match /settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /testimonials/{docId} {
      allow read: if resource.data.status == 'approved';
      allow create: if request.resource.data.name != null;
      allow update, delete: if request.auth != null;
    }

    match /services/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /products/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /faqs/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Public lead submission
    match /leads/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

---

## 🛠 Features & Configuration

- **Single Configuration**: Placeholders are managed in `src/config/site.config.ts`.
- **Dual Themes**: Automatic system preference detection with persistent toggle and no-flash blocking script.
- **WhatsApp Integration**: Deep-linked pre-filled messages on all service/product CTAs.
- **Admin CRM**: Located at `/admin` (protected by Firebase Authentication).
