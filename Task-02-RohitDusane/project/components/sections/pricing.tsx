'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    desc: 'For individuals exploring AI classification.',
    features: ['1,000 predictions/month', '1 custom model', 'Community support', 'Basic analytics', 'CSV upload'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Pro',
    price: '$49',
    period: '/month',
    desc: 'For teams building production classifiers.',
    features: ['100K predictions/month', '10 custom models', 'Priority support', 'Advanced analytics', 'All data formats', 'API access', 'Webhook integrations'],
    cta: 'Start Free Trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For organizations with advanced needs.',
    features: ['Unlimited predictions', 'Unlimited models', 'Dedicated support', 'Custom analytics', 'SOC 2 compliance', 'SSO / SAML', 'On-premise deployment', 'SLA guarantee'],
    cta: 'Contact Sales',
    featured: false,
  },
];

export default function Pricing() {
  const [authOpen, setAuthOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const scrollToPlayground = () => {
    const el = document.querySelector('#playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCta = (planName: string) => {
    if (planName === 'Enterprise') {
      setContactOpen(true);
    } else {
      setAuthOpen(true);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setAuthOpen(false);
      setSuccess(false);
      setEmail('');
      scrollToPlayground();
    }, 1500);
  };

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setContactOpen(false);
      setSuccess(false);
      setEmail('');
      setCompany('');
      setMessage('');
    }, 1500);
  };

  return (
    <>
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Simple, transparent
              <span className="text-emerald-600 dark:text-emerald-400"> pricing</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Start free. Scale as you grow. No hidden fees.
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {plans.map((p) => (
              <Card key={p.name} className={`relative border-border/50 transition-all duration-300 ${p.featured ? 'border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105' : 'hover:border-emerald-500/30'}`}>
                {p.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600">Most Popular</Badge>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl">{p.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <span className="text-4xl font-bold">{p.price}</span>
                    <span className="text-muted-foreground">{p.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handleCta(p.name)} className={`w-full ${p.featured ? 'bg-emerald-600 hover:bg-emerald-700' : ''}`} variant={p.featured ? 'default' : 'outline'}>
                    {p.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Start your free trial</DialogTitle>
            <DialogDescription>
              14-day free trial. No credit card required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pricing-email">Email</Label>
              <Input
                id="pricing-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'Creating account...' : success ? 'Account created!' : 'Start Free Trial'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Contact Sales Modal */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact Sales</DialogTitle>
            <DialogDescription>
              Tell us about your needs and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleContact} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-email">Work Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-company">Company</Label>
              <Input
                id="contact-company"
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                placeholder="Tell us about your classification needs..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'Sending...' : success ? 'Sent!' : 'Send Message'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
