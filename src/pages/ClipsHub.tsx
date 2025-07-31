import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreatorPanel } from '@/components/CreatorPanel';
import { EditorPanel } from '@/components/EditorPanel';
import { PerformanceTracking } from '@/components/PerformanceTracking';
import { CreatorInsights } from '@/components/CreatorInsights';
import { Upload, Scissors, TrendingUp, Users } from 'lucide-react';

export const ClipsHub = () => {
  const [activeSection, setActiveSection] = useState<'creator' | 'editor'>('creator');

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

        {/* Section Selector */}
        <div className="flex justify-center mb-8">
          <div className="glass-card p-1 rounded-lg flex">
            <Button
              variant={activeSection === 'creator' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('creator')}
              className="flex items-center gap-2 px-6 py-3"
            >
              <Users className="h-4 w-4" />
              Content Creators
            </Button>
            <Button
              variant={activeSection === 'editor' ? 'default' : 'ghost'}
              onClick={() => setActiveSection('editor')}
              className="flex items-center gap-2 px-6 py-3"
            >
              <Scissors className="h-4 w-4" />
              Clip Editors
            </Button>
          </div>
        </div>

        {/* Creator Section */}
        {activeSection === 'creator' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-orbitron font-bold gradient-text mb-2">
                Content Creator Hub
              </h2>
              <p className="text-muted-foreground">
                Upload your raw content and track performance of created clips
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 gradient-text">
                      <Upload className="h-5 w-5" />
                      Upload Raw Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CreatorPanel />
                  </CardContent>
                </Card>
              </div>

              {/* Insights Section */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 gradient-text">
                      <TrendingUp className="h-5 w-5" />
                      Content Insights
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CreatorInsights />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Editor Section */}
        {activeSection === 'editor' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-orbitron font-bold gradient-text mb-2">
                Clip Editor Hub
              </h2>
              <p className="text-muted-foreground">
                Browse content, create clips, and track your earnings
              </p>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Browse & Clip Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 gradient-text">
                      <Scissors className="h-5 w-5" />
                      Browse & Create Clips
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <EditorPanel />
                  </CardContent>
                </Card>
              </div>

              {/* Earnings Section */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 gradient-text">
                      <TrendingUp className="h-5 w-5" />
                      My Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <PerformanceTracking />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};