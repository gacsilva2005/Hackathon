export interface GuideItem {
  id: string;
  category: string;
  categoryVariant: 'purple' | 'amber' | 'green' | 'blue';
  readingTime: string;
  title: string;
  description: string;
  linkText: string;
}

export interface AISummaryBullet {
  id: string;
  text: string;
  boldKeywords: string[];
}
