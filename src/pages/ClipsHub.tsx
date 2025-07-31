import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreatorPanel } from '@/components/CreatorPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PerformanceTracking } from '@/components/PerformanceTracking';
import { useRole } from '@/hooks/useRole';

export const ClipsHub = () => {
  const { role } = useRole();
  const [activeTab, setActiveTab] = useState(role === 'creator' ? 'upload' : 'browse');

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Clip Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Edit to Earn - Where large creators share raw content and skilled editors create viral clips
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 glass-card max-w-md mx-auto">
            <TabsTrigger value="upload" className="data-[state=active]:bg-primary/20">
              Upload Content
            </TabsTrigger>
            <TabsTrigger value="browse" className="data-[state=active]:bg-primary/20">
              Browse & Clip
            </TabsTrigger>
            <TabsTrigger value="earnings" className="data-[state=active]:bg-primary/20">
              My Earnings
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="upload" className="space-y-6">
              <CreatorPanel />
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              <EditorPanel />
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <PerformanceTracking />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};