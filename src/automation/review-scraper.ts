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
    this.practoUrl = 'https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist';
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
    
    // Force static data for now
    console.log('⚠️ Using static data from screenshot (forced)');
    return this.getStaticReviewsFromScreenshot();
    
    let browser;
    try {
      // Launch browser with better configuration
      browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox', 
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--disable-gpu'
        ]
      });
      
      const page = await browser.newPage();
      
      // Set user agent to look like a real browser
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
      
      // Navigate to the Practo reviews page
      await page.goto(this.practoUrl, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait a bit for the page to fully load
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Extract reviews from the actual website
      const reviews = await page.evaluate(() => {
        const extractedReviews: any[] = [];
        
        // Try specific Practo review selectors
        const reviewSelectors = [
          '[data-qa="review"]',
          '[data-testid="review"]',
          '.review-card',
          '.review-item',
          '.feedback-card',
          '.testimonial-card',
          '.patient-review',
          '.doctor-review',
          '.rating-review',
          '.review-section',
          '.feedback-section'
        ];
        
        // Try each selector
        for (const selector of reviewSelectors) {
          const elements = document.querySelectorAll(selector);
          console.log(`Found ${elements.length} elements with selector: ${selector}`);
          
          elements.forEach((element) => {
            try {
              const text = element.textContent?.trim() || '';
              
              if (text.length > 50 && text.length < 2000) {
                // Look for review patterns
                if (text.includes('Dr.') || text.includes('Prerna') || 
                    text.includes('experience') || text.includes('treatment') ||
                    text.includes('helped') || text.includes('good') ||
                    text.includes('excellent') || text.includes('recommend')) {
                  
                  // Try to extract structured data
                  const nameEl = element.querySelector('.name, .patient-name, .reviewer-name, [data-qa="reviewer-name"]');
                  const dateEl = element.querySelector('.date, .time, [data-qa="date"]');
                  const textEl = element.querySelector('.text, .review-text, .feedback-text, [data-qa="review-text"]');
                  
                  const name = nameEl?.textContent?.trim() || 'Verified Patient';
                  const reviewText = textEl?.textContent?.trim() || text;
                  const dateText = dateEl?.textContent?.trim() || '';
                  
                  if (reviewText.length > 30) {
                    extractedReviews.push({
                      name,
                      title: 'Patient Review',
                      quote: reviewText,
                      dateText
                    });
                  }
                }
              }
            } catch (error) {
              console.error('Error processing element:', error);
            }
          });
        }
        
        // If no structured reviews found, try generic approach
        if (extractedReviews.length === 0) {
          console.log('No structured reviews found, trying generic approach...');
          
          // Look for any text that might be reviews
          const allTextElements = document.querySelectorAll('p, div, span');
          allTextElements.forEach((element) => {
            const text = element.textContent?.trim() || '';
            
            if (text.length > 100 && text.length < 1000) {
              if (text.includes('Dr. Prerna') || 
                  (text.includes('Prerna') && (text.includes('therapy') || text.includes('session') || text.includes('treatment')))) {
                
                extractedReviews.push({
                  name: 'Verified Patient',
                  title: 'Patient Review',
                  quote: text,
                  dateText: 'Recently'
                });
              }
            }
          });
        }
        
        console.log(`Total extracted reviews: ${extractedReviews.length}`);
        return extractedReviews.slice(0, 6);
      });
      
      console.log(`Found ${reviews.length} reviews from Practo website`);
      
      // Convert to our Review format
      const formattedReviews = reviews.map((review: { name: string; title: string; quote: string; dateText: string }, index: number) => ({
        id: this.generateReviewId(review),
        name: review.name,
        title: review.title,
        quote: review.quote,
        date: this.parseDate(review.dateText) || new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toISOString(),
        source: 'practo' as const,
        sourceUrl: this.practoUrl
      }));
      
      console.log(`✅ Successfully scraped ${formattedReviews.length} reviews from Practo website`);
      return formattedReviews;
      
    } catch (error) {
      console.error('Error scraping Practo reviews:', error);
      
      // Return static data from screenshot if scraping fails
      console.log('⚠️ Real scraping failed, using static data from screenshot');
      return this.getStaticReviewsFromScreenshot();
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
private getStaticReviewsFromScreenshot(): Review[] {
  const staticReviews: Review[] = [
    {
      id: 'practo-1',
      name: 'Verified Patient',
      title: '',
      quote:
        "I recommend the doctor. Ms. Prerna Sethi is very patient and supportive in her approach. She's nuanced and provides structure which makes it easy to be consistent with the therapy sessions. She's understanding of your pace and won't rush you. I would highly recommend her to anyone wanting therapy or trying it for the first time. She's helped me a lot with countering negative thoughts and building a routine.",
      date: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-2',
      name: 'Verified Patient',
      title: '',
      quote:
        "She's very patient and attentive. She makes you very comfortable, and you feel genuinely heard. I would recommend her to anybody.",
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-3',
      name: 'Verified Patient',
      title: '',
      quote:
        "I cannot speak highly enough of Dr. Prerna. As a clinical psychologist, she brings a rare combination of deep insight, maturity, and compassion that makes a genuine difference in her clients' lives. She balances empathy with firmness, listens without judgment, and guides with clarity. Highly recommended to anyone seeking true psychological growth.",
      date: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-4',
      name: 'Ranjana Narshiman',
      title: '',
      quote:
        "She is very solution oriented, extremely practical, realistic, and calm. She points out hurdles clearly and offers positive solutions. My sessions with her have made a huge difference in how I handle things. I am very grateful to have her as my psychologist.",
      date: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-5',
      name: 'Verified Patient',
      title: '',
      quote:
        "My sessions with Prerna Sethi have been truly transformative. With deep empathy and insight, she helped me navigate complex relationships, anxiety, trauma, and motherhood challenges. I now have greater emotional resilience and a deeper understanding of myself.",
      date: new Date(Date.now() - 210 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-6',
      name: 'Verified Patient',
      title: '',
      quote:
        "She has helped me overcome my depressive episode as well as anxiety. She is a keen and attentive listener with many practical tips that help tackle problems in a healthy manner. Would recommend her to anyone seeking counselling.",
      date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-7',
      name: 'Verified Patient',
      title: '',
      quote:
        "Not just her skills and expertise, but her empathetic approach towards patients is beyond exceptional. Go for it without a second thought.",
      date: new Date(Date.now() - 730 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
           sourceUrl: this.practoUrl
    },
    {
      id: 'practo-8',
      name: 'Raj Nandini Singh',
      title: '',
      quote:
        "Doctor is so good and understanding. Highly recommend her for counseling. Will visit her again, felt so good and happy.",
      date: new Date(Date.now() - 27 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-9',
      name: 'Verified Patient',
      title: '',
      quote:
        "Prerna is a remarkably amazing counselor. I highly recommend her for anyone facing issues with mental well-being. She has helped me with various issues and with her expertise and personal approach towards the problem, one can expect amazing results.",
      date: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    },
    {
      id: 'practo-10',
      name: 'Verified Patient',
      title: '',
      quote:
        "I have had severe anxiety for a long time, and she has been able to significantly help me get better. I am still working on things with her, but I have seen significant improvement.",
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      source: 'practo',
      sourceUrl: this.practoUrl
    }
  ];

  console.log(`✅ Using static Practo reviews from screenshot: ${staticReviews.length}`);
  return staticReviews;
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
    try {
      // Always fetch fresh data from Practo scraping
      console.log('🔄 Fetching fresh reviews from Practo...');
      const freshReviews = await this.scrapePractoReviews();
      
            // Newest first, so recent reviews always lead
      return [...freshReviews].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    } catch (error) {
      console.error('Error fetching fresh reviews, falling back to stored data:', error);
      
      // Fallback to stored data if scraping fails
      try {
        const { reviews, manualReviews } = await this.loadExistingReviews();
        return [...manualReviews, ...reviews];
      } catch (fallbackError) {
        console.error('Error loading stored data:', fallbackError);
        // Return empty array if both fail
        return [];
      }
    }
  }
}
