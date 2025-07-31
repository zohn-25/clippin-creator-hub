import { TrendingUp, Users, Shield, DollarSign, Clock, Star, Zap, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: 'Performance-Based Payouts',
      description: 'Get paid for actual results - views, engagement, and conversions. No empty promises, just real performance.',
      highlight: '3x higher earnings'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Direct Brand Connections',
      description: 'Connect directly with top brands without middlemen. Keep more of what you earn.',
      highlight: '0% platform fees'
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: 'Real-Time Analytics',
      description: 'Track your performance, earnings, and growth with detailed analytics and insights.',
      highlight: 'Live tracking'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure & Transparent',
      description: 'All transactions are secured and transparent. Know exactly what you\'re earning and when.',
      highlight: 'Bank-grade security'
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: 'Quick Payouts',
      description: 'Get paid within 48 hours of campaign completion. No waiting for months.',
      highlight: '48hr payments'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Quality Campaigns',
      description: 'Work with verified brands and high-quality campaigns that match your audience.',
      highlight: '95% satisfaction'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Creators', growth: '+150% this year' },
    { value: '₹2.5Cr+', label: 'Total Payouts', growth: 'Growing monthly' },
    { value: '1000+', label: 'Partner Brands', growth: 'Top companies' },
    { value: '95%', label: 'Success Rate', growth: 'Campaign completion' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Tech Reviewer',
      content: 'Clippin changed how I monetize my content. Performance-based payouts mean I earn more when my content performs better.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Rohan Gupta',
      role: 'Gaming Creator',
      content: 'Finally, a platform that pays fairly. No more fixed rates - my earnings scale with my audience engagement.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
    },
    {
      name: 'Sneha Patel',
      role: 'Fashion Influencer',
      content: 'The direct brand connections and transparent analytics make Clippin the best platform for serious creators.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-6">
            Why Choose Clippin?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing the creator economy with fair, performance-based payouts and direct brand partnerships. 
            Here's why thousands of creators and brands trust us.
          </p>
        </div>

        {/* Key Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-orbitron font-bold text-center gradient-text mb-12">
            Platform Advantages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass-card border-white/20 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-6 text-center">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-orbitron font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <div className="text-sm font-rajdhani font-bold text-primary">
                    {feature.highlight}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-orbitron font-bold text-center gradient-text mb-12">
            Platform Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-orbitron font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-rajdhani font-semibold mb-1">
                    {stat.label}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.growth}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <h2 className="text-3xl font-orbitron font-bold text-center gradient-text mb-12">
            How Clippin Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="glass-card border-white/20 text-center">
              <CardContent className="p-8">
                <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-orbitron font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4">Browse & Apply</h3>
                <p className="text-muted-foreground">
                  Browse campaigns from top brands and apply to those that match your audience and style.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 text-center">
              <CardContent className="p-8">
                <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-orbitron font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4">Create Content</h3>
                <p className="text-muted-foreground">
                  Create authentic content that resonates with your audience while meeting campaign guidelines.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20 text-center">
              <CardContent className="p-8">
                <div className="p-4 rounded-full bg-gradient-primary w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-orbitron font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-orbitron font-semibold mb-4">Earn by Performance</h3>
                <p className="text-muted-foreground">
                  Get paid based on actual results - the better your content performs, the more you earn.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <h2 className="text-3xl font-orbitron font-bold text-center gradient-text mb-12">
            What Creators Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="glass-card border-white/20">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-rajdhani font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <Card className="glass-card border-white/20">
            <CardContent className="p-12">
              <h2 className="text-3xl font-orbitron font-bold gradient-text mb-6">
                Ready to Transform Your Content Creation?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of creators already earning performance-based payouts with top brands.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/creator-login" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary text-white font-rajdhani font-semibold rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Users className="mr-2 h-5 w-5" />
                  Start as Creator
                </a>
                <a 
                  href="/brand-login" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 border border-white/20 text-white font-rajdhani font-semibold rounded-lg hover:bg-white/20 transition-colors"
                >
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Partner as Brand
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};