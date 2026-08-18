import { ReviewScheduler } from './review-scheduler';

// Initialize the review automation when the server starts
let scheduler: ReviewScheduler | null = null;

export function initializeReviewAutomation() {
  if (!scheduler) {
    scheduler = new ReviewScheduler();
    scheduler.start();
    console.log('✅ Review automation initialized');
  }
}

export function getScheduler() {
  return scheduler;
}

// Auto-initialize when this module is imported
if (process.env.NODE_ENV !== 'test') {
  initializeReviewAutomation();
}
