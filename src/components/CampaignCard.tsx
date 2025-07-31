import { useState } from 'react';
import { Calendar, IndianRupee, Tag, Building } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ApplicationModal } from './ApplicationModal';
import type { Campaign } from '@/data/mockData';

interface CampaignCardProps {
  campaign: Campaign;
  onApply: (campaignId: string) => void;
}

export const CampaignCard = ({ campaign, onApply }: CampaignCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleApplyClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmitApplication = () => {
    onApply(campaign.id);
    setIsModalOpen(false);
  };

  const isDeadlineSoon = () => {
    const deadline = new Date(campaign.deadline);
    const now = new Date();
    const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 5;
  };

  return (
    <>
      <div className="glass-card p-6 hover:scale-105 transition-all duration-300 hover:shadow-glow">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-orbitron font-semibold mb-2 text-foreground">
              {campaign.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {campaign.description}
            </p>
          </div>
          {campaign.isApplied && (
            <Badge variant="secondary" className="ml-4">
              Applied
            </Badge>
          )}
          {campaign.status === 'approved' && (
            <Badge className="ml-4 bg-success text-success-foreground">
              Approved
            </Badge>
          )}
          {campaign.status === 'rejected' && (
            <Badge variant="destructive" className="ml-4">
              Rejected
            </Badge>
          )}
        </div>

        {/* Campaign Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <Building className="h-4 w-4 mr-2" />
            {campaign.brand}
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Tag className="h-4 w-4 mr-2" />
            {campaign.category}
          </div>

          <div className="flex items-center text-sm">
            <IndianRupee className="h-4 w-4 mr-2 text-primary" />
            <span className="font-semibold text-primary">
              ₹{campaign.payoutPer1K}/1K views
            </span>
          </div>

          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            <span className={isDeadlineSoon() ? 'text-destructive font-medium' : 'text-muted-foreground'}>
              Deadline: {formatDate(campaign.deadline)}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/10">
          {campaign.isApplied ? (
            <Button 
              variant="outline" 
              className="w-full" 
              disabled
            >
              Application Submitted
            </Button>
          ) : (
            <Button 
              onClick={handleApplyClick}
              className="w-full glow-button bg-gradient-primary"
            >
              Apply Now
            </Button>
          )}
        </div>
      </div>

      {/* Application Modal */}
      <ApplicationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitApplication}
        campaign={campaign}
      />
    </>
  );
};