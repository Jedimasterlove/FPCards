# Finding Peace App - Setup Instructions

## After Importing ZIP to New Replit

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Database
1. **Enable PostgreSQL** in your new Replit:
   - Go to Tools → Database
   - Select PostgreSQL
   - Wait for database to provision

2. **Push Database Schema**:
```bash
npm run db:push
```

### Step 3: Start Application
```bash
npm run dev
```

## Common Issues & Solutions

### Issue: "Cannot find module" errors
**Solution**: Run `npm install` to install all dependencies

### Issue: Database connection errors
**Solution**: 
1. Ensure PostgreSQL is enabled in Tools → Database
2. Check that DATABASE_URL environment variable exists
3. Run `npm run db:push` to create tables

### Issue: "Command not found" errors
**Solution**: Make sure you're in the root directory of the project

### Issue: Port binding errors
**Solution**: Replit automatically handles ports, just use `npm run dev`

## Environment Variables Required
- `DATABASE_URL` - Automatically set by Replit PostgreSQL
- `PGHOST`, `PGPORT`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` - Auto-configured

## File Structure
```
├── client/          # React frontend
├── server/          # Express backend  
├── shared/          # Shared types/schema
├── mobile/          # React Native app
├── package.json     # Dependencies
└── drizzle.config.ts # Database config
```

## Verification Steps
1. ✅ Dependencies installed (`npm install`)
2. ✅ Database enabled (PostgreSQL in Tools)
3. ✅ Schema pushed (`npm run db:push`)
4. ✅ App running (`npm run dev`)
5. ✅ Can access localhost:5000 or preview URL

## If Still Not Working
1. Check console for specific error messages
2. Verify all files were uploaded correctly
3. Ensure PostgreSQL database is fully provisioned
4. Try restarting the Repl