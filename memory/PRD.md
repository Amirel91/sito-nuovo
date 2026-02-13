# MecaLab - L'Officina Digitale - PRD

## Original Problem Statement
Sviluppa "MecaLab - L'Officina Digitale", una Web App Multi-Pagina (MPA) professionale per Amir El Mekauy.
- Brand: MecaLab - L'Officina Digitale
- Owner: Amir El Mekauy, "Artigiano Tecnologico" e "Problem Solver"
- Focus: Soluzioni pratiche, automazione, riparazioni e modellazione tecnica
- Design: Dark Mode (bg-slate-950) con accenti Arancio Meccanico (#f97316)

## User Personas
1. **Small Business Owners** - Need automation, Excel VBA, management systems
2. **Makers/DIY Enthusiasts** - Need 3D printing/modeling services
3. **Homeowners** - Interested in smart home solutions with Home Assistant
4. **Tech Users** - Need PC/smartphone repairs and consulting

## Core Requirements (Static)
- [x] 6 Pages: Home, Modellazione 3D, Excel Automation, Smart Home, Tech Support, Contatti
- [x] Dark theme with orange (#f97316) accents
- [x] Italian/English i18n with language switcher
- [x] Contact form with Formspree integration
- [x] STL Viewer with volume/cost calculator
- [x] Responsive design with mobile navigation
- [x] CSS 3D animated hero section

## What's Been Implemented (Feb 13, 2026)
- **Homepage**: Hero with CSS 3D rotating cube, services bento grid, about section
- **Modellazione 3D**: STL file upload, volume/dimension parsing, cost calculator with 4 materials
- **Excel Automation**: VBA services, use cases, pricing information
- **Smart Home**: Home Assistant features, dashboard preview, compatible devices
- **Tech Support**: Services list, pricing table, FAQ section
- **Contatti**: Form with Formspree (xdalaqjn), contact info, availability hours
- **Layout**: Fixed navbar, breadcrumbs, footer with social links, back-to-top button
- **i18n**: Complete Italian/English translations

## Tech Stack
- React 19 with React Router
- Tailwind CSS with custom dark theme
- Framer Motion for animations
- Lucide React for icons
- Formspree for contact form

## Contact Information
- Email: aelmekauy@gmail.com
- Phone: +39 347 8303184
- LinkedIn: amir-elmekauy-54a68561

## Prioritized Backlog
### P0 (Critical) - Completed
- [x] All 6 pages implemented
- [x] Navigation and routing
- [x] Contact form working

### P1 (Important) - Future
- [ ] Add real Three.js 3D viewer when dependency issues resolved
- [ ] Blog/Portfolio section with project showcases
- [ ] Testimonials section

### P2 (Nice to have)
- [ ] WhatsApp integration button
- [ ] Cookie consent banner
- [ ] Analytics integration

## Next Tasks
1. Add actual project portfolio images when available
2. Update social media links when profiles are ready
3. Consider adding SEO meta tags for better visibility
4. Deploy to Cloudflare Pages
