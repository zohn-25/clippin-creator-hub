import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { Check, X, MessageSquare, Clock, User, Play, Calendar, Eye, Video } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

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

export const BigCreatorClipReview = () => {
  const [allClips, setAllClips] = useState<ClipSubmission[]>([]);
  const [selectedClip, setSelectedClip] = useState<ClipSubmission | null>(null);
  const [previewClip, setPreviewClip] = useState<ClipSubmission | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Load clips from localStorage
    let creatorClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    
    // Add sample submissions if none exist
    if (creatorClips.length === 0) {
      const sampleClips: ClipSubmission[] = [
        {
          id: 'clip_001',
          title: 'React Hooks Explained in 60 Seconds',
          videoId: 'video_001',
          creatorName: 'TechGuru',
          editorName: 'Alex Sharma',
          clipUrl: 'https://example.com/clip1',
          hashtags: '#react #hooks #javascript #webdev #programming',
          thumbnailUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
          status: 'Pending',
          views: 0,
          earnings: 0,
          submittedDate: '2024-07-30',
          fileSize: '15.2 MB',
          duration: '1:02'
        },
        {
          id: 'clip_002',
          title: 'JavaScript Async/Await Best Practices',
          videoId: 'video_001',
          creatorName: 'TechGuru',
          editorName: 'Priya Patel',
          clipUrl: 'https://example.com/clip2',
          hashtags: '#javascript #async #await #promises #coding',
          thumbnailUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
          status: 'Pending',
          views: 0,
          earnings: 0,
          submittedDate: '2024-07-29',
          fileSize: '22.8 MB',
          duration: '2:15'
        },
        {
          id: 'clip_003',
          title: 'CSS Grid Layout Quick Tutorial',
          videoId: 'video_002',
          creatorName: 'TechGuru',
          editorName: 'Rahul Kumar',
          clipUrl: 'https://example.com/clip3',
          hashtags: '#css #grid #layout #webdesign #frontend',
          thumbnailUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
          status: 'Approved',
          views: 12450,
          earnings: 1245,
          submittedDate: '2024-07-28',
          fileSize: '18.5 MB',
          duration: '1:45'
        },
        {
          id: 'clip_004',
          title: 'TypeScript Interface vs Type',
          videoId: 'video_001',
          creatorName: 'TechGuru',
          editorName: 'Sneha Singh',
          clipUrl: 'https://example.com/clip4',
          hashtags: '#typescript #interface #type #programming',
          thumbnailUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
          status: 'Pending',
          views: 0,
          earnings: 0,
          submittedDate: '2024-07-30',
          fileSize: '12.3 MB',
          duration: '0:58'
        },
        {
          id: 'clip_005',
          title: 'Node.js Performance Tips',
          videoId: 'video_002',
          creatorName: 'TechGuru',
          editorName: 'Arjun Mehta',
          clipUrl: 'https://example.com/clip5',
          hashtags: '#nodejs #performance #backend #javascript',
          thumbnailUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=400&h=300&fit=crop',
          status: 'Rejected',
          views: 0,
          earnings: 0,
          submittedDate: '2024-07-27',
          feedback: 'Audio quality needs improvement. Please use better microphone setup.',
          fileSize: '25.7 MB',
          duration: '2:30'
        },
        {
          id: 'clip_006',
          title: 'React State Management Simplified',
          videoId: 'video_001',
          creatorName: 'TechGuru',
          editorName: 'Kavya Reddy',
          clipUrl: 'https://example.com/clip6',
          hashtags: '#react #state #management #redux #context',
          thumbnailUrl: 'https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=400&h=300&fit=crop',
          status: 'Approved',
          views: 8920,
          earnings: 892,
          submittedDate: '2024-07-26',
          fileSize: '19.1 MB',
          duration: '1:38'
        },
        {
          id: 'clip_007',
          title: 'MongoDB Aggregation Pipeline',
          videoId: 'video_002',
          creatorName: 'TechGuru',
          editorName: 'Dev Sharma',
          clipUrl: 'https://example.com/clip7',
          hashtags: '#mongodb #database #aggregation #nosql',
          thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
          status: 'Pending',
          views: 0,
          earnings: 0,
          submittedDate: '2024-07-31',
          fileSize: '31.2 MB',
          duration: '3:12'
        },
        {
          id: 'clip_008',
          title: 'API Design Best Practices',
          videoId: 'video_002',
          creatorName: 'TechGuru',
          editorName: 'Ravi Gupta',
          clipUrl: 'https://example.com/clip8',
          hashtags: '#api #rest #design #backend #bestpractices',
          thumbnailUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop',
          status: 'Approved',
          views: 15670,
          earnings: 1567,
          submittedDate: '2024-07-25',
          fileSize: '27.4 MB',
          duration: '2:45'
        }
      ];

      localStorage.setItem('creatorClips', JSON.stringify(sampleClips));
      localStorage.setItem('editorSubmissions', JSON.stringify(sampleClips));
      creatorClips = sampleClips;
    }
    
    setAllClips(creatorClips);
  }, []);

  const updateClipStatus = (clipId: string, newStatus: 'Approved' | 'Rejected', feedback?: string) => {
    const allClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    const updatedClips = allClips.map(clip => 
      clip.id === clipId 
        ? { 
            ...clip, 
            status: newStatus, 
            feedback, 
            views: newStatus === 'Approved' ? Math.floor(Math.random() * 50000) : 0, 
            earnings: newStatus === 'Approved' ? Math.floor(Math.random() * 2000) : 0 
          }
        : clip
    );
    
    localStorage.setItem('creatorClips', JSON.stringify(updatedClips));
    
    // Update editor submissions
    const editorSubmissions = JSON.parse(localStorage.getItem('editorSubmissions') || '[]') as ClipSubmission[];
    const updatedEditorSubmissions = editorSubmissions.map(clip => 
      clip.id === clipId 
        ? { 
            ...clip, 
            status: newStatus, 
            feedback, 
            views: newStatus === 'Approved' ? Math.floor(Math.random() * 50000) : 0, 
            earnings: newStatus === 'Approved' ? Math.floor(Math.random() * 2000) : 0 
          }
        : clip
    );
    localStorage.setItem('editorSubmissions', JSON.stringify(updatedEditorSubmissions));
    
    // Update local state
    const updatedAllClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    setAllClips(updatedAllClips);
  };

  const handleApprove = (clip: ClipSubmission) => {
    updateClipStatus(clip.id, 'Approved');
    toast({
      title: "Clip approved successfully",
      description: `"${clip.title}" has been approved and moved to approved clips.`,
    });
    
    // Show approval confirmation
    toast({
      title: "Clip Published Successfully",
      description: "The clip is now live and ready for viewers to watch.",
    });

    // Close preview modal if open
    setIsPreviewModalOpen(false);
    setPreviewClip(null);
  };

  const handleReject = () => {
    if (!selectedClip) return;
    
    updateClipStatus(selectedClip.id, 'Rejected', feedback);
    toast({
      title: "Clip rejected. Check feedback.",
      description: `"${selectedClip.title}" has been rejected and moved to rejected clips.`,
      variant: "destructive",
    });
    
    setIsRejectModalOpen(false);
    setSelectedClip(null);
    setFeedback('');
    
    // Close preview modal if open
    setIsPreviewModalOpen(false);
    setPreviewClip(null);
  };

  const openRejectModal = (clip: ClipSubmission) => {
    setSelectedClip(clip);
    setIsRejectModalOpen(true);
  };

  const openPreviewModal = (clip: ClipSubmission) => {
    setPreviewClip(clip);
    setIsPreviewModalOpen(true);
  };

  const ClipCard = ({ clip, showActions = false, showPreview = false }: { clip: ClipSubmission; showActions?: boolean; showPreview?: boolean }) => (
    <Card className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
          style={{ aspectRatio: '9/16' }}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="h-8 w-8 text-white" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {clip.duration}
        </div>
        <Badge 
          className="absolute top-2 left-2 bg-primary/90 text-primary-foreground"
          variant="secondary"
        >
          {clip.fileSize}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-rajdhani font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {clip.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <User className="h-3 w-3" />
            <span>Editor: {clip.editorName}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <Calendar className="h-3 w-3" />
            <span>Uploaded: {clip.submittedDate}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {clip.hashtags}
          </p>
        </div>

        {showPreview && (
          <div className="pt-3">
            <Button
              onClick={() => openPreviewModal(clip)}
              className="w-full glow-button bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Clip
            </Button>
          </div>
        )}

        {showActions && (
          <div className="flex gap-2 pt-3">
            <Button
              onClick={() => handleApprove(clip)}
              className="flex-1 glow-button bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1" />
              ✅ Approve
            </Button>
            <Button
              onClick={() => openRejectModal(clip)}
              variant="destructive"
              className="flex-1 hover:scale-105 transition-transform"
              size="sm"
            >
              <X className="h-4 w-4 mr-1" />
              ❌ Reject
            </Button>
          </div>
        )}

        {clip.status === 'Approved' && (
          <div className="flex justify-between text-xs pt-2 border-t border-white/10">
            <span className="text-primary">{clip.views.toLocaleString()} views</span>
            <span className="text-green-400 font-medium">₹{clip.earnings} earned</span>
          </div>
        )}

        {clip.status === 'Rejected' && clip.feedback && (
          <div className="pt-2 border-t border-white/10">
            <p className="text-xs text-red-400">Feedback: {clip.feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* All Clips Section */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Video className="h-6 w-6" />
            All Clip Submissions ({allClips.length})
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Review all clips submitted by editors. Use preview to watch before approving or rejecting.
          </p>
        </CardHeader>
        <CardContent>
          {allClips.length === 0 ? (
            <div className="text-center py-12">
              <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No clip submissions yet</p>
              <p className="text-sm text-muted-foreground">Editor submissions will appear here</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} showPreview={true} showActions={clip.status === 'Pending'} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview Modal */}
      <Dialog open={isPreviewModalOpen} onOpenChange={setIsPreviewModalOpen}>
        <DialogContent className="glass-card border-white/20 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="gradient-text flex items-center gap-2">
              <Play className="h-5 w-5" />
              Preview Clip
            </DialogTitle>
          </DialogHeader>
          {previewClip && (
            <div className="space-y-6">
              {/* Video Preview Area */}
              <div className="relative bg-black rounded-lg overflow-hidden">
                <img
                  src={previewClip.thumbnailUrl}
                  alt={previewClip.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-white mx-auto mb-2" />
                    <p className="text-white text-sm">Click to play preview</p>
                    <p className="text-white/70 text-xs">Duration: {previewClip.duration}</p>
                  </div>
                </div>
              </div>

              {/* Clip Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-rajdhani font-semibold text-lg">{previewClip.title}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" />
                      <span>Editor: <strong>{previewClip.editorName}</strong></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span>Submitted: {previewClip.submittedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Duration: {previewClip.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-rajdhani font-semibold">Clip Details</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>File Size:</strong> {previewClip.fileSize}</p>
                    <p><strong>Hashtags:</strong> {previewClip.hashtags}</p>
                    <p><strong>Status:</strong> 
                      <Badge className="ml-2" variant={
                        previewClip.status === 'Approved' ? 'default' : 
                        previewClip.status === 'Pending' ? 'secondary' : 
                        'destructive'
                      }>
                        {previewClip.status}
                      </Badge>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              {previewClip.status === 'Pending' && (
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <Button
                    onClick={() => handleApprove(previewClip)}
                    className="flex-1 glow-button bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    ✅ Approve Clip
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedClip(previewClip);
                      setIsRejectModalOpen(true);
                    }}
                    variant="destructive"
                    className="flex-1"
                  >
                    <X className="h-4 w-4 mr-2" />
                    ❌ Reject Clip
                  </Button>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setIsPreviewModalOpen(false)}
                  variant="outline"
                  className="border-white/20"
                >
                  Close Preview
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="glass-card border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="gradient-text flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Provide Rejection Feedback
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Rejection Reason (Optional)</Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Let the editor know why this clip was rejected..."
                className="bg-background/50 border-white/20 min-h-[100px]"
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleReject}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Clip
              </Button>
              <Button
                onClick={() => setIsRejectModalOpen(false)}
                variant="outline"
                className="flex-1 border-white/20"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};