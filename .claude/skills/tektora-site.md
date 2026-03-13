# Tektora AI — Website Build Skill

## About Tektora AI

Tektora AI builds done-for-you AI automation systems for contractors and service businesses. The core product is an AI-powered sales and communication system that includes:

1. **AI Receptionist** — Answers every call 24/7, qualifies leads, books appointments
2. **Lead Follow-Up** — Automated multi-channel follow-up sequences (calls, texts, emails)
3. **Dead Lead Revival** — Reactivates old leads that went cold, turns them into booked jobs
4. **Smart CRM** — All leads, calls, and follow-ups in one dashboard

**Business Model:** One-time setup fee ($3,000-$10,000). Client owns everything — code, hosting, APIs. No monthly lock-in from Tektora.

**Target Customer:** Contractors, remodelers, roofers, HVAC, plumbers, electricians — any service business losing leads to missed calls and slow follow-up.

**Key Stats to Feature:**
- Contractors miss 62% of inbound calls
- 78% of customers hire the first company that responds
- Average contractor loses $120K+/year in missed leads
- Tektora AI answers in under 2 seconds, 24/7/365

## Site Structure (Single Page, Premium Landing)

### Section 1: Hero
- Full viewport height
- Animated gradient background (purple → blue → teal, slow ambient movement)
- Headline: "Your AI Workforce. Always On."
- Subheadline: "Tektora AI builds intelligent systems that answer your calls, follow up your leads, and revive dead opportunities — so you never lose another job."
- Primary CTA: "See It In Action" (scrolls to demo/video section)
- Secondary CTA: "Book a Call"
- Floating blueprint-style technical labels around the edges (decorative)

### Section 2: The Problem
- Split layout — stats on left, narrative on right
- Big monospace numbers: "62%" calls missed, "$120K+" lost revenue, "78%" hire first responder
- Headline: "You're Losing Jobs While You're On The Job"
- Brief copy about the contractor's dilemma: can't answer phones while on-site

### Section 3: The Solution (Product Showcase)
- This is the BIG section — spaceship instruction manual aesthetic
- Blueprint-style layout showing the AI system architecture
- Three interconnected nodes/modules:
  1. AI Receptionist (answers calls)
  2. Lead Engine (follows up automatically)
  3. Revival System (reactivates cold leads)
- Each node has technical labels, connecting lines, monospace descriptors
- Scroll-triggered reveal: each module appears as user scrolls

### Section 4: How It Works
- 3-step process with numbered cards
- Step 1: "We Build It" — Custom AI system configured for your business
- Step 2: "We Launch It" — Go live in 48 hours, fully tested
- Step 3: "You Own It" — No monthly fees, no lock-in, it's yours forever
- Each step card has a subtle glow animation on scroll-in

### Section 5: Results / Social Proof
- Testimonial cards (use placeholder quotes for now — will replace with real ones)
- Before/After stats: "Before Tektora" vs "After Tektora" comparison
- Animated counter for: calls answered, leads converted, revenue recovered

### Section 6: Pricing
- Single premium card, glass-morphism style
- "Starting at $6,000" — one-time setup
- Bullet list of what's included
- Emphasis on: "You own everything. No monthly fees. No lock-in."
- CTA: "Book Your Build Call"

### Section 7: FAQ
- Accordion-style FAQ section
- Common questions: How long to set up? What do I need? Do I need tech skills? What if I want changes later?

### Section 8: Final CTA
- Full-width gradient section
- Bold headline: "Stop Losing Jobs. Start Tonight."
- Phone number + Book a Call button
- Blueprint decorative elements

### Footer
- Tektora AI logo
- Copyright
- Links: Privacy, Terms
- Minimal, clean

## Technical Implementation

### Must-Have Features
- Smooth scroll navigation
- Intersection Observer for all scroll animations
- CSS custom properties for theming
- Mobile responsive (test at 375px, 768px, 1024px, 1440px)
- Fast: aim for 95+ Lighthouse performance score
- Contact form that submits to Formspree or similar
- Sticky navigation that transitions from transparent to solid

### Animation Priorities
1. Hero gradient ambient movement (CSS keyframes)
2. Scroll-triggered fade-up reveals for all sections
3. Blueprint lines drawing in (SVG stroke animation)
4. Number counter animations (count up on scroll into view)
5. Staggered card reveals
6. Button hover glow effects

### File Structure
```
/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── fonts/
└── README.md
```

## Voice & Tone
- Direct, confident, no-BS (speaking to contractors, not tech bros)
- Short sentences. Active voice. 
- Don't oversell — let the numbers do the talking
- Avoid jargon the customer wouldn't use
- Sound like someone who builds things, not someone who sells things
