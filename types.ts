
export interface Activity {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  // Added location property to fix type error in components/EventsSection.tsx
  location?: string;
}

export interface Achievement {
  id: string;
  label: string;
  value: number;
}