'use client';

import { BarChart3, Cpu, Globe, Lock, Zap, Layers } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const features = [
  {
    icon: Zap,
    title: 'Real-Time Inference',
    desc: 'Sub-50ms classification latency powered by optimized model serving infrastructure.',
  },
  {
    icon: Layers,
    title: 'Multi-Modal Support',
    desc: 'Classify text, images, audio, and tabular data with a unified API endpoint.',
  },
  {
    icon: BarChart3,
    title: 'AutoML Pipeline',
    desc: 'Automated feature engineering, hyperparameter tuning, and model selection.',
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    desc: 'SOC 2 compliant with end-to-end encryption and role-based access controls.',
  },
  {
    icon: Globe,
    title: 'Global Deployment',
    desc: 'Edge-optimized inference across 30+ regions for low-latency predictions.',
  },
  {
    icon: Cpu,
    title: 'Custom Training',
    desc: 'Fine-tune foundation models on your data with zero infrastructure overhead.',
  },
];

export default function FeatureInsights() {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need to
            <span className="text-emerald-600 dark:text-emerald-400"> classify at scale</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            From prototype to production, ClassifyAI provides the complete toolkit for intelligent classification.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="group border-border/50 bg-card/50 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3 text-emerald-600 transition-colors group-hover:bg-emerald-100 dark:bg-emerald-950/50 dark:text-emerald-400 dark:group-hover:bg-emerald-950/80">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
