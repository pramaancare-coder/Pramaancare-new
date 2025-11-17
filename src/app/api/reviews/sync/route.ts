import { NextRequest, NextResponse } from 'next/server';
import { getScheduler } from '@/automation';

export async function POST() {
  try {
    const scheduler = getScheduler();
    
    if (!scheduler) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Review scheduler not initialized' 
        },
        { status: 500 }
      );
    }

    const result = await scheduler.runManually();
    
    return NextResponse.json({ 
      success: true, 
      message: `Manual sync completed successfully!`,
      newReviews: result.newReviews,
      totalReviews: result.totalReviews
    });
  } catch (error) {
    console.error('Error running manual sync:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to run manual sync' 
      },
      { status: 500 }
    );
  }
}
