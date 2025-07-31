import { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, IndianRupee, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CampaignCard } from '@/components/CampaignCard';
import { mockCampaigns } from '@/data/mockData';
import type { Campaign } from '@/data/mockData';

export const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'trending' | 'high-payout' | 'new'>('all');

  const filters = [
    { id: 'all', label: 'All Campaigns', icon: null },
    { id: 'trending', label: 'Trending', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'high-payout', label: 'High Payout', icon: <IndianRupee className="h-4 w-4" /> },
    { id: 'new', label: 'New', icon: <Clock className="h-4 w-4" /> },
  ];

  const handleApply = (campaignId: string) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === campaignId 
          ? { ...campaign, isApplied: true } 
          : campaign
      )
    );
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (activeFilter) {
      case 'trending':
        return campaign.payoutPer1K > 150; // Mock trending logic
      case 'high-payout':
        return campaign.payoutPer1K > 200;
      case 'new':
        return new Date(campaign.deadline) > new Date('2024-08-20'); // Mock new logic
      default:
        return true;
    }
  });

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Available Campaigns
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover performance-based opportunities from top brands across India
          </p>
        </div>

        {/* Categories Section */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-orbitron font-semibold mb-4 gradient-text">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['Tech', 'Fitness', 'Fashion', 'Food', 'Gaming', 'Travel', 'Beauty', 'Education', 'Music', 'Lifestyle', 'Finance', 'Entertainment'].map((category) => (
              <div 
                key={category} 
                className={`glass-card-light p-4 text-center hover:bg-white/10 transition-all cursor-pointer group ${
                  searchTerm.toLowerCase() === category.toLowerCase() ? 'bg-primary/20 border-primary/50' : ''
                }`}
                onClick={() => setSearchTerm(category)}
              >
                <div className="text-lg font-rajdhani font-bold mb-2 group-hover:scale-110 transition-transform">
                  {category}
                </div>
                {campaigns.filter(c => c.category.toLowerCase() === category.toLowerCase()).length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {campaigns.filter(c => c.category.toLowerCase() === category.toLowerCase()).length} campaigns
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search campaigns, brands, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input/50 border-white/20"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id as any)}
                  className={activeFilter === filter.id 
                    ? "bg-gradient-primary" 
                    : "bg-white/5 border-white/20 hover:border-primary/50"
                  }
                >
                  {filter.icon}
                  <span className={filter.icon ? "ml-2" : ""}>{filter.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                onApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-card p-12 max-w-md mx-auto">
              <h3 className="text-xl font-orbitron font-semibold mb-4">No campaigns found</h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to see more results.
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('all');
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
              {campaigns.length}
            </div>
            <p className="text-muted-foreground">Active Campaigns</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
              ₹{Math.max(...campaigns.map(c => c.payoutPer1K))}
            </div>
            <p className="text-muted-foreground">Highest Payout/1K</p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-orbitron font-bold gradient-text mb-2">
              {new Set(campaigns.map(c => c.category)).size}
            </div>
            <p className="text-muted-foreground">Content Categories</p>
          </div>
        </div>
      </div>
    </div>
  );
};