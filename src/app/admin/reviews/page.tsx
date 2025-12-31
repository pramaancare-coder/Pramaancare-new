"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useReviews } from '@/hooks/use-reviews';
import { toast } from '@/hooks/use-toast';

export default function ReviewsAdminPage() {
  const { reviews, loading, syncReviews, refreshReviews } = useReviews();
  const [syncing, setSyncing] = useState(false);

  const handleManualSync = async () => {
    setSyncing(true);
    try {
      const result = await syncReviews();
      if (result) {
        toast({
          title: "Sync Completed",
          description: `Found ${result.newReviews} new reviews. Total reviews: ${result.totalReviews}`,
          variant: "default"
        });
      } else {
        toast({
          title: "Sync Failed",
          description: "Failed to sync reviews from Practo",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Sync Error",
        description: "An error occurred while syncing reviews",
        variant: "destructive"
      });
    } finally {
      setSyncing(false);
    }
  };

  const practoReviews = reviews.filter(r => r.source === 'practo');
  const manualReviews = reviews.filter(r => r.source === 'manual');

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Review Management</h1>
        <p className="text-muted-foreground mt-2 text-sm lg:text-base xl:text-lg">
          Monitor and manage patient reviews from Practo and manual testimonials
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
            <p className="text-xs text-muted-foreground">
              All testimonials combined
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Practo Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{practoReviews.length}</div>
            <p className="text-xs text-muted-foreground">
              Automatically synced
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Manual Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{manualReviews.length}</div>
            <p className="text-xs text-muted-foreground">
              Manually added testimonials
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Actions</CardTitle>
          <CardDescription>
            Manage review synchronization and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              onClick={handleManualSync} 
              disabled={syncing || loading}
              variant="default"
            >
              {syncing ? 'Syncing...' : 'Sync Practo Reviews'}
            </Button>
            <Button 
              onClick={refreshReviews} 
              disabled={loading}
              variant="outline"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900">Automation Status</h4>
            <p className="text-sm text-blue-700 mt-1">
              Reviews are automatically synced daily at 9:00 AM IST from:{' '}
              <a 
                href="https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                Practo Profile
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>All Reviews</CardTitle>
          <CardDescription>
            View all testimonials and reviews
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No reviews found
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <div key={review.id || index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{review.name}</h4>
                      <p className="text-sm text-muted-foreground">{review.title}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={review.source === 'practo' ? 'default' : 'secondary'}>
                        {review.source === 'practo' ? 'Practo' : 'Manual'}
                      </Badge>
                      {review.rating && (
                        <Badge variant="outline">
                          ⭐ {review.rating}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <blockquote className="text-sm border-l-4 border-gray-300 pl-4 italic">
                    "{review.quote}"
                  </blockquote>
                  <div className="text-xs text-muted-foreground mt-2">
                    {new Date(review.date).toLocaleDateString()}
                    {review.sourceUrl && (
                      <span className="ml-2">
                        • <a href={review.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline">Source</a>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
