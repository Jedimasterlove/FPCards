# Finding Peace - Deployment Guide

## Current Project Status

✅ **Web Application**: Fully functional with all 34 conversation cards across 6 therapeutic decks
✅ **Database**: PostgreSQL with complete card content and accordion interface
✅ **Expo Mobile App**: React Native structure created with full feature parity

## GitHub Repository Setup

### Creating a Complete Repository

To create a GitHub repository that can run elsewhere, ensure you have these essential files:

#### ✅ Required Files Created
- `README.md` - Complete setup and installation instructions
- `.env.example` - Environment variable template with database configuration
- `Dockerfile` - Container configuration for easy deployment
- `docker-compose.yml` - Local development environment setup
- All source code directories (`client/`, `server/`, `shared/`, `mobile/`)

#### Repository Structure
```
finding-peace-cards/
├── README.md                 # Setup instructions
├── .env.example             # Environment template
├── Dockerfile               # Container config
├── docker-compose.yml       # Local development
├── package.json             # Dependencies
├── drizzle.config.ts        # Database config
├── client/                  # Web frontend
│   ├── src/pages/           # React components
│   ├── src/components/      # UI components
│   ├── index.html           # Main HTML
│   └── manifest.json        # PWA config
├── server/                  # Backend API
│   ├── index.ts            # Express server
│   ├── routes.ts           # API endpoints
│   └── storage.ts          # Database operations
├── shared/                  # Shared types
│   └── schema.ts           # Database schema
└── mobile/                  # React Native app
    ├── src/screens/        # Mobile screens
    ├── app.json           # Expo config
    └── eas.json           # Build config
```

#### Essential Commands for New Repositories
```bash
# Clone and setup
git clone <your-repo-url>
cd finding-peace-cards
npm install
cp .env.example .env
# Edit .env with your database URL
npm run db:push
npm run dev
```

#### Docker Setup (Recommended)
```bash
# Run with Docker (includes PostgreSQL)
docker-compose up -d
```

## Deployment Options

### 1. Web App Deployment (Recommended First Step)

The web application is ready for immediate deployment on Replit:

1. Click the "Deploy" button in your Replit project
2. The app will be accessible at `https://your-project-name.replit.app`
3. All 34 cards with accordion interface will be available
4. Database is already configured and populated

### 2. Google Play Store Upload Guide

**Step 1: Prepare for Production Build**
1. First, deploy your web app and note the URL (e.g., `https://your-project.replit.app`)
2. Update the API endpoint in `mobile/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'https://your-project.replit.app/api';
   ```
3. Add required app assets to `mobile/assets/`:
   - `icon.png` (1024x1024px)
   - `splash.png` (1284x2778px for iPhone 12)
   - `favicon.png` (48x48px)

**Step 2: Build Production APK/AAB**

**Important:** EAS builds must run from your local machine or GitHub Codespaces, not from Replit.

```bash
# Download project ZIP from Replit first
# Extract and navigate to mobile directory
cd mobile
npm install
npx eas login
npx eas build --platform android --profile production
```

**Step 3: Google Play Console Setup**
1. Go to [Google Play Console](https://play.google.com/console)
2. Click "Create app"
3. Fill in app details:
   - **App name**: "Finding Peace - Conversation Cards"
   - **Default language**: English (United States)
   - **App or game**: App
   - **Free or paid**: Free

**Step 4: App Content Requirements**
- **Privacy Policy**: Required (create at https://privacypolicygenerator.info/)
- **Data Safety**: Declare data collection practices
- **Content Rating**: Complete questionnaire (likely Everyone rating)
- **Target Audience**: Adults (relationship therapy content)

**Step 5: Upload APK/AAB**
1. Navigate to "Production" > "Releases"
2. Click "Create new release"
3. Upload your `.aab` file from EAS build
4. Add release notes describing the therapeutic conversation card features
5. Set version name (e.g., "1.0.0")

**Step 6: Store Listing**
- **App name**: Finding Peace - Conversation Cards
- **Short description**: "Therapeutic conversation cards for relationship building and emotional intelligence"
- **Full description**: Detail the 6 decks, accordion interface, and therapeutic benefits
- **Screenshots**: Capture 2-8 screenshots of different screens
- **Feature graphic**: 1024x500px promotional image

**Step 7: Review and Publish**
1. Complete all required sections (marked with red asterisks)
2. Click "Save draft" then "Send for review"
3. Review process typically takes 1-3 days
4. Once approved, app goes live on Google Play Store

**Build Profiles Available:**
- `development`: Internal testing builds
- `preview`: APK for device testing
- `production`: App store ready AAB files

### 3. App Store Optimization Tips

**App Store Listing Keywords:**
- Primary: "conversation cards", "relationship therapy", "emotional intelligence"
- Secondary: "couples therapy", "communication skills", "mindfulness", "self-reflection"

**Screenshots to Include:**
1. Homepage with deck grid
2. Foundation Basics deck view
3. Accordion card interface expanded
4. Different themed decks (Empathic Listening, Wounds & Fears)

**App Description Template:**
```
Finding Peace brings therapeutic conversation cards to your mobile device. Based on Troy L. Love's proven frameworks for relationship building and emotional intelligence.

✨ Features:
• 6 specialized therapeutic decks
• 34 interactive conversation cards
• Accordion interface for structured learning
• Offline access to all content
• Mobile-optimized for easy reading

🎯 Therapeutic Decks:
• Foundation Basics - Core relationship skills
• Empathic Listening - Deep connection techniques
• Wounds & Fears - Healing emotional pain
• Owning My Part - Personal responsibility
• Common Ground - Conflict resolution
• About These Cards - Source acknowledgments

Perfect for couples, therapists, counselors, and anyone seeking deeper emotional connections.
```

**Content Rating Guidance:**
- Select "Everyone" rating
- App contains educational/therapeutic content
- No inappropriate material for general audiences

## Technical Architecture

### Web App Features
- React frontend with Tailwind CSS
- PostgreSQL database with Drizzle ORM
- Express.js backend API
- Mobile-first responsive design
- Interactive accordion cards
- Custom deck color theming

### Mobile App Features
- React Native with Expo
- React Navigation for routing
- Native mobile UI components
- Same accordion interface as web
- Bottom tab navigation
- API integration with web backend

## Data Flow

```
Mobile App <-> REST API <-> PostgreSQL Database
Web App   <-> REST API <-> PostgreSQL Database
```

Both applications share the same backend API and database, ensuring consistent content across platforms.

## Support

For deployment issues:
1. Web app: Use Replit's built-in deployment
2. Mobile app: Use EAS CLI or Expo dashboard
3. Database: Already configured with environment variables