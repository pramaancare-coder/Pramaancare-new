import { NextRequest, NextResponse } from 'next/server';
import { ReviewScraper } from '@/automation/review-scraper';

const scraper = new ReviewScraper();

export async function GET() {
  try {
    const reviews = await scraper.getAllReviews();
    return NextResponse.json({ 
      success: true, 
      reviews,
      count: reviews.length 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews' 
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const result = await scraper.updateReviews();
    return NextResponse.json({ 
      success: true, 
      message: `Review sync completed. Found ${result.newReviews} new reviews.`,
      newReviews: result.newReviews,
      totalReviews: result.totalReviews
    });
  } catch (error) {
    console.error('Error syncing reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sync reviews' 
      },
      { status: 500 }
    );
  }
}
