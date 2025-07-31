import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Eye, DollarSign, Clock, MessageSquare } from 'lucide-react';
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
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-orbitron font-bold gradient-text">
          My Clipping Earnings
        </h2>
        <p className="text-muted-foreground">
          Track your clip performance and earnings
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-orbitron font-bold gradient-text">
              ₹{totalEarnings.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Earnings</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Eye className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-orbitron font-bold gradient-text">
              {totalViews.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <p className="text-2xl font-orbitron font-bold gradient-text">
              {approvedClips}
            </p>
            <p className="text-sm text-muted-foreground">Approved Clips</p>
          </CardContent>
        </Card>
      </div>

      {/* Submissions Table */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-xl font-orbitron gradient-text">
            My Submissions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockClipSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-gradient-card p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  {/* Thumbnail and Info */}
                  <div className="flex gap-3 flex-1">
                    <img
                      src={submission.thumbnailUrl}
                      alt={submission.clipTitle}
                      className="w-16 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-rajdhani font-semibold text-sm line-clamp-1">
                        {submission.clipTitle}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        From: {submission.rawContentTitle}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {submission.hashtags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-4 text-sm">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        {submission.views.toLocaleString()}
                      </div>
                      <p className="text-xs text-muted-foreground">Views</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-primary font-medium">
                        <DollarSign className="h-3 w-3" />
                        ₹{submission.earnings}
                      </div>
                      <p className="text-xs text-muted-foreground">Earned</p>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                    {submission.feedback && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/50 border-white/20"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Feedback
                      </Button>
                    )}
                  </div>
                </div>

                {/* Feedback */}
                {submission.feedback && (
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-muted-foreground">
                      <strong>Feedback:</strong> {submission.feedback}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {mockClipSubmissions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No submissions yet. Start clipping content to see your performance here!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};