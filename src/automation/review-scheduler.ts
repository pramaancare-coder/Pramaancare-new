import cron from 'node-cron';
import { ReviewScraper } from './review-scraper';

export class ReviewScheduler {
  private scraper: ReviewScraper;
  private isRunning: boolean = false;

  constructor() {
    this.scraper = new ReviewScraper();
  }

  start(): void {
    console.log('Starting review automation scheduler...');
    
    // Run daily at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
      if (this.isRunning) {
        console.log('Review scraping already in progress, skipping...');
        return;
      }

      this.isRunning = true;
      try {
        console.log('Starting scheduled review update...');
        const result = await this.scraper.updateReviews();
        
        if (result.newReviews > 0) {
          console.log(`✅ Found ${result.newReviews} new reviews! Total reviews: ${result.totalReviews}`);
          // Here you could add email notifications or other alerts
        } else {
          console.log('✅ No new reviews found. Total reviews:', result.totalReviews);
        }
      } catch (error) {
        console.error('❌ Error during scheduled review update:', error);
      } finally {
        this.isRunning = false;
      }
    }, {
      timezone: "Asia/Kolkata"
    });

    console.log('✅ Review scheduler started. Will run daily at 9:00 AM IST');
  }

  async runManually(): Promise<{ newReviews: number, totalReviews: number }> {
    if (this.isRunning) {
      throw new Error('Review scraping already in progress');
    }

    this.isRunning = true;
    try {
      console.log('Running manual review update...');
      const result = await this.scraper.updateReviews();
      console.log(`Manual update complete. New reviews: ${result.newReviews}, Total: ${result.totalReviews}`);
      return result;
    } finally {
      this.isRunning = false;
    }
  }

  stop(): void {
    cron.getTasks().forEach(task => task.stop());
    console.log('Review scheduler stopped');
  }
}
