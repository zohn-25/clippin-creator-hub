import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Eye, IndianRupee, Users } from 'lucide-react';

export const CreatorInsights = () => {
  // Mock data for creator insights
  const stats = [
    { label: 'Total Views', value: '2.4M', icon: Eye, change: '+12%' },
    { label: 'Clips Created', value: '47', icon: Users, change: '+8%' },
    { label: 'Total Earnings', value: '₹18,420', icon: IndianRupee, change: '+15%' },
    { label: 'Avg. Performance', value: '84%', icon: TrendingUp, change: '+6%' }
  ];

  const recentClips = [
    { title: 'JavaScript Tips', views: '45K', earnings: '₹720', status: 'Viral' },
    { title: 'React Hooks Guide', views: '32K', earnings: '₹512', status: 'Good' },
    { title: 'CSS Animation', views: '28K', earnings: '₹448', status: 'Good' },
    { title: 'Node.js Basics', views: '19K', earnings: '₹304', status: 'Average' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="glass-card border-white/10">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <Badge variant="secondary" className="text-xs bg-primary/20">
                    {stat.change}
                  </Badge>
                </div>
                <stat.icon className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Clips Performance */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-rajdhani">Recent Clips Performance</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {recentClips.map((clip, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex-1">
                  <p className="font-medium truncate">{clip.title}</p>
                  <p className="text-xs text-muted-foreground">{clip.views} views</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{clip.earnings}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      clip.status === 'Viral' ? 'bg-green-500/20 text-green-300' :
                      clip.status === 'Good' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}
                  >
                    {clip.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};