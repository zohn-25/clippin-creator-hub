import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Upload, Video, TrendingUp, Clock, Users } from 'lucide-react';
import { BigCreatorClipReview } from '@/components/BigCreatorClipReview';
import { toast } from '@/components/ui/use-toast';

interface UploadedVideo {
  id: string;
  title: string;
  description: string;
  payoutPer1K: number;
  uploadDate: string;
  clipsSubmitted: number;
  totalViews: number;
}

export const CreatorDashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [payoutPer1K, setPayoutPer1K] = useState('');
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([
    {
      id: '1',
      title: 'Complete React Tutorial - 4 Hours',
      description: 'Full tutorial covering React hooks, state management, and best practices',
      payoutPer1K: 80,
      uploadDate: '2024-07-28',
      clipsSubmitted: 12,
      totalViews: 45000
    },
    {
      id: '2',
      title: 'JavaScript Masterclass - 6 Hours',
      description: 'Deep dive into modern JavaScript features and advanced concepts',
      payoutPer1K: 100,
      uploadDate: '2024-07-25',
      clipsSubmitted: 8,
      totalViews: 32000
    }
  ]);

  const handleSubmit = () => {
    if (!title || !description || !payoutPer1K) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newVideo: UploadedVideo = {
      id: Date.now().toString(),
      title,
      description,
      payoutPer1K: parseInt(payoutPer1K),
      uploadDate: new Date().toISOString().split('T')[0],
      clipsSubmitted: 0,
      totalViews: 0
    };

    setUploadedVideos([newVideo, ...uploadedVideos]);
    
    toast({
      title: "Video Posted Successfully!",
      description: "Your raw content is now available for editors to clip.",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPayoutPer1K('');
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Big Creator Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Upload your raw content and let skilled editors create viral clips
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <Upload className="h-6 w-6" />
                  Upload Raw Video Content
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-rajdhani font-medium">
                    Video Title *
                  </Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Complete JavaScript Tutorial - 3 Hours"
                    className="bg-background/50 border-white/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-rajdhani font-medium">
                    Description *
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your content and what editors can create from it..."
                    className="bg-background/50 border-white/20 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="payout" className="text-sm font-rajdhani font-medium">
                      Payout per 1K views (₹) *
                    </Label>
                    <Input
                      id="payout"
                      type="number"
                      value={payoutPer1K}
                      onChange={(e) => setPayoutPer1K(e.target.value)}
                      placeholder="80"
                      className="bg-background/50 border-white/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-rajdhani font-medium">
                      Upload Video File
                    </Label>
                    <Button
                      variant="outline"
                      className="w-full h-10 border-white/20 bg-background/50"
                    >
                      <Video className="h-4 w-4 mr-2" />
                      Choose File (Simulated)
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full glow-button"
                  size="lg"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Post for Clipping
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Stats */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 gradient-text">
                  <TrendingUp className="h-5 w-5" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{uploadedVideos.length}</div>
                  <div className="text-sm text-muted-foreground">Videos Uploaded</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {uploadedVideos.reduce((sum, video) => sum + video.clipsSubmitted, 0)}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Clips Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {uploadedVideos.reduce((sum, video) => sum + video.totalViews, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Views</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Clip Review Section */}
        <div className="mt-12">
          <BigCreatorClipReview />
        </div>

        {/* Uploaded Videos */}
        <div className="mt-12">
          <h2 className="text-2xl font-orbitron font-bold gradient-text mb-6">
            Your Uploaded Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uploadedVideos.map((video) => (
              <Card key={video.id} className="glass-card hover:scale-105 transition-transform">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-rajdhani font-semibold text-lg line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {video.uploadDate}
                    </div>
                    <Badge variant="secondary">
                      ₹{video.payoutPer1K}/1K
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{video.clipsSubmitted}</div>
                      <div className="text-xs text-muted-foreground">Clips</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">{video.totalViews.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Views</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};