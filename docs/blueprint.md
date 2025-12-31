# **App Name**: Pramaan Care Landing

## Core Features:

- Sticky Navigation: Sticky navigation bar with jump links to different sections of the single-page website (Home/Hero, About, Services, Corporate Programs, Assessments, FAQs, Testimonials, Contact).
- Hero Section: Hero section with headline, subheadline, badges, and primary/secondary CTAs that scroll to #contact.
- Content Sections: Sections for About, Services, Corporate Programs, Assessments, FAQs, Testimonials, and Contact/Book a Session. Use semantic landmarks and H1/H2/H3 hierarchy.
- Collapsible Sections: Accordions for Services, Assessments, and FAQs. On mobile: collapsed by default; on desktop: first panel expanded by default. All accordions keyboard-accessible with aria-controls/aria-expanded and focus-visible states.
- Contact Form: Contact form with client-side validation; submission handled by a Firebase HTTPS Cloud Function with reCAPTCHA v3 verification; store submission in Firestore with server timestamp; send email to admin and confirmation to user (nodemailer/SMTP placeholders).
- Submission Analysis: After a successful submission, call an AI summarization tool in the Cloud Function to produce a brief summary + urgency flag of the enquiry. Use Google Generative AI (Gemini) or Vertex AI (text generation) with safe placeholders; store summary in the same Firestore document.
- Analytics Consent: Cookie/analytics consent banner with opt-in. Only load gtag() after consent. Remember user choice (localStorage). Provide “Change preferences” link in footer.
- Performance/Accessibility: Mobile-first, lazy-loaded images, width/height attributes, Lighthouse 95+ for Performance/Accessibility/SEO. WCAG 2.1 AA: color contrast, labels, roles, skip-link, proper headings, keyboard nav.
- Smooth Scrolling: In-page navigation with smooth scrolling and a back-to-top button that appears after scrolling.

## Style Guidelines:

- Primary color: #2F6F5E (sage/teal) for brand, CTAs, links, and accents.
- Background color: #F3F7F5 (light sage) for section backgrounds and page canvas.
- Accent color: #8CBFB0 (light green) for highlights, secondary buttons, chips, and icon backgrounds.
- Headings: 'Playfair Display', serif (Google Fonts).
- Body/UI: 'Inter', sans-serif (Google Fonts).
- Professional, calming line icons related to mental health and therapy (outline style).
- Mobile-first responsive design, ample white space, soft dividers, rounded cards, shadow-sm.
- Reduced motion support (prefers-reduced-motion). Avoid parallax; keep transitions subtle.
- 1.25–1.6 line-height, max-width ~70ch for long text.