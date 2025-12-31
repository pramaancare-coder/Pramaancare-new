"use client";

import React from "react";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { sectionVariants } from "@/lib/animations";
import { useReviews } from "@/hooks/use-reviews";
import { ExternalLink } from "lucide-react";

// Fallback testimonials in case API fails
const fallbackTestimonials = [
  {
    quote: "Working with Pramaan Care was a transformative experience. I felt truly heard and supported, and gained tools that have improved my life immeasurably.",
    name: "A. Sharma",
    title: "Individual Client",
  },
  {
    quote: "The corporate wellness workshop was fantastic. Our team is more open and supportive, and we've seen a real shift in our company culture.",
    name: "R. Gupta",
    title: "HR Manager",
  },
  {
    quote: "I was hesitant about therapy, but the team at Pramaan Care made me feel comfortable from day one. It's one of the best investments I've ever made in myself.",
    name: "S. Khan",
    title: "Individual Client",
  },
   {
    quote: "The assessments provided much-needed clarity on my career path. I feel more confident and aligned with my professional goals now.",
    name: "P. Mehta",
    title: "Assessment Client",
  },
  {
    quote: "Family therapy helped us communicate better and understand each other on a deeper level. Our home is a much more peaceful place now.",
    name: "The Verma Family",
    title: "Family Therapy Clients",
  },
  {
    quote: "The leadership training on mental wellbeing was insightful and practical. I feel better equipped to support my team's mental health.",
    name: "J. Singh",
    title: "Corporate Client",
  },
];

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
  sourceUrl
}: {
  name: string;
  title: string;
  quote: string;
  source?: string;
  sourceUrl?: string;
}) => {
  const { truncated, isTruncated } = truncateText(quote);
  
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
          {source === 'practo' && (
            <p className="text-xs text-blue-600 font-medium">Via Practo</p>
          )}
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
  
  // Use dynamic reviews if available, otherwise fallback to static ones
  const testimonials = reviews.length > 0 ? reviews.map(review => ({
    quote: review.quote,
    name: review.name,
    title: review.title,
    source: review.source,
    sourceUrl: review.sourceUrl
  })) : fallbackTestimonials;

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
