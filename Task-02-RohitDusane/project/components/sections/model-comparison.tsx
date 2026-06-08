'use client';

import { Check } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const models = [
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    badge: 'Popular',
    type: 'Text & Vision',
    accuracy: '97.8%',
    latency: '120ms',
    use: ['Document classification', 'Sentiment analysis', 'Content moderation'],
  },
  {
    name: 'Claude 3.5',
    provider: 'Anthropic',
    badge: 'Fast',
    type: 'Text',
    accuracy: '98.2%',
    latency: '85ms',
    use: ['Legal document sorting', 'Email categorization', 'Support ticket routing'],
  },
  {
    name: 'Whisper v3',
    provider: 'OpenAI',
    badge: 'Audio',
    type: 'Audio',
    accuracy: '96.5%',
    latency: '200ms',
    use: ['Speech categorization', 'Audio event detection', 'Voice command sorting'],
  },
  {
    name: 'ViT-Large',
    provider: 'Google',
    badge: 'Vision',
    type: 'Image',
    accuracy: '99.1%',
    latency: '45ms',
    use: ['Medical imaging', 'Product recognition', 'Quality inspection'],
  },
];

export default function ModelComparison() {
  return (
    <section id="models" className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Choose your
            <span className="text-emerald-600 dark:text-emerald-400"> model backbone</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Compare accuracy, latency, and use cases across leading AI models.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {models.map((m) => (
            <Card key={m.name} className="border-border/50 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{m.name}</CardTitle>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                    {m.badge}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{m.provider} &middot; {m.type}</p>
              </CardHeader>
              <CardContent>
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-background p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{m.accuracy}</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="rounded-lg bg-background p-3 text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{m.latency}</div>
                    <div className="text-xs text-muted-foreground">Latency</div>
                  </div>
                </div>
                <ul className="space-y-2">
                  {m.use.map((u) => (
                    <li key={u} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
