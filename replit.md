# Overview

Nova Forge is a Portuguese business technology consultancy platform focused on digital transformation for small and local businesses. The application provides technology solutions specifically for hospitality (inns/hotels), healthcare (medical/dental clinics), personal services (barbershops), and automotive services (repair shops). The platform features a company website with service showcases, client testimonials, contact forms, and an admin panel for managing inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client-side uses React 18 with TypeScript in a modern SPA architecture. Key design decisions include:

- **UI Framework**: Radix UI components with shadcn/ui for consistent, accessible design patterns
- **Styling**: Tailwind CSS with a dark theme configuration and custom color variables for professional branding
- **Routing**: Wouter for lightweight client-side routing (Home and Admin pages)
- **State Management**: React Query for server state management with optimistic updates
- **Animations**: Framer Motion for smooth page transitions and reveal animations
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

The architecture emphasizes performance with code splitting, modern build tools, and progressive enhancement patterns.

## Backend Architecture
The server uses Express.js with TypeScript in an ESM module setup:

- **API Design**: RESTful endpoints with `/api` prefix for clear separation
- **Validation**: Double validation using both Zod schemas and express-validator for security
- **Security**: Comprehensive security headers via Helmet, CORS configuration, and rate limiting
- **Error Handling**: Centralized error handling with development/production mode differences
- **Authentication**: Simple bearer token authentication for admin routes

The backend follows a layered architecture with clear separation between routes, business logic, and data access.

## Data Storage Solutions
The application uses PostgreSQL with Drizzle ORM for type-safe database interactions:

- **ORM Choice**: Drizzle provides excellent TypeScript integration and compile-time safety
- **Schema Design**: Shared schema definitions between client and server for type consistency
- **Database Provider**: Neon serverless PostgreSQL for scalable cloud hosting
- **Migrations**: Drizzle Kit for schema migrations and database management

Current schema includes user management and contact form storage with room for business-specific extensions.

## Development and Build System
The project uses modern tooling for optimal developer experience:

- **Build Tool**: Vite for fast development server and optimized production builds
- **TypeScript**: Strict configuration with path mapping for clean imports
- **Package Management**: npm with ESM modules throughout the stack
- **Development**: Hot module replacement and error overlays for rapid development

The monorepo structure keeps client, server, and shared code well-organized while enabling code reuse.

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and SSL requirement
- **Drizzle ORM**: Type-safe database client with excellent TypeScript integration

## UI and Styling Libraries
- **Radix UI**: Comprehensive accessible component primitives for consistent user interfaces
- **Tailwind CSS**: Utility-first CSS framework with custom theme configuration
- **Framer Motion**: Animation library for smooth transitions and interactive elements

## Development and Security Tools
- **Helmet**: Security headers middleware for Express applications
- **CORS**: Cross-origin request handling with environment-specific configuration
- **Express Rate Limit**: API rate limiting to prevent abuse
- **Zod**: Schema validation library for type-safe data validation

## Form and Communication
- **React Hook Form**: Performant form library with minimal re-renders
- **SendGrid**: Email service integration for contact form submissions (configured but not actively used)
- **React Query**: Server state management with caching and background updates

The architecture prioritizes type safety, developer experience, and scalability while maintaining simplicity for small business focus.