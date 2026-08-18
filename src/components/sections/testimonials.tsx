"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { useReviews } from "@/hooks/use-reviews";
import { ExternalLink } from "lucide-react";

// No static fallback - only use real API data

// Utility function to truncate text
const truncateText = (text: string, maxLength: number = 280): { truncated: string; isTruncated: boolean } => {
  if (text.length <= maxLength) {
    return { truncated: text, isTruncated: false };
  }
  
  // Find the last complete sentence within the limit
  const sentences = text.split('. ');
  let result = '';
  
  for (const sentence of sentences) {
    if ((result + sentence + '. ').length > maxLength) {
      break;
    }
    result += sentence + '. ';
  }
  
  // If no complete sentence fits, just truncate at word boundary
  if (result.length === 0) {
    const words = text.substring(0, maxLength).split(' ');
    words.pop(); // Remove last partial word
    result = words.join(' ');
  }
  
  return { 
    truncated: result.trim().replace(/\.$/, '') + '...', 
    isTruncated: true 
  };
};

const ReviewCard = ({
  name,
  title,
  quote,
  source,
  sourceUrl,
  date
}: {
  name: string;
  title: string;
  quote: string;
  source?: string;
  sourceUrl?: string;
  date?: string;
}) => {
  const { truncated, isTruncated } = truncateText(quote);
  
  // Format date to "time ago" format
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
    }
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? '1 month ago' : `${months} months ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? '1 year ago' : `${years} years ago`;
  };
  
  return (
    <figure
      className={cn(
        "relative w-96 min-h-[240px] rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] flex flex-col",
      )}
    >
      <div className="flex flex-row items-center gap-2 mb-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <div className="flex items-center gap-2">
            {date && (
              <p className="text-xs text-gray-500">{formatTimeAgo(date)}</p>
            )}
            {source === 'practo' && (
              <p className="text-xs text-blue-600 font-medium">Via Practo</p>
            )}
          </div>
        </div>
      </div>
      <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
        "{truncated}"
      </blockquote>
      {isTruncated && sourceUrl && (
        <div className="mt-3 pt-2 border-t border-gray-200/50">
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium"
          >
            View full review
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}
    </figure>
  );
};

export function Testimonials() {
  const { reviews, loading, error } = useReviews();
  
  // Only use real API data - no fallback
  const testimonials = reviews.map(review => ({
    quote: review.quote,
    name: review.name,
    title: review.title,
    source: review.source,
    sourceUrl: review.sourceUrl,
    date: review.date
  }));

  // Show empty state if no reviews
  if (testimonials.length === 0 && !loading) {
    return (
      <motion.section
        id="testimonials"
        className="w-full mt-10 md:mt-[100px]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="w-[96%] mx-auto px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="font-headline text-foreground font-bold">
              What Our Clients Say
            </h2>
            <p className="max-w-2xl text-muted-foreground text-sm lg:text-base xl:text-lg">
              No reviews available at the moment.
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  if (loading) {
    return (
      <motion.section
        id="testimonials"
        className="w-full mt-10 md:mt-[100px]"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="w-full px-[14px] md:w-[96%] md:mx-auto md:px-6">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="font-headline text-foreground font-bold">
              What Our Clients Say
            </h2>
            <p className="max-w-2xl text-muted-foreground text-sm lg:text-base xl:text-lg">
              Loading testimonials...
            </p>
          </div>
        </div>
      </motion.section>
    );
  }

  if (error) {
    console.error('Testimonials Error:', error);
  }

  return (
    <motion.section
      id="testimonials"
      className="w-full mt-10 md:mt-[100px]"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="w-[96%] mx-auto px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="font-headline text-foreground font-bold">
            What Our Clients Say
          </h2>
          <p className="max-w-2xl text-muted-foreground text-sm lg:text-base xl:text-lg">
            Real stories from people who have found support and growth with us.
          </p>
        </div>
      </div>
       <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
        <Marquee repeat={4} pauseOnHover className="[--duration:40s]">
          {firstRow.map((review, index) => (
            <ReviewCard key={`first-${index}`} {...review} />
          ))}
        </Marquee>
        <Marquee repeat={4} reverse pauseOnHover className="[--duration:40s]">
          {secondRow.map((review, index) => (
            <ReviewCard key={`second-${index}`} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background"></div>
      </div>
    </motion.section>
  );
}
