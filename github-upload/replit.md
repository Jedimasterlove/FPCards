# Finding Peace - Relationship Building Platform

## Overview

Finding Peace is a web-based relationship building platform that provides structured guidance through interactive card decks. The application serves educational content focused on emotional intelligence, communication skills, and relationship foundations through an elegant, responsive interface. 

**Current Status:** Fully functional with authentic Troy L. Love conversation card content, PostgreSQL database storage, beautiful homepage design with instructional content, and interactive accordion interface for structured cards. Foundation Basics deck complete with 6 cards, Empathic Listening deck complete with 4 cards, and Wounds & Fears deck complete with 4 cards, all featuring expandable accordion sections. All 34 conversation cards across 6 therapeutic decks are accessible with enhanced content organization. Admin interface available for manual content editing.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom peace-themed color palette
- **Build Tool**: Vite for fast development and optimized builds
- **Animations**: Framer Motion for smooth transitions

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Pattern**: RESTful API with JSON responses
- **Development**: Hot reload with Vite middleware integration

### Mobile-First Design
The application is designed as a mobile-first progressive web app with:
- Maximum width constraints (max-w-md) for phone-like experience
- Touch-friendly navigation with bottom navigation bar
- Card-based UI patterns optimized for small screens
- Shadow effects and rounded corners for app-like feel

## Key Components

### Database Schema
**Card Decks Table**: Stores deck metadata including title, description, color themes, and ordering
**Cards Table**: Contains individual card content with categories, previews, and deck associations
**Users Table**: Basic user management with username/password authentication (not currently implemented in UI)

### API Endpoints
- `GET /api/decks` - Retrieve all available card decks
- `GET /api/decks/:key` - Get specific deck by key
- `GET /api/decks/:key/cards` - Get all cards for a specific deck
- `GET /api/cards/:id` - Get individual card details

### Storage Layer
Implements an interface-based storage pattern with in-memory implementation for development. The system includes:
- User management capabilities
- Card deck CRUD operations
- Card content management
- Pre-populated content for Foundation, Listening, and other relationship topics

### UI Components
- **Header Component**: Branded header with navigation and deck-specific styling
- **Bottom Navigation**: Fixed bottom navigation with Home, Search, Saved, Profile tabs
- **Card Deck Grid**: Responsive grid layout for deck browsing
- **Card Display**: Full-screen card reader with navigation between cards

## Data Flow

1. **Application Bootstrap**: React app initializes with TanStack Query client
2. **Route Handling**: Wouter manages navigation between dashboard, deck view, and card view
3. **Data Fetching**: TanStack Query handles API calls with caching and error handling
4. **State Management**: Server state cached by TanStack Query, UI state managed locally
5. **Content Rendering**: Cards display rich content with navigation controls

## External Dependencies

### Core Framework Dependencies
- React ecosystem (react, react-dom, react-router via wouter)
- TypeScript for type safety
- Vite for development and build tooling

### UI and Styling
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Framer Motion for animations
- Custom color palette focused on warm, peaceful tones

### Backend Dependencies
- Express.js for server framework
- Drizzle ORM for database operations
- Neon serverless PostgreSQL
- Zod for schema validation

### Development Tools
- ESBuild for server-side bundling
- PostCSS for CSS processing
- Replit-specific plugins for development environment

## Deployment Strategy

### Development Environment
- Replit-based development with auto-reload
- Vite dev server with Express middleware
- PostgreSQL module for database provisioning
- Development port 5000 with external port 80

### Production Build
- Client-side build outputs to `dist/public`
- Server-side bundle created with ESBuild
- Environment-based configuration
- Autoscale deployment target on Replit

### Database Management
- Drizzle migrations in `./migrations` directory
- Schema definitions in `shared/schema.ts`
- Database URL configuration via environment variables
- Push-based schema updates with `npm run db:push`

## Changelog

- June 24, 2025: Initial setup
- June 24, 2025: Added all authentic Finding Peace conversation card content:
  - Foundation Basics deck: Complete with 6 interactive accordion cards (AEIOU, ATTUNE, ATTACHMENT WOUNDS, 8 CORE NEEDS, SHADOWS OF SHAME, BRPEs)
  - Empathic Listening deck: Complete with 4 interactive accordion cards (Observational Reflections, Emotional Inquiry, Empathic Understanding, Reflective Listening)
  - Wounds & Fears deck: Complete with 4 interactive accordion cards (When I Hurt, When You Hurt, Darling I Suffer, Darling You Suffer)
  - Owning My Part deck: 8 cards (Ownership Statement, Core Emotions & Facts, Shadows of Shame, Self-Reflection Questions, The Truth, Choice, BRPE Reminder, Tough Questions)
  - Common Ground deck: 5 cards (Safety Zone, Apologizing, Me - Center Yourself, Us - Reconnect, Slicing it Thinner)
  - About These Cards with source acknowledgments
