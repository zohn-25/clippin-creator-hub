import { useState } from 'react';
import { TrendingUp, Users, IndianRupee, BarChart3, Eye, ThumbsUp, Share } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { mockCampaigns, mockWalletData } from '@/data/mockData';

export const BrandDashboard = () => {
  // Mock brand campaigns
  const [brandCampaigns] = useState([
    {
      ...mockCampaigns[0],
      applicants: 24,
      approved: 5,
      totalViews: 125000,
      engagement: 8.5,
    },
    {
      ...mockCampaigns[1],
      applicants: 18,
      approved: 3,
      totalViews: 89000,
      engagement: 6.2,
    },
    {
      ...mockCampaigns[4],
      applicants: 31,
      approved: 7,
      totalViews: 203000,
      engagement: 12.1,
    },
  ]);

  // Mock submissions
  const [submissions] = useState([
    {
      id: '1',
      creatorName: 'Alex Kumar',
      campaignTitle: 'Tech Product Launch Memes',
      contentLink: 'https://youtube.com/watch?v=demo1',
      views: 45000,
      engagement: 9.2,
      status: 'pending',
      submittedAt: '2024-07-30',
    },
    {
      id: '2',
      creatorName: 'Priya Sharma',
      campaignTitle: 'Fashion UGC Content',
      contentLink: 'https://instagram.com/reel/demo2',
      views: 32000,
      engagement: 7.8,
      status: 'approved',
      submittedAt: '2024-07-29',
    },
    {
      id: '3',
      creatorName: 'Rohan Patel',
      campaignTitle: 'Crypto Education Memes',
      contentLink: 'https://youtube.com/shorts/demo3',
      views: 78000,
      engagement: 15.3,
      status: 'approved',
      submittedAt: '2024-07-28',
    },
  ]);

  const stats = [
    {
      title: 'Active Campaigns',
      value: brandCampaigns.length,
      icon: <BarChart3 className="h-6 w-6" />,
      color: 'text-primary',
    },
    {
      title: 'Total Applicants',
      value: brandCampaigns.reduce((sum, c) => sum + c.applicants, 0),
      icon: <Users className="h-6 w-6" />,
      color: 'text-success',
    },
    {
      title: 'Content Created',
      value: brandCampaigns.reduce((sum, c) => sum + c.approved, 0),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'text-yellow-400',
    },
    {
      title: 'Total Reach',
      value: `${(brandCampaigns.reduce((sum, c) => sum + c.totalViews, 0) / 1000).toFixed(0)}K`,
      icon: <Eye className="h-6 w-6" />,
      color: 'text-purple-400',
    },
  ];

  const handleApprove = (submissionId: string) => {
    // Mock approval logic
    console.log('Approved submission:', submissionId);
  };

  const handleReject = (submissionId: string) => {
    // Mock rejection logic
    console.log('Rejected submission:', submissionId);
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

      {/* My Campaigns */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-orbitron font-bold">My Campaigns</h2>
          <Button className="bg-gradient-primary">Create New Campaign</Button>
        </div>
        
        <div className="space-y-4">
          {brandCampaigns.map((campaign, index) => (
            <div key={index} className="glass-card p-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-orbitron font-semibold text-lg mb-2">{campaign.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{campaign.description}</p>
                </div>
                <Badge className="bg-success text-success-foreground">Active</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Applicants</p>
                  <p className="font-bold text-primary">{campaign.applicants}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Approved</p>
                  <p className="font-bold text-success">{campaign.approved}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Total Views</p>
                  <p className="font-bold text-purple-400">{campaign.totalViews.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Engagement</p>
                  <p className="font-bold text-yellow-400">{campaign.engagement}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Budget Used</p>
                  <p className="font-bold text-destructive">₹{(campaign.approved * campaign.payoutPer1K * 50).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10 flex gap-2">
                <Button size="sm" variant="outline">View Analytics</Button>
                <Button size="sm" variant="outline">Manage Applicants</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Submissions */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-orbitron font-bold mb-6">Recent Submissions</h2>
        
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div key={submission.id} className="glass-card p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-orbitron font-semibold">{submission.creatorName}</h3>
                    <Badge 
                      variant={submission.status === 'approved' ? 'default' : 'secondary'}
                      className={submission.status === 'approved' ? 'bg-success text-success-foreground' : ''}
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{submission.campaignTitle}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-2 text-purple-400" />
                      <span>{submission.views.toLocaleString()} views</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-2 text-yellow-400" />
                      <span>{submission.engagement}% engagement</span>
                    </div>
                    <div className="flex items-center">
                      <Share className="h-4 w-4 mr-2 text-primary" />
                      <span>Submitted {new Date(submission.submittedAt).toLocaleDateString('en-IN')}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => window.open(submission.contentLink, '_blank')}
                    >
                      View Content
                    </Button>
                    
                    {submission.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          className="bg-success text-success-foreground"
                          onClick={() => handleApprove(submission.id)}
                        >
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject(submission.id)}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Budget Overview */}
      <div className="glass-card p-6">
        <h2 className="text-2xl font-orbitron font-bold mb-6">Budget Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Available Balance</p>
            <p className="text-3xl font-orbitron font-bold text-success">
              ₹{mockWalletData.brand.availableBalance.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Total Spent</p>
            <p className="text-3xl font-orbitron font-bold text-destructive">
              ₹{mockWalletData.brand.spent.toLocaleString()}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">Reserved</p>
            <p className="text-3xl font-orbitron font-bold text-yellow-400">
              ₹{mockWalletData.brand.reserved.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};