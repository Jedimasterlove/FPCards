# Finding Peace - Relationship Building Platform

A digital therapeutic conversation application designed to facilitate emotional intelligence and relationship healing through an interactive, research-informed card deck system.

## Features

- **6 Therapeutic Card Decks**: Foundation Basics, Empathic Listening, Wounds & Fears, Owning My Part, Common Ground, and About These Cards
- **34 Interactive Conversation Cards**: Authentic therapeutic content with expandable accordion sections
- **Mobile-First Design**: Responsive web app optimized for phone use
- **PostgreSQL Database**: Persistent storage for all card content
- **React Native Mobile App**: Complete Expo-based mobile application

## Technology Stack

### Frontend
- React with TypeScript
- Wouter for routing
- TanStack Query for state management
- Radix UI + shadcn/ui components
- Tailwind CSS with custom theming
- Framer Motion animations

### Backend
- Node.js with Express.js
- PostgreSQL with Drizzle ORM
- TypeScript with ES modules
- RESTful API design

### Mobile
- React Native with Expo
- React Navigation
- Matching web app functionality

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd finding-peace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL
   ```

4. **Set up database**
   ```bash
   npm run db:push
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5000`

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/finding_peace
NODE_ENV=development
```

## API Endpoints

- `GET /api/decks` - Get all card decks
- `GET /api/decks/:key` - Get specific deck
- `GET /api/decks/:key/cards` - Get cards for a deck
- `GET /api/cards/:id` - Get specific card
- `PATCH /api/cards/:id` - Update card content (admin)

## Mobile App

The mobile app is located in the `/mobile` directory:

```bash
cd mobile
npm install
npx expo start
```

## Deployment

### Web Application
- Compatible with Vercel, Netlify, Railway, and other Node.js hosts
- Requires PostgreSQL database
- Set `NODE_ENV=production` for production builds

### Mobile Application
- Use Expo EAS for building: `npx eas build`
- Ready for App Store and Google Play submission

## Project Structure

```
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared types and schema
├── mobile/          # React Native Expo app
├── migrations/      # Database migrations
└── package.json     # Main dependencies
```

## Therapeutic Content

All conversation cards feature authentic therapeutic frameworks from leading relationship experts including:

- Dr. Sue Johnson (Emotionally Focused Therapy)
- Troy L. Love (Finding Peace methodology)
- Dr. John Gottman (Relationship research)
- Chris Voss (Negotiation techniques)
- And other certified therapeutic approaches

## Contributing

This project contains proprietary therapeutic content. Please respect intellectual property rights when contributing.

## License

Private - All rights reserved. Therapeutic content is proprietary and protected.

## Support

For technical issues, please check the setup instructions or create an issue in this repository.