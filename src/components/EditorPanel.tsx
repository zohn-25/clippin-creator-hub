import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Clock, Eye, Scissors, Search, Filter } from 'lucide-react';
import { mockRawContent, RawContent } from '@/data/mockData';
import { ClipSubmissionModal } from './ClipSubmissionModal';

export const EditorPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedContent, setSelectedContent] = useState<RawContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredContent = mockRawContent.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || content.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleClipThis = (content: RawContent) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const categories = [...new Set(mockRawContent.map(content => content.category))];

  return (
    <div className="space-y-6">

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-white/20"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48 bg-background/50 border-white/20">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContent.map((content) => (
          <Card key={content.id} className="glass-card overflow-hidden hover:scale-105 transition-transform">
            <div className="relative">
              <img
                src={content.thumbnailUrl}
                alt={content.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {content.duration}
              </div>
              <Badge 
                className="absolute top-2 left-2 bg-primary/90"
                variant="secondary"
              >
                {content.category}
              </Badge>
            </div>
            
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="font-rajdhani font-semibold text-lg line-clamp-2 mb-2">
                  {content.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {content.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">by {content.creator}</span>
                <div className="flex items-center gap-1 text-primary font-medium">
                  ₹{content.payoutPer1K}/1K
                  <Eye className="h-3 w-3" />
                </div>
              </div>

              <Button
                onClick={() => handleClipThis(content)}
                className="w-full glow-button"
                size="sm"
              >
                <Scissors className="h-4 w-4 mr-2" />
                Clip This
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No content matches your search criteria.</p>
        </div>
      )}

      <ClipSubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        rawContent={selectedContent}
      />
    </div>
  );
};