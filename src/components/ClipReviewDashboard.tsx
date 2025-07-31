import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Check, X, MessageSquare, Clock, FileText, User } from 'lucide-react';
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

export const ClipReviewDashboard = () => {
  const [pendingClips, setPendingClips] = useState<ClipSubmission[]>([]);
  const [publishedClips, setPublishedClips] = useState<ClipSubmission[]>([]);
  const [rejectedClips, setRejectedClips] = useState<ClipSubmission[]>([]);
  const [selectedClip, setSelectedClip] = useState<ClipSubmission | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    // Load clips from localStorage
    const creatorClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    
    setPendingClips(creatorClips.filter(clip => clip.status === 'Pending'));
    setPublishedClips(creatorClips.filter(clip => clip.status === 'Approved'));
    setRejectedClips(creatorClips.filter(clip => clip.status === 'Rejected'));
  }, []);

  const updateClipStatus = (clipId: string, newStatus: 'Approved' | 'Rejected', feedback?: string) => {
    const allClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    const updatedClips = allClips.map(clip => 
      clip.id === clipId 
        ? { ...clip, status: newStatus, feedback, views: newStatus === 'Approved' ? Math.floor(Math.random() * 50000) : 0, earnings: newStatus === 'Approved' ? Math.floor(Math.random() * 2000) : 0 }
        : clip
    );
    
    localStorage.setItem('creatorClips', JSON.stringify(updatedClips));
    
    // Update editor submissions
    const editorSubmissions = JSON.parse(localStorage.getItem('editorSubmissions') || '[]') as ClipSubmission[];
    const updatedEditorSubmissions = editorSubmissions.map(clip => 
      clip.id === clipId 
        ? { ...clip, status: newStatus, feedback, views: newStatus === 'Approved' ? Math.floor(Math.random() * 50000) : 0, earnings: newStatus === 'Approved' ? Math.floor(Math.random() * 2000) : 0 }
        : clip
    );
    localStorage.setItem('editorSubmissions', JSON.stringify(updatedEditorSubmissions));
    
    // Update local state
    setPendingClips(updatedClips.filter(clip => clip.status === 'Pending'));
    setPublishedClips(updatedClips.filter(clip => clip.status === 'Approved'));
    setRejectedClips(updatedClips.filter(clip => clip.status === 'Rejected'));
  };

  const handleApprove = (clip: ClipSubmission) => {
    updateClipStatus(clip.id, 'Approved');
    toast({
      title: "Clip Approved!",
      description: `"${clip.title}" has been approved and published.`,
    });
  };

  const handleReject = () => {
    if (!selectedClip) return;
    
    updateClipStatus(selectedClip.id, 'Rejected', feedback);
    toast({
      title: "Clip Rejected",
      description: `"${selectedClip.title}" has been rejected with feedback.`,
      variant: "destructive",
    });
    
    setIsRejectModalOpen(false);
    setSelectedClip(null);
    setFeedback('');
  };

  const openRejectModal = (clip: ClipSubmission) => {
    setSelectedClip(clip);
    setIsRejectModalOpen(true);
  };

  const ClipCard = ({ clip, showActions = false }: { clip: ClipSubmission; showActions?: boolean }) => (
    <Card key={clip.id} className="glass-card overflow-hidden hover:scale-105 transition-all duration-300">
      <div className="relative">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {clip.duration}
        </div>
        <Badge 
          className="absolute top-2 left-2 bg-primary/90"
          variant="secondary"
        >
          {clip.fileSize}
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-rajdhani font-semibold text-lg line-clamp-2 mb-2">
            {clip.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <User className="h-3 w-3" />
            <span>by {clip.editorName}</span>
          </div>
          <p className="text-xs text-muted-foreground">
            {clip.hashtags}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{clip.submittedDate}</span>
          <Badge variant={
            clip.status === 'Approved' ? 'default' : 
            clip.status === 'Pending' ? 'secondary' : 
            'destructive'
          }>
            {clip.status}
          </Badge>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => handleApprove(clip)}
              className="flex-1 glow-button bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <Check className="h-4 w-4 mr-1" />
              Approve
            </Button>
            <Button
              onClick={() => openRejectModal(clip)}
              variant="destructive"
              className="flex-1"
              size="sm"
            >
              <X className="h-4 w-4 mr-1" />
              Reject
            </Button>
          </div>
        )}

        {clip.status === 'Approved' && (
          <div className="flex justify-between text-xs pt-2 border-t border-white/10">
            <span>{clip.views.toLocaleString()} views</span>
            <span className="text-primary font-medium">₹{clip.earnings} earned</span>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-8">
      {/* Pending Clips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Clock className="h-6 w-6" />
            Pending Clips ({pendingClips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingClips.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No pending clips to review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} showActions={true} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Published Clips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Check className="h-6 w-6" />
            Published Clips ({publishedClips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {publishedClips.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No published clips yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rejected Clips */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <X className="h-6 w-6" />
            Rejected Clips ({rejectedClips.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {rejectedClips.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No rejected clips.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reject Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="glass-card border-white/20 max-w-md">
          <DialogHeader>
            <DialogTitle className="gradient-text flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Provide Feedback
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