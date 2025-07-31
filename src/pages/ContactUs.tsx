import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold gradient-text mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-2xl font-orbitron gradient-text">Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-rajdhani font-medium">Name</label>
                    <Input
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-input/50 border-white/20"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-rajdhani font-medium">Email</label>
                    <Input
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-input/50 border-white/20"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-rajdhani font-medium">Subject</label>
                  <Input
                    name="subject"
                    placeholder="What's this about?"
                    value={formData.subject}
                    onChange={handleChange}
                    className="bg-input/50 border-white/20"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-rajdhani font-medium">Message</label>
                  <Textarea
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-input/50 border-white/20 min-h-[120px]"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full glow-button bg-gradient-primary" 
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold">Email</h3>
                    <p className="text-muted-foreground">hello@clippin.in</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-white/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-full bg-gradient-primary">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-semibold">Office</h3>
                    <p className="text-muted-foreground">
                      Koramangala, Bengaluru<br />
                      Karnataka, India
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-xl font-orbitron gradient-text">Quick Answers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-rajdhani font-semibold mb-2">How do payouts work?</h4>
                  <p className="text-sm text-muted-foreground">Creators get paid based on actual performance metrics like views, engagement, and conversions.</p>
                </div>
                <div>
                  <h4 className="font-rajdhani font-semibold mb-2">How to get started?</h4>
                  <p className="text-sm text-muted-foreground">Simply sign up as a Creator or Brand, complete your profile, and start browsing opportunities.</p>
                </div>
                <div>
                  <h4 className="font-rajdhani font-semibold mb-2">Support hours</h4>
                  <p className="text-sm text-muted-foreground">Monday to Friday, 9 AM to 6 PM IST</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};