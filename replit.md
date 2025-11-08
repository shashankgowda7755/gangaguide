# GangaGuides - Spiritual Travel Website

## Overview

GangaGuides is a spiritual travel website focused on authentic tours in Varanasi (Kashi), Ayodhya, Sarnath, and Prayagraj. The platform serves as a lead generation tool, guiding users toward WhatsApp engagement and booking forms. The website emphasizes spiritual serenity, visual trust through authentic imagery, and effortless navigation while maintaining cultural authenticity with traditional Indian design elements.

The application is built as a full-stack TypeScript web application with a React frontend and Express backend, designed to showcase tour packages, destinations, blog content, and facilitate user engagement through multiple contact methods.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (no React Router dependency)
- React Query (@tanstack/react-query) for server state management and API data fetching

**UI Component System**
- Shadcn UI component library (New York style variant) for consistent design patterns
- Radix UI primitives for accessible, unstyled components
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theming supporting both light and dark modes
- Framer Motion for animations and transitions (FadeInSection component)

**Design System**
- Typography: Playfair Display (headings), Inter (body), Crimson Text (quotes/testimonials)
- Color palette based on spiritual themes: Deep Ganga Blue, Sacred Saffron, Warm Gold, Soft Ivory
- Responsive design with mobile-first approach
- Custom CSS variables for theme consistency across light/dark modes

**State Management**
- React Query for server state (destinations, packages, blog posts)
- Local component state with React hooks for UI interactions
- No global state management library - data fetched per page/component as needed

**Key UI Patterns**
- Hero slider with auto-rotation and manual navigation
- Card-based layouts with hover effects and flip animations (PackageCardFlip)
- Bottom navigation bar for mobile-friendly access
- Floating WhatsApp button for constant CTA visibility
- Modal dialogs for booking forms and package details

### Backend Architecture

**Server Framework**
- Express.js server handling API routes and static file serving
- TypeScript throughout for type safety
- ESM modules (not CommonJS)
- Vite middleware integration for development with HMR
- Static file serving for production builds

**API Structure**
- RESTful API endpoints organized by resource type:
  - `/api/destinations` - CRUD operations for travel destinations
  - `/api/packages` - CRUD operations for tour packages
  - `/api/blog-posts` - CRUD operations for blog content
- Standard HTTP methods (GET, POST, PATCH) with consistent JSON responses
- Error handling middleware for graceful failure responses

**Data Layer**
- Storage abstraction layer (IStorage interface) separating business logic from database
- DatabaseStorage implementation using Drizzle ORM
- Schema validation using Zod (via drizzle-zod)
- Database seeding logic for initial content population

### Data Storage

**Database System**
- PostgreSQL via Neon serverless database (@neondatabase/serverless)
- Connection pooling for efficient resource management
- WebSocket support for serverless PostgreSQL connections
- Database credentials managed through environment variables

**ORM & Schema Management**
- Drizzle ORM for type-safe database queries
- Schema-first approach with TypeScript types generated from database schema
- Migration system using drizzle-kit (migrations folder)
- Shared schema module accessible to both client and server

**Data Models**
1. **Users** - Authentication/authorization (currently minimal implementation)
2. **Destinations** - Travel locations with descriptions, images, and featured status
3. **Packages** - Tour packages with pricing, duration, highlights, and categories
4. **Blog Posts** - Content marketing with categories, read time, and featured status

**Content Management**
- Featured content flag for homepage display filtering
- Multiple image support (main + up to 3 additional images) per destination/blog
- Category-based filtering for packages (popular events, touristic, pooja)
- Rich text descriptions with excerpt support

### Authentication & Authorization

Currently minimal authentication implementation:
- Basic user schema with username/password fields
- Session management via connect-pg-simple (PostgreSQL session store)
- Authentication system prepared but not fully implemented in routes
- Future enhancement area for admin content management

### External Dependencies

**Third-Party Services**
- **WhatsApp Business API Integration**
  - Phone number: +91-84680-03094 (configurable via VITE_WHATSAPP_NUMBER env var)
  - Pre-filled message templates for different contexts (booking, package inquiry, general contact)
  - Multiple WhatsApp CTAs: floating button, bottom nav, inline buttons

**Image Assets**
- Static images served from `/attached_assets/generated_images/` directory
- AI-generated imagery for destinations, packages, and blog posts
- Image paths stored as URLs in database for flexible asset management

**Analytics & Development Tools**
- Replit-specific plugins for development environment (cartographer, dev-banner, runtime-error-modal)
- Source map support (@jridgewell/trace-mapping) for debugging

**External Libraries**
- React Icons (FaWhatsapp, Lucide icons) for UI iconography
- Embla Carousel for image/content carousels
- Date-fns for date formatting and manipulation
- Class Variance Authority (CVA) for component variant management
- clsx + tailwind-merge for className composition

**SEO & Metadata**
- Comprehensive meta tags for social sharing (Open Graph, Twitter Cards)
- Structured data (JSON-LD) for search engines
- Robots.txt and sitemap.xml for crawler management
- Canonical URLs and locale specification

**Font Delivery**
- Google Fonts CDN for web font delivery
- Font preconnect optimization for performance
- Three font families loaded: Playfair Display, Inter, Crimson Text

**Build & Deployment**
- esbuild for server bundle creation
- PostCSS with Tailwind CSS and Autoprefixer
- Environment-specific builds (development vs production)
- Static asset bundling through Vite

### Content Strategy

**Lead Generation Focus**
- Multiple conversion points: WhatsApp float, booking forms, bottom nav CTA
- Form-based booking with fields: name, email, phone, travel date, travelers, special requests
- Package-specific WhatsApp templates for targeted engagement

**Content Categories**
1. Destinations - Geographic locations with detailed guides
2. Packages - Three categories: Popular Events, Tourist, Pooja
3. Blog Posts - Travel stories, festival experiences, spiritual insights
4. Testimonials - Text reviews and video testimonials from social platforms

**Content Features**
- Read More functionality redirecting to dedicated detail pages
- "View All" buttons for category landing pages
- Featured content filtering for homepage display
- Social sharing capabilities (WhatsApp, Instagram suggestions, copy link)