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
  status: 'Pending' | 'Approved' | 'Rejected';
  views: number;
  earnings: number;
  submittedDate: string;
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

  const [submissions, setSubmissions] = useState<ClipSubmission[]>([
    {
      id: '1',
      title: 'React Hooks Explained in 60 Seconds',
      videoId: '1',
      status: 'Approved',
      views: 15000,
      earnings: 1200,
      submittedDate: '2024-07-29'
    },
    {
      id: '2',
      title: 'JavaScript Tips Every Developer Should Know',
      videoId: '2',
      status: 'Pending',
      views: 0,
      earnings: 0,
      submittedDate: '2024-07-30'
    }
  ]);

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
      status: 'Pending',
      views: 0,
      earnings: 0,
      submittedDate: new Date().toISOString().split('T')[0]
    };

    setSubmissions([newSubmission, ...submissions]);
    
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Videos */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Scissors className="h-6 w-6" />
                  Available Videos to Clip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <div key={submission.id} className="p-3 rounded-lg border border-white/10 bg-background/20">
                    <h4 className="font-medium text-sm line-clamp-2 mb-2">
                      {submission.title}
                    </h4>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <span>{submission.submittedDate}</span>
                      <Badge 
                        variant={submission.status === 'Approved' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {submission.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>{submission.views.toLocaleString()} views</span>
                      <span className="text-primary font-medium">₹{submission.earnings}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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