'use client';

import { useState } from 'react';
import { Brain, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Models', href: '#models' },
  { label: 'Playground', href: '#playground' },
  { label: 'Training', href: '#training' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNavClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      setPassword('');
    }, 1500);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <button onClick={() => handleNavClick('#features')} className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-emerald-500" />
            <span className="text-lg font-bold tracking-tight">ClassifyAI</span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm" onClick={() => { setIsSignUp(false); setAuthOpen(true); }}>
              Sign In
            </Button>
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setIsSignUp(true); setAuthOpen(true); }}>
              Get Started
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border/40 bg-background/95 backdrop-blur-xl md:hidden">
            <div className="space-y-1 px-4 py-3">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  onClick={() => handleNavClick(l.href)}
                  className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </button>
              ))}
              <div className="flex flex-col gap-2 pt-3">
                <Button variant="ghost" size="sm" onClick={() => { setOpen(false); setIsSignUp(false); setAuthOpen(true); }}>
                  Sign In
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={() => { setOpen(false); setIsSignUp(true); setAuthOpen(true); }}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isSignUp ? 'Create an account' : 'Welcome back'}</DialogTitle>
            <DialogDescription>
              {isSignUp
                ? 'Start classifying with AI in minutes. Free tier available.'
                : 'Sign in to access your models and predictions.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'Please wait...' : success ? 'Success!' : isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <button type="button" className="text-emerald-600 hover:underline" onClick={() => setIsSignUp(false)}>
                    Sign in
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <button type="button" className="text-emerald-600 hover:underline" onClick={() => setIsSignUp(true)}>
                    Sign up
                  </button>
                </>
              )}
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
