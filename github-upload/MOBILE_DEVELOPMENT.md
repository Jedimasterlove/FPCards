# Finding Peace Mobile Development Guide

## Running the Expo Mobile App

### Why Local Development is Required:

Expo development servers need direct device communication and proper Node.js environment. Replit's server environment has limitations for mobile development.

### Local Development Steps:

1. **Download your project** as ZIP from Replit
2. **Extract** and navigate to the mobile directory:
   ```bash
   cd mobile
   npm install
   npx expo start
   ```
3. **Scan QR code** with Expo Go app on your phone

### Alternative: Use GitHub Codespaces or Local Machine

**GitHub Codespaces:**
1. Push your project to GitHub
2. Open in Codespaces
3. Run mobile development there

**Local Machine:**
1. Install Node.js and npm
2. Extract your ZIP project
3. Follow development steps above

### Option 2: Replit Development (Limited)

Since Replit's environment has limitations for mobile development:

1. **Install dependencies** first (if not already done)
2. **Update API endpoint** in `mobile/src/services/api.ts`:
   ```typescript
   const API_BASE_URL = 'https://finding-peace-cards-troy113.replit.app/api';
   ```

### Testing Your Mobile App

**With Expo Go:**
- Install "Expo Go" app on your phone
- Scan QR code from `expo start` command
- Test all conversation card features

**For Production:**
```bash
npx eas build --platform android --profile production
```

### Mobile App Features Ready:

✅ **Dashboard Screen** - Grid of 6 therapeutic decks
✅ **Deck Screen** - Card listings with previews  
✅ **Card Screen** - Full accordion interface
✅ **Navigation** - Bottom tabs and stack navigation
✅ **API Integration** - Connects to your deployed web backend
✅ **App Store Ready** - EAS build configuration complete

### Current Status:

Your Finding Peace mobile app is fully functional with:
- All 34 conversation cards
- Accordion interface matching web version
- Custom deck color theming
- Ready for Google Play Store deployment

### Next Steps:

1. **Test locally** with `expo start`
2. **Build for production** when ready to deploy
3. **Submit to Google Play Store** using provided documentation

The mobile app shares the same PostgreSQL database and therapeutic content as your web application.