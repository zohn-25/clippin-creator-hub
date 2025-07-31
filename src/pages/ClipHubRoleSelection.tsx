import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Scissors } from 'lucide-react';

export const ClipHubRoleSelection = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: 'creator' | 'editor') => {
    if (role === 'creator') {
      navigate('/creator-login');
    } else {
      navigate('/editor-login');
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Join Clip Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your role to get started with our Edit to Earn platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Big Creator Card */}
          <Card className="glass-card hover:scale-105 transition-transform cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-orbitron gradient-text">
                I'm a Big Creator
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Upload raw content and let skilled editors create viral clips from your content
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Upload raw podcasts, vlogs, tutorials</li>
                <li>• Set payout rates per 1K views</li>
                <li>• Track clip performance and earnings</li>
                <li>• Get discovered by new audiences</li>
              </ul>
              <Button
                onClick={() => handleRoleSelection('creator')}
                className="w-full glow-button mt-6"
                size="lg"
              >
                <Users className="h-5 w-5 mr-2" />
                Continue as Creator
              </Button>
            </CardContent>
          </Card>

          {/* Editor Card */}
          <Card className="glass-card hover:scale-105 transition-transform cursor-pointer group">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Scissors className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-orbitron gradient-text">
                I'm an Editor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Browse raw content and create engaging clips to earn money based on performance
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Browse available raw content</li>
                <li>• Create engaging short clips</li>
                <li>• Earn based on clip performance</li>
                <li>• Build your editing portfolio</li>
              </ul>
              <Button
                onClick={() => handleRoleSelection('editor')}
                className="w-full glow-button mt-6"
                size="lg"
              >
                <Scissors className="h-5 w-5 mr-2" />
                Continue as Editor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};