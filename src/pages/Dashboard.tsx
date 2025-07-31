import { useState, useEffect } from 'react';
import { useRole } from '@/hooks/useRole';
import { CreatorDashboard } from '@/components/CreatorDashboard';
import { BrandDashboard } from '@/components/BrandDashboard';

export const Dashboard = () => {
  const { role } = useRole();

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            {role === 'creator' ? 'Creator Dashboard' : 'Brand Dashboard'}
          </h1>
          <p className="text-xl text-muted-foreground">
            {role === 'creator' 
              ? 'Track your applications, earnings, and performance'
              : 'Manage your campaigns, review submissions, and track ROI'
            }
          </p>
        </div>

        {/* Dashboard Content */}
        {role === 'creator' ? <CreatorDashboard /> : <BrandDashboard />}
      </div>
    </div>
  );
};