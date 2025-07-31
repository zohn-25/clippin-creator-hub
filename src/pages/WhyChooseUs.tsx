import { TrendingUp, Users, Shield, IndianRupee, Clock, Star, Zap, Target, Check, Scissors } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <IndianRupee className="h-8 w-8" />,
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

        {/* Dual Business Models */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold gradient-text mb-4">
              Two Revolutionary Earning Models
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              Clippin offers unprecedented flexibility with two distinct monetization pathways designed for different content creators
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Model 1: Traditional Creator-Brand */}
            <Card className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold gradient-text mb-2">
                  Creator-Brand Partnership Model
                </h3>
                <p className="text-muted-foreground">
                  Traditional sponsored content with premium rates and reliable partnerships
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Guaranteed Payments</h4>
                    <p className="text-sm text-muted-foreground">Fixed campaign budgets from ₹5,000 to ₹50,000 per collaboration</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Brand Authenticity</h4>
                    <p className="text-sm text-muted-foreground">Work with verified brands for genuine partnerships and long-term relationships</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Creative Freedom</h4>
                    <p className="text-sm text-muted-foreground">Maintain your authentic voice while promoting products you believe in</p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">₹50-500</div>
                    <div className="text-sm text-muted-foreground">per 1K views</div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Model 2: Edit to Earn */}
            <Card className="glass-card p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scissors className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-bold gradient-text mb-2">
                  Edit to Earn Model
                </h3>
                <p className="text-muted-foreground">
                  Revolutionary clip creation system that turns raw content into viral moments
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Viral Potential</h4>
                    <p className="text-sm text-muted-foreground">Create clips that can reach millions and earn ₹60-120 per 1K views</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Skill Development</h4>
                    <p className="text-sm text-muted-foreground">Improve your editing skills while earning from successful creators' content</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">Creator Collaboration</h4>
                    <p className="text-sm text-muted-foreground">Build relationships with big creators and become their go-to editor</p>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">₹60-120</div>
                    <div className="text-sm text-muted-foreground">per 1K views</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why Choose Both */}
          <div className="text-center">
            <Card className="glass-card p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-orbitron font-bold gradient-text mb-4">
                Why Not Choose Both?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Maximize your earning potential by participating in both models. Many successful creators earn from brand partnerships while also providing raw content for editing, or edit clips while running their own campaigns.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">2x</div>
                  <div className="text-sm text-muted-foreground">Revenue Streams</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">₹100K+</div>
                  <div className="text-sm text-muted-foreground">Monthly Potential</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">365</div>
                  <div className="text-sm text-muted-foreground">Days of Earning</div>
                </div>
              </div>
            </Card>
          </div>
        </section>

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