import { ReviewScraper } from '../automation/review-scraper';

// Create a more targeted test for Practo reviews
async function testPractoSpecific() {
  console.log('🎯 Testing Practo-specific scraper...');
  
  const scraper = new ReviewScraper();
  
  try {
    console.log('🔍 Analyzing Practo page structure...');
    
    // Test the scraper to see what it finds
    const reviews = await scraper.scrapePractoReviews();
    
    console.log(`Found ${reviews.length} reviews:`);
    reviews.forEach((review, index) => {
      console.log(`\n${index + 1}. ${review.name} (${review.title})`);
      console.log(`   "${review.quote}"`);
      if (review.rating) console.log(`   Rating: ${review.rating}`);
    });
    
    // Also test the update functionality
    console.log('\n📝 Testing review update...');
    const result = await scraper.updateReviews();
    console.log(`Update result: ${result.newReviews} new, ${result.totalReviews} total`);
    
    // Show all reviews
    console.log('\n📋 All reviews in system:');
    const allReviews = await scraper.getAllReviews();
    allReviews.forEach((review, index) => {
      console.log(`${index + 1}. [${review.source}] ${review.name}: "${review.quote.substring(0, 100)}..."`);
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testPractoSpecific();