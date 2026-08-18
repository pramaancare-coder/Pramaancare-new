import { ReviewScraper } from '../automation/review-scraper';

async function testReviewScraper() {
  console.log('🚀 Testing Review Scraper...');
  
  const scraper = new ReviewScraper();
  
  try {
    // Test getting all reviews (should create initial data file)
    console.log('📋 Loading existing reviews...');
    const existingReviews = await scraper.getAllReviews();
    console.log(`Found ${existingReviews.length} existing reviews`);
    
    // Test scraping Practo (this might not find reviews immediately due to anti-scraping measures)
    console.log('🔍 Testing Practo scraping...');
    const scrapedReviews = await scraper.scrapePractoReviews();
    console.log(`Scraped ${scrapedReviews.length} reviews from Practo`);
    
    // Test update process
    console.log('🔄 Testing review update...');
    const updateResult = await scraper.updateReviews();
    console.log(`Update completed: ${updateResult.newReviews} new reviews, ${updateResult.totalReviews} total`);
    
    console.log('✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
testReviewScraper();
