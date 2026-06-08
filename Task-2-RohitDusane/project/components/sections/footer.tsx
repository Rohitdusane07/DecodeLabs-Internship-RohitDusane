'use client';

import { Brain, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'Models', href: '#models' },
    { label: 'Playground', href: '#playground' },
    { label: 'Training Lab', href: '#training' },
    { label: 'Pricing', href: '#pricing' },
  ],
  Resources: [
    { label: 'Documentation', href: '#', external: true },
    { label: 'API Reference', href: '#', external: true },
    { label: 'Tutorials', href: '#', external: true },
    { label: 'Blog', href: '#', external: true },
    { label: 'Community', href: '#', external: true },
  ],
  Company: [
    { label: 'About', href: '#', external: true },
    { label: 'Careers', href: '#', external: true },
    { label: 'Press', href: '#', external: true },
    { label: 'Contact', href: '#', external: true },
    { label: 'Partners', href: '#', external: true },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#', external: true },
    { label: 'Terms of Service', href: '#', external: true },
    { label: 'Security', href: '#', external: true },
    { label: 'Compliance', href: '#', external: true },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleNavClick = (href: string, external?: boolean) => {
    if (external) return;
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <button onClick={() => handleNavClick('#features')} className="flex items-center gap-2">
              <Brain className="h-7 w-7 text-emerald-500" />
              <span className="text-lg font-bold tracking-tight">ClassifyAI</span>
            </button>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              The AI-powered classification platform for modern engineering teams.
            </p>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Github, label: 'GitHub' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Linkedin, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a key={label} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 text-muted-foreground transition-colors hover:border-emerald-500/50 hover:text-emerald-600" aria-label={label}>
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Stay updated</p>
              {subscribed ? (
                <p className="text-sm text-emerald-600"></p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" size="icon" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
                    <Mail className="h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => handleNavClick(l.href, l.external)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">&copy; 2026 ClassifyAI. </p>
          <p className="text-xs text-muted-foreground">Dveloped By Rohit Vijay Dusane. Powered by AI.</p>
        </div>
      </div>
    </footer>
  );
}
