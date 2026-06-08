'use client';

import { useState } from 'react';
import { Play, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const sampleTexts = [
  'This product exceeded all my expectations! Amazing quality.',
  'The delivery was delayed by 3 weeks. Very disappointed.',
  'How do I reset my account password?',
  'Quarterly revenue increased by 15% year over year.',
];

const categories = ['Positive', 'Negative', 'Neutral', 'Query', 'Financial'];

const models = [
  { id: 'distilbert', name: 'DistilBERT', latency: '45ms' },
  { id: 'bert-base', name: 'BERT Base', latency: '85ms' },
  { id: 'roberta', name: 'RoBERTa', latency: '95ms' },
  { id: 'gpt2-small', name: 'GPT-2 Small', latency: '120ms' },
];

interface PredictionResult {
  category: string;
  confidence: number;
  scores: Record<string, number>;
  latency_ms: number;
  model: string;
}

export default function PredictionPlayground() {
  const [input, setInput] = useState('');
  const [model, setModel] = useState('distilbert');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const classify = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const response = await fetch(`${supabaseUrl}/functions/v1/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input, model }),
      });

      if (!response.ok) throw new Error('Classification failed. Please try again.');

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="playground" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Try the
            <span className="text-emerald-600 dark:text-emerald-400"> Playground</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Enter any text and watch our classifier work in real-time.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="border-border/50">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Text Classifier</CardTitle>
              <p className="text-sm text-muted-foreground">Powered by state-of-the-art transformer models.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter text to classify..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={4}
                className="resize-none"
                disabled={loading}
              />

              <div className="flex flex-wrap gap-2">
                {sampleTexts.map((t, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => setInput(t)}
                    disabled={loading}
                  >
                    Sample {i + 1}
                  </Button>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Select value={model} onValueChange={setModel} disabled={loading}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name} ({m.latency})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={classify}
                    disabled={loading || !input.trim()}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Classifying...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" /> Classify
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {result && (
                <div className="mt-4 space-y-4 rounded-lg border border-border/50 p-4 animate-in fade-in-0 duration-300">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Predicted Category</span>
                    <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 text-base px-3 py-1">
                      {result.category}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="rounded-lg bg-muted/50 p-2">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{result.confidence}%</div>
                      <div className="text-xs text-muted-foreground">Confidence</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{result.model}</div>
                      <div className="text-xs text-muted-foreground">Model</div>
                    </div>
                    <div className="rounded-lg bg-muted/50 p-2">
                      <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{result.latency_ms}ms</div>
                      <div className="text-xs text-muted-foreground">Latency</div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-border/50">
                    <p className="text-xs font-medium text-muted-foreground">Score Distribution</p>
                    {categories
                      .map((cat) => ({ cat, score: result.scores[cat] || 0 }))
                      .sort((a, b) => b.score - a.score)
                      .map(({ cat, score }) => (
                        <div key={cat} className="flex items-center gap-3">
                          <span className="w-20 text-xs text-muted-foreground">{cat}</span>
                          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                cat === result.category
                                  ? 'bg-emerald-500'
                                  : 'bg-muted-foreground/30'
                              }`}
                              style={{ width: `${Math.min(score * 100, 100)}%` }}
                            />
                          </div>
                          <span className="w-12 text-right text-xs text-muted-foreground">
                            {(score * 100).toFixed(0)}%
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
