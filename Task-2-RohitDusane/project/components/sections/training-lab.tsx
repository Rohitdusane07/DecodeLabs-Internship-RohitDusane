'use client';

import { useState } from 'react';
import { FlaskConical, Play, Loader2, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';

type Stage = 'idle' | 'preprocessing' | 'training' | 'evaluating' | 'done';

const stageLabels: Record<Stage, string> = {
  idle: 'Ready',
  preprocessing: 'Preprocessing data...',
  training: 'Training model...',
  evaluating: 'Evaluating accuracy...',
  done: 'Training complete!',
};

export default function TrainingLab() {
  const [stage, setStage] = useState<Stage>('idle');
  const [epochs, setEpochs] = useState([10]);
  const [lr, setLr] = useState([0.001]);
  const [model, setModel] = useState('distilbert');
  const [metrics, setMetrics] = useState<{ acc: number; f1: number; loss: number } | null>(null);

  const startTraining = async () => {
    setStage('preprocessing');
    setMetrics(null);
    await new Promise((r) => setTimeout(r, 2000));
    setStage('training');
    await new Promise((r) => setTimeout(r, 3000));
    setStage('evaluating');
    await new Promise((r) => setTimeout(r, 1500));
    setMetrics({
      acc: +(92 + Math.random() * 7).toFixed(1),
      f1: +(90 + Math.random() * 8).toFixed(1),
      loss: +(0.05 + Math.random() * 0.2).toFixed(3),
    });
    setStage('done');
  };

  const reset = () => { setStage('idle'); setMetrics(null); };

  return (
    <section id="training" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Train in the
            <span className="text-emerald-600 dark:text-emerald-400"> Lab</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Configure hyperparameters and train custom classifiers with one click.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-emerald-500" /> Training Lab
                </CardTitle>
                <Badge variant={stage === 'done' ? 'default' : 'secondary'} className={stage === 'done' ? 'bg-emerald-600' : ''}>
                  {stageLabels[stage]}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Base Model</Label>
                  <Select value={model} onValueChange={setModel} disabled={stage !== 'idle'}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="distilbert">DistilBERT</SelectItem>
                      <SelectItem value="bert-base">BERT Base</SelectItem>
                      <SelectItem value="roberta">RoBERTa</SelectItem>
                      <SelectItem value="gpt2-small">GPT-2 Small</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Epochs: {epochs[0]}</Label>
                  <Slider value={epochs} onValueChange={setEpochs} min={1} max={50} step={1} disabled={stage !== 'idle'} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Learning Rate: {lr[0]}</Label>
                <Slider value={lr} onValueChange={setLr} min={0.0001} max={0.01} step={0.0001} disabled={stage !== 'idle'} />
              </div>

              <div className="flex gap-3">
                <Button onClick={startTraining} disabled={stage !== 'idle'} className="flex-1 bg-emerald-600 hover:bg-emerald-700 gap-2">
                  {stage !== 'idle' && stage !== 'done' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  {stage !== 'idle' && stage !== 'done' ? 'Training...' : 'Start Training'}
                </Button>
                {stage === 'done' && (
                  <Button variant="outline" onClick={reset} className="gap-2">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </Button>
                )}
              </div>

              {stage !== 'idle' && stage !== 'done' && (
                <div className="space-y-2">
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: stage === 'preprocessing' ? '25%' : stage === 'training' ? '65%' : '90%' }} />
                  </div>
                  <p className="text-xs text-center text-muted-foreground">{stageLabels[stage]}</p>
                </div>
              )}

              {metrics && (
                <div className="grid grid-cols-3 gap-4 rounded-lg border border-border/50 p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.acc}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.f1}%</div>
                    <div className="text-xs text-muted-foreground">F1 Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{metrics.loss}</div>
                    <div className="text-xs text-muted-foreground">Loss</div>
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