- June 24, 2025: Fixed Vite configuration error
- June 24, 2025: Added PostgreSQL database and migrated from in-memory storage to persistent database storage
- June 24, 2025: BACKUP POINT - Fully functional Finding Peace app with redesigned homepage matching user's design specifications:
  * Redesigned homepage with dark background and centered content card
  * Integrated Finding Peace logo and proper branding
  * Created responsive 3-column grid layout for deck selection
  * Successfully populated database with all 6 decks and 28 authentic conversation cards
  * All navigation and card viewing functionality working properly
  * User confirmed: "I can see the cards and they appear to be working"
- June 24, 2025: Implemented interactive accordion interface for structured cards:
  * Created accordion system for AEIOU and ATTUNE cards with expandable sections
  * Built admin interface at `/admin` for manual card content editing
  * Added card update API endpoint for real-time content management
  * Successfully tested accordion functionality - user confirmed: "It is working"
- June 24, 2025: CHECKPOINT - Added ATTACHMENT WOUNDS card with accordion interface:
  * Created Card #3 in Foundation Basics with six expandable wound types
  * Integrated accordion functionality for Loss, Neglect, Rejection, Abandonment, Betrayal, and Abuse sections
  * Enhanced accordion pattern matching to support new emoji types
  * All three Foundation cards now feature interactive expandable content sections
  * User requested checkpoint save - system fully functional
- June 24, 2025: FINAL CHECKPOINT - Completed Foundation Basics deck with full accordion interface:
  * Added Card #4: 8 CORE NEEDS with eight expandable human needs sections
  * Added Card #5: SHADOWS OF SHAME with six expandable shadow persona sections
  * Added Card #6: BRPEs with four expandable defense response sections
  * Enhanced homepage with "How to Use These Cards" instructional section
  * Moved logo into main tan content area for unified design
  * Standardized all Foundation card titles to ALL CAPS formatting
  * Foundation Basics deck now complete with 6 interactive accordion cards (34 total cards in database)
  * User confirmed: "Lovely" and requested checkpoint save
- June 24, 2025: CHECKPOINT - Completed Empathic Listening deck with accordion interface:
  * Updated all 4 Empathic Listening cards to accordion format with authentic content
  * Card 1: Observational Reflections (4 expandable sections) - "It looks like", "It seems like", "It sounds like", "Repeat last 3-5 words"
  * Card 2: Emotional Inquiry (6 expandable sections) - Added "Tell me more..." technique for deeper dialogue
  * Card 3: Empathic Understanding (6 expandable sections) - Added "I can wrap my head around..." for acknowledging perspectives
  * Card 4: Reflective Listening (5 expandable sections) - Mirror techniques for understanding confirmation
  * Cleaned up duplicate titles while preserving accordion functionality
  * All Empathic Listening cards now feature interactive expandable content sections
  * User requested checkpoint save - both Foundation and Listening decks complete
- June 24, 2025: CHECKPOINT - Completed Wounds & Fears deck with accordion interface:
  * Updated all 4 Wounds & Fears cards to accordion format with authentic therapeutic content
  * Card 1: When I Hurt (6 expandable sections) - Framework for sharing emotional pain without blame
  * Card 2: When You Hurt (4 expandable sections) - Compassionate response guidelines for receiving pain
  * Card 3: Darling, I Suffer (8 expandable sections) - Vulnerable sharing framework with sample statement
  * Card 4: Darling, You Suffer (8 expandable sections) - Empathic witnessing framework with sample response
  * Added practical examples and complete sample statements for both cards
  * All Wounds & Fears cards now feature interactive expandable content sections
  * User requested checkpoint save - three complete decks with accordion formatting
