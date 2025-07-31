export interface Campaign {
  id: string;
  title: string;
  description: string;
  payoutPer1K: number;
  deadline: string;
  category: string;
  brand: string;
  status?: 'pending' | 'approved' | 'rejected';
  isApplied?: boolean;
}

export interface WalletData {
  creator: {
    earnings: number;
    withdrawable: number;
    pending: number;
    recentPayouts: Array<{
      id: string;
      amount: number;
      date: string;
      campaign: string;
    }>;
  };
  brand: {
    availableBalance: number;
    spent: number;
    reserved: number;
    transactions: Array<{
      id: string;
      amount: number;
      date: string;
      type: 'added' | 'spent' | 'withdrawn';
      description: string;
    }>;
  };
}

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Tech Product Launch Memes',
    description: 'Create viral memes for our new smartphone launch. Show creativity and humor!',
    payoutPer1K: 120,
    deadline: '2024-08-15',
    category: 'Meme',
    brand: 'TechCorp',
  },
  {
    id: '2',
    title: 'Fashion UGC Content',
    description: 'Showcase our summer collection in authentic lifestyle content.',
    payoutPer1K: 200,
    deadline: '2024-08-20',
    category: 'UGC',
    brand: 'StyleBrand',
  },
  {
    id: '3',
    title: 'Gaming Montage Edits',
    description: 'Epic gaming moments compilation with our brand integration.',
    payoutPer1K: 150,
    deadline: '2024-08-25',
    category: 'Edit',
    brand: 'GameCorp',
  },
  {
    id: '4',
    title: 'Food Recipe Reels',
    description: 'Creative cooking videos featuring our kitchen appliances.',
    payoutPer1K: 180,
    deadline: '2024-08-30',
    category: 'UGC',
    brand: 'KitchenPlus',
  },
  {
    id: '5',
    title: 'Crypto Education Memes',
    description: 'Funny and educational memes about cryptocurrency trading.',
    payoutPer1K: 300,
    deadline: '2024-09-05',
    category: 'Meme',
    brand: 'CryptoTech',
  },
  {
    id: '6',
    title: 'Fitness Transformation Videos',
    description: 'Motivational fitness content with our supplement brand.',
    payoutPer1K: 250,
    deadline: '2024-09-10',
    category: 'UGC',
    brand: 'FitLife',
  },
];

export interface RawContent {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  creator: string;
  payoutPer1K: number;
  uploadDate: string;
  thumbnailUrl: string;
  contentUrl: string;
}

export interface ClipSubmission {
  id: string;
  rawContentId: string;
  rawContentTitle: string;
  clipTitle: string;
  hashtags: string[];
  thumbnailUrl: string;
  clipUrl: string;
  views: number;
  earnings: number;
  status: 'pending' | 'approved' | 'rejected';
  feedback?: string;
  submittedDate: string;
}

export const mockRawContent: RawContent[] = [
  {
    id: '1',
    title: 'Complete JavaScript Tutorial - 3 Hours',
    description: 'Comprehensive JavaScript course covering all fundamentals',
    duration: '3:15:42',
    category: 'Education',
    creator: 'TechGuru',
    payoutPer1K: 80,
    uploadDate: '2024-07-30',
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    contentUrl: 'https://example.com/js-tutorial',
  },
  {
    id: '2',
    title: 'Fitness Transformation Journey - 6 Months',
    description: 'Complete fitness transformation with daily workouts',
    duration: '2:45:30',
    category: 'Fitness',
    creator: 'FitnessPro',
    payoutPer1K: 120,
    uploadDate: '2024-07-29',
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613914-85f342c7c6ba?w=400',
    contentUrl: 'https://example.com/fitness-journey',
  },
  {
    id: '3',
    title: 'Gaming Stream Highlights - Epic Moments',
    description: 'Best gaming moments from last week streams',
    duration: '4:20:15',
    category: 'Gaming',
    creator: 'GameMaster',
    payoutPer1K: 100,
    uploadDate: '2024-07-28',
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    contentUrl: 'https://example.com/gaming-highlights',
  },
  {
    id: '4',
    title: 'Cooking Masterclass - Italian Cuisine',
    description: 'Learn to cook authentic Italian dishes',
    duration: '1:55:20',
    category: 'Food',
    creator: 'ChefMario',
    payoutPer1K: 90,
    uploadDate: '2024-07-27',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    contentUrl: 'https://example.com/cooking-class',
  },
];

export const mockClipSubmissions: ClipSubmission[] = [
  {
    id: '1',
    rawContentId: '1',
    rawContentTitle: 'Complete JavaScript Tutorial',
    clipTitle: 'JavaScript Variables Explained in 60 Seconds',
    hashtags: ['#javascript', '#coding', '#tutorial', '#webdev'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
    clipUrl: 'https://example.com/js-variables-clip',
    views: 15420,
    earnings: 1234,
    status: 'approved',
    feedback: 'Great editing and engaging content!',
    submittedDate: '2024-07-28',
  },
  {
    id: '2',
    rawContentId: '2',
    rawContentTitle: 'Fitness Transformation Journey',
    clipTitle: 'Transform Your Body in 30 Days - Quick Tips',
    hashtags: ['#fitness', '#transformation', '#workout', '#motivation'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1571019613914-85f342c7c6ba?w=400',
    clipUrl: 'https://example.com/fitness-tips-clip',
    views: 8350,
    earnings: 1002,
    status: 'approved',
    submittedDate: '2024-07-26',
  },
  {
    id: '3',
    rawContentId: '3',
    rawContentTitle: 'Gaming Stream Highlights',
    clipTitle: 'Epic Gaming Fails Compilation',
    hashtags: ['#gaming', '#fails', '#funny', '#highlights'],
    thumbnailUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
    clipUrl: 'https://example.com/gaming-fails-clip',
    views: 5200,
    earnings: 520,
    status: 'pending',
    submittedDate: '2024-07-25',
  },
];

export const mockWalletData: WalletData = {
  creator: {
    earnings: 45650,
    withdrawable: 38200,
    pending: 7450,
    recentPayouts: [
      {
        id: '1',
        amount: 2400,
        date: '2024-07-28',
        campaign: 'Tech Product Launch',
      },
      {
        id: '2',
        amount: 1800,
        date: '2024-07-25',
        campaign: 'Fashion UGC Content',
      },
      {
        id: '3',
        amount: 3200,
        date: '2024-07-22',
        campaign: 'Gaming Montage',
      },
    ],
  },
  brand: {
    availableBalance: 125000,
    spent: 89500,
    reserved: 25000,
    transactions: [
      {
        id: '1',
        amount: 50000,
        date: '2024-07-30',
        type: 'added',
        description: 'Wallet top-up',
      },
      {
        id: '2',
        amount: 12000,
        date: '2024-07-28',
        type: 'spent',
        description: 'Campaign: Tech Product Launch',
      },
      {
        id: '3',
        amount: 8500,
        date: '2024-07-25',
        type: 'spent',
        description: 'Campaign: Fashion UGC',
      },
    ],
  },
};