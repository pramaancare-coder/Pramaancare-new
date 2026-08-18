# Review Automation System

This system automatically monitors and syncs patient reviews from Practo to your website's testimonials section.

## Features

- 🤖 **Automatic Daily Sync**: Reviews are automatically checked and synced daily at 9:00 AM IST
- 🔄 **Manual Sync**: Trigger manual review syncing via API or admin panel
- 💾 **JSON Storage**: Reviews are stored in a local JSON file (no database required)
- 🎯 **Fallback System**: Falls back to manual testimonials if dynamic reviews fail to load
- 🏷️ **Source Tracking**: Distinguishes between Practo reviews and manual testimonials
- 📊 **Admin Dashboard**: View and manage all reviews from `/admin/reviews`

## Source Website

The system monitors this Practo profile for new reviews:
https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist

## How It Works

1. **Web Scraping**: Uses Puppeteer to scrape reviews from the Practo website
2. **Intelligent Parsing**: Attempts to extract patient names, reviews, and ratings
3. **Duplicate Prevention**: Only adds new reviews that haven't been scraped before
4. **Data Storage**: Stores reviews in `src/data/reviews.json`
5. **Dynamic Display**: The testimonials component loads reviews dynamically

## Files Overview

```
src/
├── automation/
│   ├── index.ts              # Automation initialization
│   ├── review-scraper.ts     # Main scraping logic
│   └── review-scheduler.ts   # Cron job scheduler
├── data/
│   └── reviews.json          # Review storage (auto-generated)
├── hooks/
│   └── use-reviews.ts        # React hook for reviews
├── app/
│   ├── api/reviews/
│   │   ├── route.ts          # API endpoints for reviews
│   │   └── sync/route.ts     # Manual sync endpoint
│   └── admin/reviews/
│       └── page.tsx          # Admin dashboard
└── components/sections/
    └── testimonials.tsx      # Updated testimonials component
```

## Usage

### Automatic Operation
The system runs automatically once you start your Next.js server. No manual intervention required!

### Manual Operations

#### 1. Admin Dashboard
Visit `/admin/reviews` to:
- View all reviews
- Manually trigger sync
- Monitor automation status
- See sync statistics

#### 2. API Endpoints

**Get all reviews:**
```bash
GET /api/reviews
```

**Manually trigger sync:**
```bash
POST /api/reviews/sync
```

#### 3. Test the Scraper
```bash
npm run test:scraper
```

### Development

#### Add New Manual Testimonials
Edit the `manualReviews` array in `src/automation/review-scraper.ts`:

```typescript
manualReviews: [
  {
    id: 'manual-new',
    quote: "Your testimonial text here",
    name: "Client Name",
    title: "Client Type",
    date: new Date().toISOString(),
    source: 'manual',
    sourceUrl: ''
  }
]
```

#### Modify Scraping Logic
The scraper tries multiple strategies to find reviews. Edit `scrapePractoReviews()` in `review-scraper.ts` to adjust:
- CSS selectors for review elements
- Text parsing patterns
- Data extraction logic

#### Change Schedule
Modify the cron pattern in `review-scheduler.ts`:
```typescript
// Current: Daily at 9:00 AM IST
cron.schedule('0 9 * * *', ...)

// Examples:
// Every 6 hours: '0 */6 * * *'
// Weekly on Monday 9 AM: '0 9 * * 1'
// Every hour: '0 * * * *'
```

## Troubleshooting

### No Reviews Being Scraped
1. Check if Practo has changed their HTML structure
2. Review browser console logs for scraping errors
3. Test manually: `npm run test:scraper`
4. Verify the Practo URL is accessible

### Reviews Not Displaying
1. Check `/admin/reviews` for data presence
2. Verify API endpoints are working: `/api/reviews`
3. Check browser console for React errors

### Automation Not Running
1. Verify the server is running (automation only works on server-side)
2. Check server logs for initialization messages
3. Ensure cron jobs are supported in your deployment environment

## Deployment Notes

### Production Considerations
- **Puppeteer**: Ensure your hosting environment supports Puppeteer
- **Cron Jobs**: Some serverless platforms don't support background jobs
- **File Storage**: The JSON file needs write permissions
- **Rate Limiting**: Be respectful of Practo's servers

### Environment Variables (Optional)
You can add these to `.env.local` for configuration:

```env
REVIEW_SYNC_ENABLED=true
REVIEW_SYNC_SCHEDULE="0 9 * * *"
PRACTO_URL="https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist"
```

## Support

If you encounter issues:
1. Check the admin dashboard for errors
2. Review server logs for automation messages
3. Test the scraper manually
4. Verify the Practo URL is still valid

The system is designed to be resilient - if scraping fails, it will fall back to manual testimonials to ensure your website always displays reviews.
