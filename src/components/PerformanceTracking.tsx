import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, IndianRupee, Clock, MessageSquare } from 'lucide-react';
import { mockClipSubmissions } from '@/data/mockData';

export const PerformanceTracking = () => {
  const totalEarnings = mockClipSubmissions.reduce((sum, clip) => sum + clip.earnings, 0);
  const totalViews = mockClipSubmissions.reduce((sum, clip) => sum + clip.views, 0);
  const approvedClips = mockClipSubmissions.filter(clip => clip.status === 'approved').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4">
        <Card className="glass-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <IndianRupee className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-bold gradient-text">
              ₹{totalEarnings.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <Eye className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-bold gradient-text">
              {totalViews.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>

        <Card className="glass-card border-white/10">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <p className="text-lg font-bold gradient-text">
              {approvedClips}
            </p>
            <p className="text-xs text-muted-foreground">Approved Clips</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Submissions */}
      <Card className="glass-card border-white/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-rajdhani">Recent Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {mockClipSubmissions.slice(0, 3).map((submission) => (
              <div
                key={submission.id}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={submission.thumbnailUrl}
                    alt={submission.clipTitle}
                    className="w-10 h-8 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{submission.clipTitle}</p>
                    <p className="text-xs text-muted-foreground">{submission.views.toLocaleString()} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">₹{submission.earnings}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs ${
                      submission.status === 'approved' ? 'bg-green-500/20 text-green-300' :
                      submission.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}
                  >
                    {submission.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {mockClipSubmissions.length === 0 && (
            <div className="text-center py-4">
              <p className="text-xs text-muted-foreground">No submissions yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};