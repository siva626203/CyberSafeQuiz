# Cyber Safety Quiz

## Overview

An interactive web-based quiz application that teaches essential cybersecurity practices through engaging questions and explanations. The application features a 3D cyberpunk-themed visual experience built with React Three Fiber, animated UI components, and audio feedback. Users progress through multiple-choice questions covering topics like password security, phishing awareness, and safe browsing practices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript running on Vite for fast development and optimized production builds.

**3D Rendering**: React Three Fiber (@react-three/fiber) provides the WebGL-powered 3D scene with floating particles and cyberpunk aesthetics. The Canvas component wraps the entire 3D environment, while custom scene components handle animations and visual effects.

**State Management**: Zustand manages application state with two primary stores:
- `useGame`: Handles quiz logic including current question, score, phase transitions (menu → playing → showingExplanation → completed), and answer validation
- `useAudio`: Manages audio playback for background music and sound effects, with mute/unmute controls

**UI Components**: Radix UI primitives provide accessible, unstyled components that are styled with Tailwind CSS. The design system uses CSS custom properties for theming (colors, border radius) defined in the Tailwind config.

**Animation**: Framer Motion powers page transitions and UI animations for smooth visual feedback when answering questions and transitioning between screens.

**Styling**: Tailwind CSS with custom theme extensions for cyberpunk aesthetic (cyan/blue gradients, glow effects). PostCSS processes the styles with autoprefixer for browser compatibility.

### Backend Architecture

**Server Framework**: Express.js serves both API routes and static assets. The application uses different entry points for development (`index-dev.ts`) and production (`index-prod.ts`).

**Development Mode**: Vite's middleware mode integrates with Express to provide HMR (Hot Module Replacement) and live reloading during development. The dev server dynamically injects a unique version parameter into the HTML template to force fresh module loads.

**Production Mode**: Static file serving from the compiled `dist/public` directory. All routes fall through to `index.html` for client-side routing support.

**Build Process**: 
- Client: Vite bundles React application into optimized static assets
- Server: esbuild compiles TypeScript server code into a single ESM bundle for production deployment

**Storage Layer**: Currently implements in-memory storage (`MemStorage` class) for user data with interfaces designed for easy database integration. The storage interface supports CRUD operations for users.

### Database Schema

**ORM**: Drizzle ORM with PostgreSQL dialect provides type-safe database queries and migrations.

**Schema Design**: 
- `users` table with id (serial primary key), username (unique text), and password (text)
- Zod schemas (`insertUserSchema`) validate data before database operations
- TypeScript types are inferred from Drizzle schema definitions

**Database Provider**: Configured for Neon serverless PostgreSQL (`@neondatabase/serverless`) via `DATABASE_URL` environment variable.

**Migration Strategy**: Schema changes are tracked in the `./migrations` directory with `drizzle-kit push` for applying changes to the database.

### External Dependencies

**Third-party UI Libraries**:
- Radix UI: Complete set of accessible component primitives (dialog, dropdown, toast, etc.)
- Lucide React: Icon library for consistent iconography
- class-variance-authority + clsx: Type-safe component variant styling

**3D Graphics Stack**:
- Three.js: WebGL rendering engine
- @react-three/fiber: React renderer for Three.js
- @react-three/drei: Helper components and abstractions for common 3D patterns
- @react-three/postprocessing: Visual effects and shader-based post-processing
- vite-plugin-glsl: Enables importing GLSL shaders as modules

**Database & API**:
- Neon serverless PostgreSQL: Cloud-native Postgres database
- Drizzle ORM: Type-safe ORM with migration tooling
- TanStack Query (React Query): Server state management for API calls

**Development Tools**:
- TypeScript: Type safety across client and server
- Vite: Build tool with fast HMR
- esbuild: Fast JavaScript bundler for production server code
- tsx: TypeScript execution for Node.js

**Audio Assets**: The application expects audio files (background.mp3, hit.mp3, success.mp3) in the `/public/sounds/` directory for background music and sound effects.

**Font Loading**: Inter font family loaded via @fontsource/inter for consistent typography.