# Front-End Design Skill — Tektora AI

## Design System

### Brand Identity
- **Name:** Tektora AI
- **Tagline:** "Your AI Workforce. Always On."
- **Industry:** AI automation for contractors (AI receptionist, lead follow-up, dead lead revival)
- **Vibe:** Premium tech startup meets construction industry strength

### Color Palette (Dark Mode Primary)
- **Background:** #000000 (pure black) → #0a0a0f (near-black)
- **Primary Gradient:** Deep purple (#6B21A8) → Electric blue (#2563EB) → Teal (#0D9488)
- **Accent:** Electric cyan (#06B6D4)
- **Text Primary:** #FFFFFF
- **Text Secondary:** #A1A1AA (zinc-400)
- **Subtle borders:** rgba(255,255,255,0.06)

### Typography
- **Headings:** Inter or Space Grotesk — bold, tight letter-spacing (-0.02em)
- **Body:** Inter — regular weight, 1.6 line height
- **Mono accents:** JetBrains Mono or IBM Plex Mono — for technical labels, stats, blueprint elements

### Design Principles (2026 Trends Applied)
1. **Barely There UI** — Hyper-minimal layouts, maximum white space, single font family, stripped interfaces
2. **Tech Bro Gradient** — Purple/blue/teal gradient spheres and glows as accent elements
3. **Spaceship Instruction Manual** — Blueprint-style lines, monospace labels, technical diagram aesthetic for feature sections
4. **Democratized Animations** — Smooth scroll-triggered reveals, parallax, subtle WebGL-style effects
5. **Human Touch** — One or two hand-drawn accent elements (arrows, underlines) to break the AI coldness

### Layout Rules
- Max content width: 1200px centered
- Section padding: 120px+ vertical
- Use asymmetric layouts — text left, visuals right (or vice versa)
- Every section should have one focal animation or visual element
- Mobile-first responsive design
- Smooth scroll behavior throughout

### Component Patterns
- **Hero:** Full-viewport, animated gradient background, bold headline, single CTA
- **Feature Cards:** Dark glass-morphism cards with subtle border glow
- **Stats/Numbers:** Large monospace numbers with animated count-up
- **Testimonials:** Minimal quote blocks with subtle fade-in
- **CTA Sections:** High-contrast gradient buttons with hover glow effect
- **Navigation:** Slim, sticky, transparent → solid on scroll

### Animation Guidelines
- Use CSS animations and Intersection Observer for scroll triggers
- Entrance animations: fade-up with slight translate (20px)
- Stagger animations for lists/grids (100ms delay between items)
- Gradient orbs should have slow, ambient movement (CSS keyframes)
- No animation should last longer than 800ms
- Respect prefers-reduced-motion

### Code Standards
- Pure HTML + CSS + vanilla JS (no frameworks — fast, deployable anywhere)
- CSS custom properties for all colors/spacing
- Semantic HTML5 elements
- Accessible: proper heading hierarchy, ARIA labels, contrast ratios
- Performance: lazy load images, optimize animations for 60fps
- All assets self-contained (no external CDN dependencies except Google Fonts)
