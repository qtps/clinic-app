# Harborview Clinic — Appointment Booking

A two-page Next.js (App Router) + Tailwind CSS demo built for a UI-requirements
exercise: a clinic appointment booking system.

## Pages

- `/` — Landing page: responsive nav with hamburger menu on mobile, hero with
  two CTAs, a 4-card services section, and a footer with contact info and
  social links.
- `/booking` — Form page: 13 fields across 9 input types (text, email, tel,
  date ×2, select ×2, radio, textarea, checkbox, file), with client-side
  validation (required fields, email format, phone pattern, a cross-field
  rule requiring the alternate date to fall after the preferred date, and a
  conditional rule requiring a patient ID for returning patients). Inline
  error messages appear under each field. On a valid submit it shows an
  on-screen summary of the entered data — no backend involved.

## Run it locally

Requires Node.js 18.17+.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Project structure

```
app/
  layout.jsx          Root layout, fonts, metadata
  globals.css          Tailwind entry + base styles
  page.jsx             Landing page (Page 1)
  booking/
    layout.jsx          Page-specific metadata
    page.jsx             Booking page shell (Page 2)
components/
  Navbar.jsx            Responsive nav with mobile toggle
  Footer.jsx             Contact info + social icons
  ServiceCard.jsx         Reusable service card
  ScheduleGraphic.jsx      Hero illustration (appointment grid)
  BookingForm.jsx          Form fields, validation, success summary
```

## Design notes

Palette is a warm paper background with a deep teal ink/brand color and a
muted amber accent for primary actions, plus a sage green for secondary
highlights — chosen to read as a calm clinical space rather than a generic
SaaS template. Headings use Fraunces (serif) via `next/font`, body/UI text
uses Work Sans.
