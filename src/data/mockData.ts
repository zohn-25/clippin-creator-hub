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