import { useState } from 'react';
import { TrendingUp, Clock, CheckCircle, XCircle, IndianRupee } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { mockCampaigns, mockWalletData } from '@/data/mockData';
import type { Campaign } from '@/data/mockData';

export const CreatorDashboard = () => {
  // Mock applied campaigns with statuses
  const [appliedCampaigns] = useState<Campaign[]>([
    { ...mockCampaigns[0], isApplied: true, status: 'approved' },
    { ...mockCampaigns[1], isApplied: true, status: 'pending' },
    { ...mockCampaigns[2], isApplied: true, status: 'rejected' },
    { ...mockCampaigns[3], isApplied: true, status: 'pending' },
  ]);

  const stats = [
    {
      title: 'Total Earnings',
      value: `₹${mockWalletData.creator.earnings.toLocaleString()}`,
      icon: <IndianRupee className="h-6 w-6" />,
      color: 'text-success',
    },
    {
      title: 'Active Campaigns',
      value: appliedCampaigns.filter(c => c.status === 'approved').length,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-primary',
    },
    {
      title: 'Pending Applications',
      value: appliedCampaigns.filter(c => c.status === 'pending').length,
      icon: <Clock className="h-6 w-6" />,
      color: 'text-yellow-400',
    },
    {
      title: 'Completion Rate',
      value: '92%',
      icon: <CheckCircle className="h-6 w-6" />,
      color: 'text-success',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                <p className={`text-2xl font-orbitron font-bold ${stat.color}`}>
                  {stat.value}
                </p>
              </div>
              <div className={stat.color}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Applied Campaigns */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-orbitron font-bold mb-6">My Applications</h2>
        
        <div className="space-y-4">
          {appliedCampaigns.map((campaign) => (
            <div key={campaign.id} className="glass-card p-4 hover:scale-[1.02] transition-transform">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-orbitron font-semibold">{campaign.title}</h3>
                    {getStatusIcon(campaign.status!)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Brand: </span>
                      <span className="font-medium">{campaign.brand}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Payout: </span>
                      <span className="font-medium text-primary">₹{campaign.payoutPer1K}/1K</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Deadline: </span>
                      <span className="font-medium">
                        {new Date(campaign.deadline).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  {getStatusBadge(campaign.status!)}
                </div>
              </div>

              {campaign.status === 'approved' && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex gap-2">
                    <Button size="sm" className="bg-gradient-primary">
                      View Brief
                    </Button>
                    <Button size="sm" variant="outline">
                      Upload Content
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Earnings */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-orbitron font-bold mb-6">Recent Earnings</h2>
        
        <div className="space-y-3">
          {mockWalletData.creator.recentPayouts.map((payout) => (
            <div key={payout.id} className="flex items-center justify-between p-3 glass-card">
              <div>
                <p className="font-medium">{payout.campaign}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(payout.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-success">+₹{payout.amount.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Performance bonus</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};