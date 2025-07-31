import { ArrowRight, Play, Users, TrendingUp, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-bg.jpg';

export const Home = () => {
  const stats = [
    { value: '50K+', label: 'Active Creators' },
    { value: '₹2.5Cr+', label: 'Paid Out' },
    { value: '1000+', label: 'Brands' },
    { value: '95%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Performance-Based Payouts',
      description: 'Get paid based on actual engagement and results, not just deliverables.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Direct Brand Connections',
      description: 'Connect directly with top brands without middlemen taking cuts.',
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Transparent Analytics',
      description: 'Real-time tracking of views, engagement, and earnings.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-orbitron font-bold mb-6 animate-float">
              <span className="gradient-text">Powering India's</span>
              <br />
              <span className="text-white text-shadow">Creator Economy</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-rajdhani font-medium text-shadow">
              Get Paid for Performance. Not Promises.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/creator-login">
                <Button 
                  size="lg" 
                  className="glow-button bg-gradient-primary text-lg px-8 py-4"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Login as Creator
                </Button>
              </Link>
              
              <Link to="/brand-login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 text-lg px-8 py-4"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Login as Brand
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="glass-card p-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-2xl md:text-3xl font-orbitron font-bold gradient-text mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-rajdhani">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
              Why Choose Clippin?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The future of creator-brand collaboration is here. Fair. Transparent. Performance-driven.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, transparent, and performance-driven process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-orbitron font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Apply to Campaigns</h3>
              <p className="text-muted-foreground">
                Browse and apply to campaigns that match your audience and content style
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-orbitron font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Create Content</h3>
              <p className="text-muted-foreground">
                Create authentic, engaging content that resonates with your audience
              </p>
            </div>

            <div className="glass-card p-8 text-center hover:scale-105 transition-transform duration-300">
              <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-orbitron font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-orbitron font-semibold mb-4">Earn by Performance</h3>
              <p className="text-muted-foreground">
                Get paid based on actual engagement, views, and results you drive
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
              What Creators Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from creators who are already earning more with performance-based payouts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face" 
                  alt="Creator" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-rajdhani font-semibold">Priya Sharma</h4>
                  <p className="text-sm text-muted-foreground">Tech Reviewer</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Clippin changed how I monetize content. Performance-based payouts mean I earn more when my content performs better."
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" 
                  alt="Creator" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-rajdhani font-semibold">Rohan Gupta</h4>
                  <p className="text-sm text-muted-foreground">Gaming Creator</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "Finally, a platform that pays fairly. No more fixed rates - my earnings scale with my audience engagement."
              </p>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" 
                  alt="Creator" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-rajdhani font-semibold">Sneha Patel</h4>
                  <p className="text-sm text-muted-foreground">Fashion Influencer</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The direct brand connections and transparent analytics make Clippin the best platform for serious creators."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 text-center">
        <div className="container mx-auto">
          <div className="glass-card p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-6">
              Ready to Transform Your Content into Income?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators already earning performance-based payouts
            </p>
            <Link to="/campaigns">
              <Button size="lg" className="glow-button bg-gradient-primary text-lg px-12 py-4">
                Start Creating Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};