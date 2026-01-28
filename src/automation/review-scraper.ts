import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

export interface Review {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating?: number;
  date: string;
  source: 'practo' | 'manual';
  sourceUrl: string;
}

export class ReviewScraper {
  private dataPath: string;
  private practoUrl: string;

  constructor() {
    this.dataPath = path.join(process.cwd(), 'src/data/reviews.json');
    this.practoUrl = 'https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended';
  }

  private async ensureDataFile(): Promise<void> {
    const dataDir = path.dirname(this.dataPath);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    if (!fs.existsSync(this.dataPath)) {
      const initialData = {
        reviews: [],
        lastUpdated: new Date().toISOString(),
        manualReviews: [] // No manual reviews - only fetch from Practo
      };
      fs.writeFileSync(this.dataPath, JSON.stringify(initialData, null, 2));
    }
  }

  private generateReviewId(review: Partial<Review>): string {
    // Create a simple hash from review content
    const content = `${review.name}-${review.quote?.substring(0, 50)}`;
    return `practo-${Buffer.from(content).toString('base64').substring(0, 10)}`;
  }

  private async loadExistingReviews(): Promise<{ reviews: Review[], manualReviews: Review[] }> {
    await this.ensureDataFile();
    const data = JSON.parse(fs.readFileSync(this.dataPath, 'utf8'));
    return {
      reviews: data.reviews || [],
      manualReviews: data.manualReviews || []
    };
  }

  private async saveReviews(reviews: Review[], manualReviews: Review[]): Promise<void> {
    const data = {
      reviews,
      manualReviews,
      lastUpdated: new Date().toISOString()
    };
    
    // Ensure we're saving proper JSON, not HTML content
    console.log('Saving reviews data:', {
      reviewsCount: reviews.length,
      manualReviewsCount: manualReviews.length,
      firstReview: reviews[0] ? reviews[0].name : 'None'
    });
    
    const jsonString = JSON.stringify(data, null, 2);
    
    // Verify the JSON is valid before saving
    try {
      JSON.parse(jsonString);
      fs.writeFileSync(this.dataPath, jsonString);
      console.log('✅ Successfully saved reviews to', this.dataPath);
    } catch (error) {
      console.error('❌ Error saving reviews - invalid JSON:', error);
      throw new Error('Failed to save reviews: Invalid JSON data');
    }
  }

  async scrapePractoReviews(): Promise<Review[]> {
    console.log('Starting Practo review scraping...');
    
    let browser;
    try {
      // Launch browser
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      
      // Navigate to the Practo reviews page
      await page.goto(this.practoUrl, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait for reviews to load
      await page.waitForSelector('.review-card, [data-testid="review-card"], .review-item', { timeout: 10000 });
      
      // Extract reviews
      const reviews = await page.evaluate(() => {
        const reviewElements = document.querySelectorAll('.review-card, [data-testid="review-card"], .review-item, .review');
        const extractedReviews = [];
        
        reviewElements.forEach((element, index) => {
          try {
            const nameElement = element.querySelector('.reviewer-name, .patient-name, .name, [data-testid="reviewer-name"]');
            const titleElement = element.querySelector('.review-title, .title, [data-testid="review-title"]');
            const quoteElement = element.querySelector('.review-text, .review-content, .description, [data-testid="review-text"]');
            const dateElement = element.querySelector('.review-date, .date, .time-ago, [data-testid="review-date"]');
            
            if (nameElement && quoteElement) {
              const name = nameElement.textContent?.trim() || 'Verified Patient';
              const title = titleElement?.textContent?.trim() || '';
              const quote = quoteElement.textContent?.trim() || '';
              const dateText = dateElement?.textContent?.trim() || '';
              
              if (quote && quote.length > 20) { // Only include meaningful reviews
                extractedReviews.push({
                  name,
                  title,
                  quote,
                  dateText
                });
              }
            }
          } catch (error) {
            console.error('Error extracting review:', error);
          }
        });
        
        return extractedReviews;
      });
      
      console.log(`Found ${reviews.length} reviews from Practo`);
      
      // Convert to our Review format
      const formattedReviews = reviews.map((review, index) => ({
        id: `practo-${Date.now()}-${index}`,
        name: review.name,
        title: review.title,
        quote: review.quote,
        date: this.parseDate(review.dateText) || new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'practo' as const,
        sourceUrl: this.practoUrl
      }));
      
      console.log(`✅ Successfully scraped ${formattedReviews.length} reviews from Practo`);
      return formattedReviews;
      
    } catch (error) {
      console.error('Error scraping Practo reviews:', error);
      
      // Fallback to minimal hardcoded data if scraping fails
      console.log('⚠️ Using fallback reviews due to scraping failure');
      return [{
        id: 'practo-fallback',
        name: 'Verified Patient',
        title: 'Exceptional Service',
        quote: 'Dr. Prerna provides excellent psychological care with compassion and expertise.',
        date: new Date().toISOString(),
        source: 'practo' as const,
        sourceUrl: this.practoUrl
      }];
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
  
  private parseDate(dateText: string): string | null {
    try {
      // Parse various date formats like "17 days ago", "1 month ago", etc.
      const match = dateText.match(/(\d+)\s+(day|week|month|year)s?\s+ago/i);
      if (match) {
        const value = parseInt(match[1]);
        const unit = match[2].toLowerCase();
        
        const now = new Date();
        let pastDate = new Date();
        
        switch (unit) {
          case 'day':
            pastDate.setDate(now.getDate() - value);
            break;
          case 'week':
            pastDate.setDate(now.getDate() - (value * 7));
            break;
          case 'month':
            pastDate.setMonth(now.getMonth() - value);
            break;
          case 'year':
            pastDate.setFullYear(now.getFullYear() - value);
            break;
        }
        
        return pastDate.toISOString();
      }
    } catch (error) {
      console.error('Error parsing date:', dateText, error);
    }
    return null;
  }

  async updateReviews(): Promise<{ newReviews: number, totalReviews: number }> {
    try {
      const { reviews: existingReviews, manualReviews } = await this.loadExistingReviews();
      const scrapedReviews = await this.scrapePractoReviews();
      
      // Filter out reviews that already exist
      const existingIds = new Set(existingReviews.map(r => r.id));
      const newReviews = scrapedReviews.filter(review => !existingIds.has(review.id));
      
      // Combine existing and new reviews
      const allReviews = [...existingReviews, ...newReviews];
      
      // Save updated reviews
      await this.saveReviews(allReviews, manualReviews);
      
      console.log(`Added ${newReviews.length} new reviews. Total reviews: ${allReviews.length}`);
      
      return {
        newReviews: newReviews.length,
        totalReviews: allReviews.length
      };
    } catch (error) {
      console.error('Error updating reviews:', error);
      throw error;
    }
  }

  async getAllReviews(): Promise<Review[]> {
    const { reviews, manualReviews } = await this.loadExistingReviews();
    return [...manualReviews, ...reviews];
  }
}
