'use client';

import { ArrowRight, Play, Sparkles } from 'lucide-react';
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
import { useState } from 'react';

export default function Hero() {
  const [authOpen, setAuthOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const scrollToPlayground = () => {
    const el = document.querySelector('#playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleStart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
    setTimeout(() => {
      setAuthOpen(false);
      setSuccess(false);
      setEmail('');
    }, 1500);
  };

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-teal-50/30 dark:from-emerald-950/20 dark:via-transparent dark:to-teal-950/10" />
          <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl dark:bg-emerald-500/5" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400">
              <Sparkles className="h-4 w-4" />
              Now with GPT-4o &amp; Claude 3.5 support
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              AI-Powered
              <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400"> Classification Studio</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Train, deploy, and monitor machine learning classifiers with zero infrastructure.
              From text analysis to image recognition, build production-ready models in minutes.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 gap-2 text-base px-8" onClick={() => setAuthOpen(true)}>
                Start Classifying <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 gap-2" onClick={() => setDemoOpen(true)}>
                <Play className="h-4 w-4" /> Watch Demo
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/40 pt-10">
              {[
                { value: '99.7%', label: 'Accuracy Rate' },
                { value: '50ms', label: 'Avg Latency' },
                { value: '10M+', label: 'Classifications' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">{s.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <Dialog open={authOpen} onOpenChange={setAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Get Started Free</DialogTitle>
            <DialogDescription>
              Start classifying with AI in minutes. No credit card required.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStart} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-email">Email</Label>
              <Input
                id="hero-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
              {loading ? 'Creating account...' : success ? 'Account created!' : 'Create Free Account'}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </form>
        </DialogContent>
      </Dialog>

      {/* Demo Video Modal */}
      <Dialog open={demoOpen} onOpenChange={setDemoOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Watch Demo</DialogTitle>
            <DialogDescription>
              See how ClassifyAI works in under 2 minutes.
            </DialogDescription>
          </DialogHeader>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Play className="h-16 w-16 text-emerald-500 mx-auto mb-4" />
              <p className="text-muted-foreground">Demo video placeholder</p>
              <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700" onClick={() => { setDemoOpen(false); scrollToPlayground(); }}>
                Try it yourself instead
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
