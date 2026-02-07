
import { Activity, Achievement } from './types';

export const TROOP_INFO = {
  name: "Troop 468",
  location: "Fremont, CA",
  address: "Weibel Elementary School or Old Mission Park, Fremont",
  meetingTime: "Every other Thursday evening and Saturday afternoon",
  mission: "Troop 468 is a youth-led organization where scouts learn leadership by doing. From planning weekly meetings to leading high-adventure treks, our scouts are prepared for life.",
  motto: "Be Prepared.",
  philosophy: "Scout-Led Troop",
};

export const ACTIVITIES: Activity[] = [
  {
    id: '1',
    title: 'High Sierra Backpacking',
    description: 'Our annual 50-mile trek through the wilderness. Scouts plan the route, manage supplies, and lead the group through challenging terrain.',
    image: 'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&q=80&w=1200',
    date: 'Summer 2024',
    location: 'Yosemite National Park'
  },
  {
    id: '2',
    title: 'Camp Cherry Valley',
    description: 'A coastal adventure at Catalina Island. Scouts participate in snorkeling, kayaking, and earn various maritime merit badges.',
    image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?auto=format&fit=crop&q=80&w=1200',
    date: 'June 2024',
    location: 'Catalina Island, CA'
  },
  {
    id: '3',
    title: 'District Camporee',
    description: 'Testing our scouting skills against other troops in the district. Focus on fire building, knots, and pioneering.',
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=1200',
    date: 'Spring 2024',
    location: 'Boulder Creek, CA'
  },
  {
    id: '4',
    title: 'Winter Klondike Derby',
    description: 'Cold-weather survival training. Scouts build sleds and compete in team challenges across snowy landscapes.',
    image: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?auto=format&fit=crop&q=80&w=1200',
    date: 'February 2024',
    location: 'Lake Tahoe, CA'
  }
];

export const UPCOMING_EVENTS = [
  {
    id: 'u1',
    title: 'New Scout Open House',
    type: 'Join',
    date: 'Sept 19, 2024',
    status: 'Public Welcome'
  },
  {
    id: 'u2',
    title: 'Fall Court of Honor',
    type: 'Ceremony',
    date: 'Oct 10, 2024',
    status: 'Troop & Family'
  },
  {
    id: 'u3',
    title: 'Rock Climbing Trip',
    type: 'Adventure',
    date: 'Nov 16, 2024',
    status: 'Open for Registration'
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: '1', label: 'Eagle Scouts', value: 85 },
  { id: '2', label: 'Years of Service', value: 55 },
  { id: '3', label: 'Merit Badges', value: 1250 },
  { id: '4', label: 'Active Families', value: 40 }
];

export const TEN_ESSENTIALS = [
  { name: 'Pocketknife', desc: 'Versatile tool for many camp tasks.' },
  { name: 'First Aid Kit', desc: 'Treating small scratches and blisters.' },
  { name: 'Extra Clothing', desc: 'Layering for changing weather.' },
  { name: 'Rain Gear', desc: 'Stay dry during unexpected showers.' },
  { name: 'Flashlight', desc: 'Navigating camp after sunset.' },
  { name: 'Trail Food', desc: 'Quick energy boost for hikes.' },
  { name: 'Water', desc: 'Hydration is key to safety.' },
  { name: 'Fire Starter', desc: 'Crucial for warmth and cooking.' },
  { name: 'Sun Protection', desc: 'Sunscreen and hat are mandatory.' },
  { name: 'Map & Compass', desc: 'Traditional navigation skills.' }
];

export const PERSONAL_GEAR = [
  { name: 'Backpack', desc: 'Properly fitted for the scout\'s size.', category: 'Sleep & Pack' },
  { name: 'Sleeping Bag', desc: 'Rated for at least 20°F for multi-season use.', category: 'Sleep & Pack' },
  { name: 'Sleeping Pad', desc: 'Insulation from the cold ground.', category: 'Sleep & Pack' },
  { name: 'Hiking Boots', desc: 'Sturdy, broken-in footwear with ankle support.', category: 'Clothing' },
  { name: 'Wool Socks', desc: 'Avoid cotton; wool keeps feet dry and warm.', category: 'Clothing' },
  { name: 'Eating Kit', desc: 'Reusable plate, bowl, cup, and spoon.', category: 'Personal' },
  { name: 'Personal Hygiene', desc: 'Toothbrush, small soap, and towel.', category: 'Personal' },
];

export const UNIFORM_ITEMS = [
  { name: 'Scout Shirt', desc: 'Tan BSA shirt with appropriate patches.', type: 'Class A' },
  { name: 'Scout Pants', desc: 'Green convertible switchback pants.', type: 'Class A' },
  { name: 'Scout Belt', desc: 'Official green web belt.', type: 'Class A' },
  { name: 'Troop Neckerchief', desc: 'Our unique Troop 468 design.', type: 'Class A' },
  { name: 'Troop T-Shirt', desc: 'Casual shirt for activities and camp.', type: 'Class B' },
];
