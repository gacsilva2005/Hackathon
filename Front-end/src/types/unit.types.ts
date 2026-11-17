export interface UnitDetails {
  name: string;
  typeTag: string;
  address: string;
  distance: string;
  schedule: string;
  phone: string;
  regionTag: string;
  statusTag: string;
}

export interface CareFlowStep {
  stepNumber: number;
  title: string;
  badge?: {
    text: string;
    variant: 'green' | 'blue' | 'gray';
  };
  description: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: 'pill' | 'brain' | 'users' | 'badge';
  accentColor: string;
}

export interface CommunityReviewMetric {
  label: string;
  score: number;
}

export interface CommunityReviewData {
  averageRating: number;
  anonymousLabel: string;
  metrics: CommunityReviewMetric[];
  testimonial: {
    authorVerifiedText: string;
    rating: number;
    quote: string;
  };
}
