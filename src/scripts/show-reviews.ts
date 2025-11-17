import { ReviewScraper } from '../automation/review-scraper';

async function showCurrentReviews() {
  console.log('📋 Current Reviews in System:\n');
  
  const scraper = new ReviewScraper();
  const reviews = await scraper.getAllReviews();
  
  if (reviews.length === 0) {
    console.log('No reviews found.');
    return;
  }
  
  reviews.forEach((review, index) => {
    console.log(`${index + 1}. [${review.source.toUpperCase()}] ${review.name}`);
    console.log(`   Title: ${review.title}`);
    console.log(`   Review: "${review.quote}"`);
    if (review.rating) console.log(`   Rating: ${review.rating} stars`);
    console.log(`   Date: ${new Date(review.date).toLocaleDateString()}`);
    if (review.sourceUrl) console.log(`   Source: ${review.sourceUrl}`);
    console.log('');
  });
  
  console.log(`\nTotal Reviews: ${reviews.length}`);
  console.log(`Practo Reviews: ${reviews.filter(r => r.source === 'practo').length}`);
  console.log(`Manual Reviews: ${reviews.filter(r => r.source === 'manual').length}`);
}

showCurrentReviews().catch(console.error);