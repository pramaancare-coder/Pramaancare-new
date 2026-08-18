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
