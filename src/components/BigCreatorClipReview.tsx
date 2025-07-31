import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, X, MessageSquare, Clock, User, Play, Calendar } from 'lucide-react';
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
  const [pendingClips, setPendingClips] = useState<ClipSubmission[]>([]);
  const [approvedClips, setApprovedClips] = useState<ClipSubmission[]>([]);
  const [rejectedClips, setRejectedClips] = useState<ClipSubmission[]>([]);
  const [selectedClip, setSelectedClip] = useState<ClipSubmission | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [activeTab, setActiveTab] = useState('pending');

  useEffect(() => {
    // Load clips from localStorage
    const creatorClips = JSON.parse(localStorage.getItem('creatorClips') || '[]') as ClipSubmission[];
    
    setPendingClips(creatorClips.filter(clip => clip.status === 'Pending'));
    setApprovedClips(creatorClips.filter(clip => clip.status === 'Approved'));
    setRejectedClips(creatorClips.filter(clip => clip.status === 'Rejected'));
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
    setPendingClips(updatedClips.filter(clip => clip.status === 'Pending'));
    setApprovedClips(updatedClips.filter(clip => clip.status === 'Approved'));
    setRejectedClips(updatedClips.filter(clip => clip.status === 'Rejected'));
  };

  const handleApprove = (clip: ClipSubmission) => {
    updateClipStatus(clip.id, 'Approved');
    toast({
      title: "Clip approved successfully",
      description: `"${clip.title}" has been approved and moved to approved clips.`,
    });
    
    // Simulate earnings update
    toast({
      title: "Earnings Updated",
      description: "Your earnings have been updated with the new approved clip.",
    });
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
  };

  const openRejectModal = (clip: ClipSubmission) => {
    setSelectedClip(clip);
    setIsRejectModalOpen(true);
  };

  const ClipCard = ({ clip, showActions = false }: { clip: ClipSubmission; showActions?: boolean }) => (
    <Card className="glass-card overflow-hidden group hover:scale-[1.02] transition-all duration-300">
      <div className="relative">
        <img
          src={clip.thumbnailUrl}
          alt={clip.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-orbitron font-bold gradient-text mb-2">
          Clip Review
        </h2>
        <p className="text-muted-foreground">
          Review and manage clips submitted by editors
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 glass-card border-white/20">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending Review ({pendingClips.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="flex items-center gap-2">
            <Check className="h-4 w-4" />
            Approved ({approvedClips.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex items-center gap-2">
            <X className="h-4 w-4" />
            Rejected ({rejectedClips.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingClips.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No pending clips to review</p>
                <p className="text-sm text-muted-foreground">New clip submissions will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} showActions={true} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedClips.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <Check className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No approved clips yet</p>
                <p className="text-sm text-muted-foreground">Approved clips will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {approvedClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedClips.length === 0 ? (
            <Card className="glass-card">
              <CardContent className="text-center py-12">
                <X className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <p className="text-muted-foreground text-lg">No rejected clips</p>
                <p className="text-sm text-muted-foreground">Rejected clips will appear here</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rejectedClips.map((clip) => (
                <ClipCard key={clip.id} clip={clip} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

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