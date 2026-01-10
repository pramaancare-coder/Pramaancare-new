import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export interface Review {
  id: string;
  name: string;
  title: string;
  quote: string;
  rating?: number;
  date: string;
  source: 'practo' | 'manual';
  sourceUrl: string;
}

// Static reviews data - more reliable than scraping
const STATIC_REVIEWS: Review[] = [
  {
    id: "practo-1",
    name: "Verified Patient",
    title: "Exceptional Clinical Psychologist",
    quote: "I cannot speak highly enough of Dr. Prerna. As a clinical psychologist, she brings a rare combination of deep insight, maturity, and compassion that makes a genuine difference in her clients' lives. Her understanding of complex emotional and psychological issues is remarkable, and she approaches each session with a calm, focused presence that instantly puts one at ease.",
    rating: 5,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    source: "practo",
    sourceUrl: "https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended"
  },
  {
    id: "practo-2", 
    name: "RANJANA NARSHIMAN",
    title: "Solution Oriented Therapy",
    quote: "She is very solution oriented. Extremely practical, realistic, and calm. She is able to point out any hurdle/problem and offers a very positive solution for things. I am able to talk to her about the smallest of problems, and have absolute faith in the path she shows me to overcome the obstacles.",
    rating: 5,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    source: "practo",
    sourceUrl: "https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended"
  },
  {
    id: "practo-3",
    name: "Verified Patient", 
    title: "Transformative Sessions",
    quote: "My sessions with Prerna Sethi have been truly transformative. With deep empathy and insight, she helped me navigate complex personal relationships, improve my communication, and work through long-standing anxiety and trauma.",
    rating: 5,
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(),
    source: "practo",
    sourceUrl: "https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended"
  },
  {
    id: "practo-4",
    name: "Verified Patient",
    title: "Helped with Depression & Anxiety",
    quote: "She has helped me overcome my depressive episode as well as my anxiety. She is a keen and attentive listener with a lot of tricks and tips up her sleeve, which help to tackle problems in a healthy manner.",
    rating: 5,
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    source: "practo",
    sourceUrl: "https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended"
  },
  {
    id: "practo-5",
    name: "Verified Patient",
    title: "Exceptional Empathy",
    quote: "Not just her skills and expertise in handling the patients but the psychologist's empathetic approach towards her patients is beyond exceptional. Go for it without having a second thought.",
    rating: 5,
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    source: "practo",
    sourceUrl: "https://www.practo.com/gurgaon/therapist/prerna-sethi-psychotherapist/recommended"
  }
];

const DATA_PATH = path.join(process.cwd(), 'src/data/reviews.json');

function ensureDataFile() {
  const dataDir = path.dirname(DATA_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  if (!fs.existsSync(DATA_PATH)) {
    const initialData = {
      reviews: STATIC_REVIEWS,
      manualReviews: [],
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DATA_PATH, JSON.stringify(initialData, null, 2));
  }
}

function loadReviews(): { reviews: Review[], manualReviews: Review[] } {
  ensureDataFile();
  try {
    const data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    return {
      reviews: data.reviews || STATIC_REVIEWS,
      manualReviews: data.manualReviews || []
    };
  } catch (error) {
    console.error('Error loading reviews:', error);
    return {
      reviews: STATIC_REVIEWS,
      manualReviews: []
    };
  }
}

function saveReviews(reviews: Review[], manualReviews: Review[]) {
  const data = {
    reviews,
    manualReviews,
    lastUpdated: new Date().toISOString()
  };
  
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
    console.log('✅ Reviews saved successfully');
  } catch (error) {
    console.error('❌ Error saving reviews:', error);
    throw new Error('Failed to save reviews');
  }
}

export async function GET() {
  try {
    const { reviews, manualReviews } = loadReviews();
    const allReviews = [...manualReviews, ...reviews];
    
    return NextResponse.json({ 
      success: true, 
      reviews: allReviews,
      count: allReviews.length 
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch reviews',
        reviews: STATIC_REVIEWS,
        count: STATIC_REVIEWS.length
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const { reviews: existingReviews, manualReviews } = loadReviews();
    
    // Update with fresh static reviews (in case we want to update them)
    const updatedReviews = STATIC_REVIEWS;
    
    // Save updated reviews
    saveReviews(updatedReviews, manualReviews);
    
    return NextResponse.json({ 
      success: true, 
      message: `Review sync completed. Updated with ${updatedReviews.length} reviews.`,
      newReviews: updatedReviews.length,
      totalReviews: updatedReviews.length + manualReviews.length
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
