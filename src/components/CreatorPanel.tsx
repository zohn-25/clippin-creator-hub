import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Upload, Plus } from 'lucide-react';
import { toast } from './ui/use-toast';

export const CreatorPanel = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [payoutPer1K, setPayoutPer1K] = useState('');

  const handleSubmit = () => {
    if (!title || !description || !category || !contentUrl || !payoutPer1K) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Content Uploaded Successfully!",
      description: "Your raw content is now available for editors in the Clip Hub.",
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('');
    setContentUrl('');
    setPayoutPer1K('');
  };

  return (
    <div className="space-y-6">
        {/* Content URL */}
        <div className="space-y-2">
          <Label htmlFor="contentUrl" className="text-sm font-rajdhani font-medium">
            Content URL (YouTube/Drive Link) *
          </Label>
          <Input
            id="contentUrl"
            value={contentUrl}
            onChange={(e) => setContentUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=... or Google Drive link"
            className="bg-background/50 border-white/20"
          />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm font-rajdhani font-medium">
            Content Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Complete JavaScript Tutorial - 3 Hours"
            className="bg-background/50 border-white/20"
          />
        </div>

        {/* Description */}
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

        {/* Category and Payout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-rajdhani font-medium">
              Category *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-background/50 border-white/20">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Fitness">Fitness</SelectItem>
                <SelectItem value="Food">Food</SelectItem>
                <SelectItem value="Tech">Tech</SelectItem>
                <SelectItem value="Entertainment">Entertainment</SelectItem>
              </SelectContent>
            </Select>
          </div>

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
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="w-full glow-button"
          size="lg"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload to Clip Hub
        </Button>
    </div>
  );
};