- June 24, 2025: CHECKPOINT - Started converting Owning My Part deck to accordion format:
  * Created Clarity Process sequence within Owning My Part deck
  * Card 1: Clarity Process Step 1 - Ownership Statement (3 expandable sections) - Framework for taking responsibility
  * Card 2: Clarity Process Step 2 - Facts & Wound (2 expandable sections) - Objective facts and core beliefs
  * Card 3: Clarity Process Step 3 - Core Emotions (1 expandable section) - Identifying core emotions and physical sensations
  * Card 4: Clarity Process Step 4 - The Shadows of Shame (3 expandable sections) - Identifying shame messages and protective intent
  * Updated accordion detection logic to support new emoji patterns for structured therapeutic content
  * Owning My Part deck conversion in progress - 4 of 8 cards converted to accordion format
  * User requested backup checkpoint save
- June 24, 2025: CHECKPOINT - Completed Owning My Part deck with full Clarity Process accordion format:
  * Card 5: Clarity Process Step 5 - The Truth (6 expandable sections) - Challenge shame-based beliefs and discover authentic truth
  * Card 6: Clarity Process Step 6 - Choice (6 expandable sections) - Make values-aligned decisions honoring mutual needs
  * Card 7: Clarity Process Step 7 - BRPE Reminder (5 expandable sections) - Quick assessment of defensive behaviors
  * Card 8: Clarity Process Step 8 - Tough Questions (4 expandable sections) - Deep reflection for love-based responses
  * Enhanced Shadow descriptions with detailed therapeutic personas (Judge, Royal, Politician, Martyr, Impotent One, Rebel)
  * Added comprehensive 8 Core Needs framework for self-awareness and advocacy
  * All 8 Owning My Part cards now feature complete accordion interface with authentic therapeutic content
  * Card 6 enhanced with comprehensive 11-section conflict reflection framework for interrupting reactive cycles
  * Reordered cards 5-8 for better therapeutic flow: BRPE/Tough Questions before Truth/Choice phases
  * Owning My Part deck conversion complete - structured Clarity Process for relationship healing
- June 25, 2025: CHECKPOINT - Completed Common Ground deck with accordion format and updated About cards:
  * Card 1: Safety Zone (6 expandable sections) - Creating emotional safety during heated conversations
  * Card 2: Apologizing (5 expandable sections) - Complete heart-centered apology framework
  * Card 3: Me - Center Yourself (4 expandable sections) - Centering before difficult conversations
  * Card 4: Us - Reconnect (6 expandable sections) - Finding common ground and shared vision
  * Card 5: Slicing it Thinner (2 expandable sections) - Beginning conversations with vulnerability
  * All 5 Common Ground cards now feature authentic therapeutic content in accordion format
  * Updated About These Cards with comprehensive source acknowledgments including Troy L. Love and other experts
  * Five complete decks now feature accordion interface: Foundation, Listening, Wounds & Fears, Owning My Part, Common Ground
  * User requested backup checkpoint save
- June 25, 2025: Updated About These Cards Card 1 with expanded source acknowledgments:
  * Enhanced content with detailed expert attributions including Dr. Sue Johnson, Chris Voss, Drs. Hendrix & Hunt, Dr. Gottman, Dr. Warner, Crucial Conversations authors, and Troy L. Love
  * Added website references for further learning and deeper exploration of therapeutic frameworks
  * Maintained authentic therapeutic content focus while providing comprehensive resource guide
- June 25, 2025: BACKUP POINT - Completed Finding Peace app with enhanced About These Cards:
  * Updated Card 1 content to feature streamlined "The frameworks behind these conversation tools" header
  * Enhanced visual hierarchy with larger "Core Influences:" section header (text-xl, bold)
  * Reduced spacing between sections for better content density and readability
  * All 34 conversation cards across 6 therapeutic decks fully functional with accordion interface
  * Complete source acknowledgments featuring leading relationship therapy experts
  * Application fully operational with authentication-ready backend and responsive mobile-first design
- June 25, 2025: BACKUP POINT - Content refinements and UI improvements:
  * Updated main background color from amber gradient to #333333 (dark gray)
  * Changed "Conversation Card Decks" title color to #f5d7bf (tan/beige)
- June 27, 2025: Updated tan color consistency across web and mobile apps:
  * Changed mobile app header background from #D2B48C to #f5d7bf for unified color scheme
  * Both web and mobile apps now use consistent #f5d7bf tan color for branding elements
  * Refined Foundation Basics Card 1: Removed "AEIOU" and "The Vowel Check-In - Try to do this every day" text
  * Refined Foundation Basics Card 2: Removed "ATTUNE" and "Attunement Practice" text
  * Final color adjustment: Updated tan color from #f5d7bf to #f0dfc8 for warmer, more inviting aesthetic
  * Updated background colors in "How to Use These Cards" section and mobile app header backgrounds
  * Updated Foundation Basics Card 5 Shadows definitions with authentic therapeutic content
  * Enhanced Judge shadow definition to emphasize perfectionism and self-criticism
