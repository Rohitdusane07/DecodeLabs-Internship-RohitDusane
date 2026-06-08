'use client';

import { ExternalLink, Star, GitFork, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useState } from 'react';

const projects = [
  {
    name: 'Sentiment Analyzer',
    author: 'Sarah Chen',
    desc: 'Real-time social media sentiment classification with 97.3% accuracy on 10M+ tweets.',
    tags: ['NLP', 'Sentiment', 'Real-time'],
    stars: 342,
    forks: 89,
    model: 'DistilBERT',
    predictions: '10M+',
    details: 'Built a high-throughput sentiment pipeline processing 50K tweets/minute. Uses custom fine-tuned DistilBERT for Twitter-specific language patterns.',
  },
  {
    name: 'Medical Image Triage',
    author: 'Dr. Aisha Patel',
    desc: 'Automated priority classification for chest X-rays with radiologist-level accuracy.',
    tags: ['Medical', 'Vision', 'Triage'],
    stars: 567,
    forks: 124,
    model: 'ViT-Large',
    predictions: '500K+',
    details: 'Deployed in 3 hospitals for preliminary X-ray screening. Achieves 98.7% sensitivity for urgent cases, reducing wait times by 40%.',
  },
  {
    name: 'Legal Doc Sorter',
    author: 'James Rodriguez',
    desc: 'Multi-label classification for 15 document types across 500K legal filings.',
    tags: ['Legal', 'Multi-label', 'Production'],
    stars: 289,
    forks: 67,
    model: 'RoBERTa',
    predictions: '500K+',
    details: 'Processes 2,000 documents/day for a major law firm. Custom taxonomy of 15 document categories with 94% F1 score.',
  },
  {
    name: 'SpamShield Pro',
    author: 'Marcus Kim',
    desc: 'Email and SMS spam detection with 99.5% precision and near-zero false positives.',
    tags: ['Spam', 'Email', 'High-Precision'],
    stars: 421,
    forks: 103,
    model: 'BERT Base',
    predictions: '50M+',
    details: 'Enterprise spam filter with custom training on client email data. Processes 1M+ messages daily with sub-10ms latency.',
  },
];

export default function ProjectShowcase() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  const scrollToPlayground = () => {
    setSelected(null);
    const el = document.querySelector('#playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Community
              <span className="text-emerald-600 dark:text-emerald-400"> Projects</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore classifiers built by the ClassifyAI community.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2">
            {projects.map((p) => (
              <Card
                key={p.name}
                className="border-border/50 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 cursor-pointer group"
                onClick={() => setSelected(p)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{p.name}</h3>
                      <p className="text-xs text-muted-foreground">by {p.author}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-emerald-500 transition-colors" />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> {p.stars}</span>
                    <span className="flex items-center gap-1"><GitFork className="h-3.5 w-3.5" /> {p.forks}</span>
                    <span className="ml-auto">{p.model}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{selected?.name}</DialogTitle>
            <DialogDescription>by {selected?.author}</DialogDescription>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">{selected.details}</p>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-lg font-bold text-emerald-600">{selected.model}</div>
                  <div className="text-xs text-muted-foreground">Model</div>
                </div>
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-lg font-bold text-emerald-600">{selected.predictions}</div>
                  <div className="text-xs text-muted-foreground">Predictions</div>
                </div>
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-lg font-bold text-emerald-600">{selected.stars}</div>
                  <div className="text-xs text-muted-foreground">Stars</div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
              </div>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2" onClick={scrollToPlayground}>
                <Play className="h-4 w-4" /> Try Similar Classification
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
