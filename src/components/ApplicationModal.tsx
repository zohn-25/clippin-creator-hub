import { useState } from 'react';
import { X, Link2, Video, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '@/hooks/use-toast';
import type { Campaign } from '@/data/mockData';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  campaign: Campaign;
}

export const ApplicationModal = ({ isOpen, onClose, onSubmit, campaign }: ApplicationModalProps) => {
  const [formData, setFormData] = useState({
    videoLink: '',
    pitch: '',
    contentType: '',
    agreed: false,
  });
  const { toast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.videoLink || !formData.pitch || !formData.contentType || !formData.agreed) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit your application.",
        variant: "destructive",
      });
      return;
    }

    onSubmit();
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the brand for review.",
    });
    
    // Reset form
    setFormData({
      videoLink: '',
      pitch: '',
      contentType: '',
      agreed: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="glass-card w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-orbitron font-bold gradient-text">
              Apply to Campaign
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-foreground/60 hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Campaign Info */}
          <div className="glass-card p-4 mb-6">
            <h3 className="font-orbitron font-semibold text-lg mb-2">{campaign.title}</h3>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{campaign.brand}</span>
              <span className="text-primary font-semibold">₹{campaign.payoutPer1K}/1K views</span>
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Video Link */}
            <div className="space-y-2">
              <Label htmlFor="videoLink" className="flex items-center">
                <Link2 className="h-4 w-4 mr-2" />
                Portfolio/Sample Video Link
              </Label>
              <Input
                id="videoLink"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.videoLink}
                onChange={(e) => setFormData(prev => ({ ...prev, videoLink: e.target.value }))}
                className="bg-input/50 border-white/20"
              />
              <p className="text-xs text-muted-foreground">
                Share a link to your best work that showcases your skills
              </p>
            </div>

            {/* Content Type */}
            <div className="space-y-2">
              <Label className="flex items-center">
                <Video className="h-4 w-4 mr-2" />
                Content Type
              </Label>
              <Select 
                value={formData.contentType} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, contentType: value }))}
              >
                <SelectTrigger className="bg-input/50 border-white/20">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent className="glass-card">
                  <SelectItem value="meme">Meme</SelectItem>
                  <SelectItem value="ugc">UGC (User Generated Content)</SelectItem>
                  <SelectItem value="edit">Video Edit/Montage</SelectItem>
                  <SelectItem value="reel">Instagram Reel</SelectItem>
                  <SelectItem value="youtube">YouTube Video</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pitch */}
            <div className="space-y-2">
              <Label htmlFor="pitch" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Your Pitch
              </Label>
              <Textarea
                id="pitch"
                placeholder="Tell the brand why you're perfect for this campaign. What's your creative approach? How will you deliver results?"
                value={formData.pitch}
                onChange={(e) => setFormData(prev => ({ ...prev, pitch: e.target.value }))}
                className="bg-input/50 border-white/20 min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">
                Max 500 characters. Be specific about your strategy and expected results.
              </p>
            </div>

            {/* Agreement Checkbox */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreement"
                checked={formData.agreed}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, agreed: !!checked }))}
              />
              <Label 
                htmlFor="agreement" 
                className="text-sm leading-relaxed cursor-pointer"
              >
                I agree to performance-based payout terms. I understand that my earnings will be based on actual engagement metrics (views, likes, shares) as measured by the platform's analytics.
              </Label>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 glow-button bg-gradient-primary"
              >
                Submit Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};