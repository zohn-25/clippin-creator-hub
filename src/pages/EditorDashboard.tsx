import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Scissors, Clock, Eye, TrendingUp, Upload, Image } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface AvailableVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  payoutPer1K: number;
  creator: string;
}

interface ClipSubmission {
  id: string;
  title: string;
  videoId: string;
  creatorName: string;
  editorName: string;
  clipUrl: string;
  hashtags: string;
  thumbnailUrl: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  views: number;
  earnings: number;
  submittedDate: string;
  feedback?: string;
  fileSize: string;
  duration: string;
}

export const EditorDashboard = () => {
  const [selectedVideo, setSelectedVideo] = useState<AvailableVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clipTitle, setClipTitle] = useState('');
  const [clipUrl, setClipUrl] = useState('');
  const [hashtags, setHashtags] = useState('');
  
  const [availableVideos] = useState<AvailableVideo[]>([
    {
      id: '1',
      title: 'Complete React Tutorial - 4 Hours',
      description: 'Full tutorial covering React hooks, state management, and best practices',
      duration: '4:12:30',
      payoutPer1K: 80,
      creator: 'CodeMaster'
    },
    {
      id: '2',
      title: 'JavaScript Masterclass - 6 Hours',
      description: 'Deep dive into modern JavaScript features and advanced concepts',
      duration: '6:45:20',
      payoutPer1K: 100,
      creator: 'DevGuru'
    },
    {
      id: '3',
      title: 'Web Design Fundamentals',
      description: 'Learn the basics of web design, CSS, and user experience',
      duration: '2:30:15',
      payoutPer1K: 60,
      creator: 'DesignPro'
    }
  ]);

  const [submissions, setSubmissions] = useState<ClipSubmission[]>(() => {
    const stored = localStorage.getItem('editorSubmissions');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        title: 'React Hooks Explained in 60 Seconds',
        videoId: '1',
        creatorName: 'CodeMaster',
        editorName: 'VideoEditor Pro',
        clipUrl: 'https://youtube.com/watch?v=example1',
        hashtags: '#react #hooks #webdev',
        thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop',
        status: 'Approved',
        views: 15000,
        earnings: 1200,
        submittedDate: '2024-07-29',
        fileSize: '25.4 MB',
        duration: '0:58'
      },
      {
        id: '2',
        title: 'JavaScript Tips Every Developer Should Know',
        videoId: '2',
        creatorName: 'DevGuru',
        editorName: 'VideoEditor Pro',
        clipUrl: 'https://youtube.com/watch?v=example2',
        hashtags: '#javascript #tips #coding',
        thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&h=200&fit=crop',
        status: 'Pending',
        views: 0,
        earnings: 0,
        submittedDate: '2024-07-30',
        fileSize: '18.2 MB',
        duration: '1:15'
      }
    ];
  });

  const handleClipThis = (video: AvailableVideo) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleSubmitClip = () => {
    if (!clipTitle || !clipUrl || !hashtags) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newSubmission: ClipSubmission = {
      id: Date.now().toString(),
      title: clipTitle,
      videoId: selectedVideo!.id,
      creatorName: selectedVideo!.creator,
      editorName: 'VideoEditor Pro', // This would come from user session
      clipUrl,
      hashtags,
      thumbnailUrl: `https://images.unsplash.com/photo-${Date.now() % 5 === 0 ? '1461749280684-dccba630e2f6' : '1498050108023-c5249f4df085'}?w=300&h=200&fit=crop`,
      status: 'Pending',
      views: 0,
      earnings: 0,
      submittedDate: new Date().toISOString().split('T')[0],
      fileSize: `${Math.floor(Math.random() * 30 + 10)}.${Math.floor(Math.random() * 9)} MB`,
      duration: `${Math.floor(Math.random() * 2)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`
    };

    const updatedSubmissions = [newSubmission, ...submissions];
    setSubmissions(updatedSubmissions);
    localStorage.setItem('editorSubmissions', JSON.stringify(updatedSubmissions));
    
    // Add to creator's pending clips
    const creatorClips = JSON.parse(localStorage.getItem('creatorClips') || '[]');
    creatorClips.push(newSubmission);
    localStorage.setItem('creatorClips', JSON.stringify(creatorClips));
    
    toast({
      title: "Clip Submitted Successfully!",
      description: "Your clip has been submitted for review.",
    });

    // Reset form and close modal
    setClipTitle('');
    setClipUrl('');
    setHashtags('');
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const totalEarnings = submissions.reduce((sum, submission) => sum + submission.earnings, 0);
  const approvedClips = submissions.filter(s => s.status === 'Approved').length;

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Editor Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Browse raw content, create clips, and earn money based on performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">₹{totalEarnings}</div>
              <div className="text-sm text-muted-foreground">Total Earnings</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Scissors className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{submissions.length}</div>
              <div className="text-sm text-muted-foreground">Clips Submitted</div>
            </CardContent>
          </Card>
          <Card className="glass-card">
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-primary">{approvedClips}</div>
              <div className="text-sm text-muted-foreground">Approved Clips</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Available Videos */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Scissors className="h-6 w-6" />
                  Available Videos to Clip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableVideos.map((video) => (
                    <Card key={video.id} className="border border-white/10 bg-background/30">
                      <CardContent className="p-4 space-y-3">
                        <div>
                          <h3 className="font-rajdhani font-semibold text-lg line-clamp-2 mb-2">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {video.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </div>
                          <span className="text-muted-foreground">by {video.creator}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            ₹{video.payoutPer1K}/1K views
                          </Badge>
                          <Button
                            onClick={() => handleClipThis(video)}
                            size="sm"
                            className="glow-button"
                          >
                            <Scissors className="h-4 w-4 mr-1" />
                            Clip This
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* My Submissions */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <TrendingUp className="h-5 w-5" />
                  My Submissions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {submissions.map((submission) => (
                  <div key={submission.id} className="p-4 rounded-lg border border-white/10 bg-background/20 hover:bg-background/30 transition-all">
                    <div className="flex items-start gap-3">
                      <img 
                        src={submission.thumbnailUrl} 
                        alt="Clip thumbnail"
                        className="w-16 h-12 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {submission.title}
                        </h4>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                          <span>{submission.submittedDate}</span>
                          <Badge 
                            variant={
                              submission.status === 'Approved' ? 'default' : 
                              submission.status === 'Pending' ? 'secondary' : 
                              'destructive'
                            }
                            className="text-xs"
                          >
                            {submission.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>{submission.views.toLocaleString()} views</span>
                          <span className="text-primary font-medium">₹{submission.earnings}</span>
                        </div>
                        {submission.feedback && submission.status === 'Rejected' && (
                          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
                            <strong>Feedback:</strong> {submission.feedback}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Earnings Tracking Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-orbitron font-bold gradient-text mb-6">
            Earnings Dashboard
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Earnings Overview Cards */}
            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Earnings</p>
                    <p className="text-2xl font-bold text-primary">₹{totalEarnings}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500">+12.5%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <p className="text-2xl font-bold text-primary">₹{Math.floor(totalEarnings * 0.3)}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <span className="text-green-500">+8.2%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Payout</p>
                    <p className="text-2xl font-bold text-primary">₹{Math.floor(totalEarnings * 0.2)}</p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Next payout: 1st Aug
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Earnings Table */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <TrendingUp className="h-5 w-5" />
                Clip Performance & Earnings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Clip Title</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Views</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Rate</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Earnings</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submissions.map((submission) => {
                      const associatedVideo = availableVideos.find(v => v.id === submission.videoId);
                      const rate = associatedVideo?.payoutPer1K || 0;
                      return (
                        <tr key={submission.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-2">
                            <div className="max-w-48">
                              <p className="text-sm font-medium line-clamp-2">{submission.title}</p>
                            </div>
                          </td>
                          <td className="text-right py-3 px-2 text-sm">{submission.views.toLocaleString()}</td>
                          <td className="text-right py-3 px-2 text-sm text-muted-foreground">₹{rate}/1K</td>
                          <td className="text-right py-3 px-2 text-sm font-medium text-primary">₹{submission.earnings}</td>
                          <td className="text-center py-3 px-2">
                            <Badge 
                              variant={submission.status === 'Approved' ? 'default' : submission.status === 'Pending' ? 'secondary' : 'destructive'}
                              className="text-xs"
                            >
                              {submission.status}
                            </Badge>
                          </td>
                          <td className="text-right py-3 px-2 text-sm text-muted-foreground">{submission.submittedDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {submissions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No clips submitted yet. Start clipping to see your earnings!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Clip Submission Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="glass-card border-white/20 max-w-md">
            <DialogHeader>
              <DialogTitle className="gradient-text">Submit Your Clip</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clipTitle">Clip Title *</Label>
                <Input
                  id="clipTitle"
                  value={clipTitle}
                  onChange={(e) => setClipTitle(e.target.value)}
                  placeholder="React Hooks in 60 Seconds"
                  className="bg-background/50 border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="clipUrl">Edited Video URL *</Label>
                <Input
                  id="clipUrl"
                  value={clipUrl}
                  onChange={(e) => setClipUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  className="bg-background/50 border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hashtags">Hashtags *</Label>
                <Input
                  id="hashtags"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  placeholder="#react #javascript #webdev"
                  className="bg-background/50 border-white/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label>Thumbnail</Label>
                <Button 
                  variant="outline" 
                  className="w-full border-white/20 bg-background/50"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Upload Thumbnail (Simulated)
                </Button>
              </div>
              
              <Button
                onClick={handleSubmitClip}
                className="w-full glow-button"
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Clip
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};