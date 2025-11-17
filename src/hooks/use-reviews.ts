import { useState, useEffect } from 'react';
import { Review } from '@/automation/review-scraper';

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.reviews);
        setError(null);
      } else {
        setError(data.error || 'Failed to fetch reviews');
      }
    } catch (err) {
      setError('Failed to fetch reviews');
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const syncReviews = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/reviews', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        // Refresh the reviews after sync
        await fetchReviews();
        return data;
      } else {
        setError(data.error || 'Failed to sync reviews');
        return null;
      }
    } catch (err) {
      setError('Failed to sync reviews');
      console.error('Error syncing reviews:', err);
      return null;
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return {
    reviews,
    loading,
    error,
    refreshReviews: fetchReviews,
    syncReviews
  };
}
