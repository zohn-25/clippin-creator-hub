import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { X, Upload, Image } from 'lucide-react';
import { toast } from './ui/use-toast';
import { RawContent } from '@/data/mockData';

interface ClipSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawContent: RawContent | null;
}

const dummyThumbnails = [
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400',
  'https://images.unsplash.com/photo-1571019613914-85f342c7c6ba?w=400',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
];

export const ClipSubmissionModal = ({ isOpen, onClose, rawContent }: ClipSubmissionModalProps) => {
  const [clipTitle, setClipTitle] = useState('');
  const [clipUrl, setClipUrl] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedThumbnail, setSelectedThumbnail] = useState(dummyThumbnails[0]);

  const handleSubmit = () => {
    if (!clipTitle || !clipUrl) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Simulate submission
    toast({
      title: "Clip Submitted Successfully!",
      description: "Your clip has been submitted for review. You'll be notified once it's approved.",
    });

    // Reset form
    setClipTitle('');
    setClipUrl('');
    setHashtags('');
    setSelectedThumbnail(dummyThumbnails[0]);
    onClose();
  };

  if (!rawContent) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-card">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron gradient-text">
            Submit Your Clip
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Original Content Info */}
          <div className="bg-gradient-card p-4 rounded-lg border border-white/10">
            <h3 className="font-rajdhani font-semibold text-lg mb-2">Original Content</h3>
            <p className="text-foreground/80">{rawContent.title}</p>
            <p className="text-sm text-muted-foreground">{rawContent.duration} • ₹{rawContent.payoutPer1K}/1K views</p>
          </div>

          {/* Clip Upload */}
          <div className="space-y-2">
            <Label htmlFor="clipUrl" className="text-sm font-rajdhani font-medium">
              Clip URL (YouTube/Drive Link) *
            </Label>
            <Input
              id="clipUrl"
              value={clipUrl}
              onChange={(e) => setClipUrl(e.target.value)}
              placeholder="https://youtube.com/watch?v=..."
              className="bg-background/50 border-white/20"
            />
          </div>

          {/* Clip Title */}
          <div className="space-y-2">
            <Label htmlFor="clipTitle" className="text-sm font-rajdhani font-medium">
              Engaging Title *
            </Label>
            <Input
              id="clipTitle"
              value={clipTitle}
              onChange={(e) => setClipTitle(e.target.value)}
              placeholder="Make it catchy and engaging..."
              className="bg-background/50 border-white/20"
            />
          </div>

          {/* Hashtags */}
          <div className="space-y-2">
            <Label htmlFor="hashtags" className="text-sm font-rajdhani font-medium">
              Hashtags
            </Label>
            <Input
              id="hashtags"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder="#trending #viral #education (separated by spaces)"
              className="bg-background/50 border-white/20"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {hashtags.split(' ').filter(tag => tag.startsWith('#')).map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Thumbnail Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-rajdhani font-medium">
              Select Thumbnail
            </Label>
            <div className="grid grid-cols-4 gap-3">
              {dummyThumbnails.map((thumbnail, index) => (
                <div
                  key={index}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedThumbnail === thumbnail 
                      ? 'border-primary shadow-lg' 
                      : 'border-white/20 hover:border-white/40'
                  }`}
                  onClick={() => setSelectedThumbnail(thumbnail)}
                >
                  <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-16 object-cover"
                  />
                  {selectedThumbnail === thumbnail && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Image className="h-4 w-4 text-primary" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-background/50 border-white/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 glow-button"
            >
              <Upload className="h-4 w-4 mr-2" />
              Submit Clip
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};