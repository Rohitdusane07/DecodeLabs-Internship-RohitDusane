'use client';

import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'ML Engineer at Stripe',
    quote: 'ClassifyAI reduced our model deployment time from weeks to hours. The AutoML pipeline is incredibly powerful.',
    rating: 5,
  },
  {
    name: 'James Rodriguez',
    role: 'CTO at LegalTech Inc',
    quote: 'We process 500K legal documents daily with 99.2% accuracy. The latency is consistently under 50ms.',
    rating: 5,
  },
  {
    name: 'Aisha Patel',
    role: 'Data Science Lead at Shopify',
    quote: 'The training lab made it easy for our non-ML team to build custom classifiers. Game changer for productivity.',
    rating: 5,
  },
  {
    name: 'Marcus Kim',
    role: 'VP Engineering at Vercel',
    quote: 'We migrated from a custom pipeline to ClassifyAI and cut infrastructure costs by 70% while improving accuracy.',
    rating: 5,
  },
  {
    name: 'Elena Vasquez',
    role: 'Product Manager at Notion',
    quote: 'The AI assistant helped us choose the right model and optimize our classification strategy. Outstanding support.',
    rating: 5,
  },
  {
    name: 'David Okafor',
    role: 'Head of AI at Revolut',
    quote: 'Enterprise security and compliance features gave us confidence to deploy at scale. SOC 2 certification sealed the deal.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Loved by
            <span className="text-emerald-600 dark:text-emerald-400"> engineering teams</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Trusted by teams at leading companies worldwide.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-border/50 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardContent className="p-6">
                <Quote className="mb-4 h-8 w-8 text-emerald-500/20" />
                <p className="text-sm leading-relaxed text-muted-foreground">{t.quote}</p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <div className="mt-3">
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