- June 27, 2025: COMPLETE GITHUB REPOSITORY SETUP:
  * Created comprehensive README.md with installation and setup instructions
  * Added .env.example template for environment variable configuration
  * Created Dockerfile for containerized deployment
  * Added docker-compose.yml for local development with PostgreSQL
  * Enhanced .gitignore with complete exclusion patterns
  * Updated DEPLOYMENT.md with GitHub repository setup guide
  * Repository now contains all necessary files for deployment elsewhere
  * Added PWA manifest.json for Progressive Web App capabilities
  * Complete project structure ready for GitHub distribution
- June 30, 2025: GITHUB IMPORT PREPARATION COMPLETE:
  * Fixed port binding issue - app now running successfully on port 5000
  * Created comprehensive README.md with full setup instructions
  * Added .env.example template for environment variables
  * Created proper .gitignore file excluding sensitive files and build artifacts
  * Created GITHUB_IMPORT_GUIDE.md with step-by-step repository creation instructions
  * All files prepared for GitHub repository import
  * Project ready for download from Replit and upload to GitHub
  * Refined Foundation Basics Card 1: Removed "AEIOU" and "The Vowel Check-In - Try to do this every day" text
  * Refined Foundation Basics Card 2: Removed "ATTUNE" and "Attunement Practice" text
  * Maintained accordion functionality for both cards with updated detection logic
  * Card 1: 5 accordion sections (Affirmation, Eye Gazing, Inquire, Ownership, Unite with Ritual)
  * Card 2: 5 accordion sections (Attend, Turn Toward, Understand with Empathy, No BRPEs, Engage with Compassion)
  * All therapeutic content preserved with cleaner presentation
  * User confirmed accordion format working correctly
- June 25, 2025: BACKUP POINT - Completed Foundation Basics deck content refinements:
  * Refined Foundation Basics Card 3: Removed second "ATTACHMENT WOUNDS" title, maintained accordion format (6 sections: Loss, Neglect, Rejection, Abandonment, Betrayal, Abuse)
  * Refined Foundation Basics Card 4: Updated with user's exact 8 Core Needs content in accordion format (8 sections: Acceptance, Assurance, Attention & Presence, Autonomy, Growth & Contribution, Novelty & Pleasure, Safety & Security, Significance)
  * Refined Foundation Basics Card 5: Removed second "Shadows of Shame" title, changed Martyr emoji to 👣 (footprints), maintained accordion format (6 sections: Judge, Royal, Politician, Martyr, Impotent One, Rebel)
  * Refined Foundation Basics Card 6: Removed second "BRPEs" title, maintained accordion format (4 sections: Blame, Rescue, Protest, Escape)
  * Updated Owning My Part Card 1: Changed title from "Clarity Process A - Ownership Statement" to "Clarity Process Step 1"
  * All accordion detection logic updated to preserve functionality after title removals
  * User requested to preserve original content exactly as provided
  * Foundation Basics deck now complete with cleaner titles and consistent accordion interface
- June 25, 2025: EXPO MOBILE APP CONVERSION COMPLETE:
  * Created complete React Native Expo app structure in /mobile directory
  * Built three main screens: DashboardScreen, DeckScreen, CardScreen with full feature parity
  * Implemented React Navigation with bottom tabs and stack navigation
  * Added accordion interface for structured cards matching web app functionality
  * Configured EAS deployment settings with development, preview, and production profiles
  * Set up API service layer to connect with existing Express backend
  * Added custom deck color theming and mobile-optimized UI components
  * User provided EXPO_TOKEN for deployment authentication
  * Ready for EAS build and app store deployment
  * Mobile app shares same PostgreSQL database and API endpoints as web app
- June 25, 2025: GOOGLE PLAY STORE DEPLOYMENT GUIDE COMPLETE:
  * Created comprehensive Google Play Store upload documentation (DEPLOYMENT.md)
  * Added detailed pre-upload checklist (GOOGLE_PLAY_CHECKLIST.md)
  * Provided step-by-step store listing optimization guide
  * Included app description template and keyword recommendations
  * Documented technical requirements and asset specifications
  * Ready for immediate Google Play Store submission after web app deployment

## User Preferences

Preferred communication style: Simple, everyday language.