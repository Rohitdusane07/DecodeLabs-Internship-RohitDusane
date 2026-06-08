'use client';

import { TrendingUp, Clock, Target, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { icon: Target, label: 'Total Predictions', value: '2.4M', change: '+12.3%', up: true },
  { icon: TrendingUp, label: 'Avg Accuracy', value: '96.8%', change: '+2.1%', up: true },
  { icon: Clock, label: 'Avg Latency', value: '42ms', change: '-8ms', up: true },
  { icon: Activity, label: 'Active Models', value: '23', change: '+5', up: true },
];

const recentPredictions = [
  { id: '1', input: 'Customer complaint about billing...', category: 'Billing', confidence: 94, time: '2s ago' },
  { id: '2', input: 'Product inquiry for electronics', category: 'Sales', confidence: 89, time: '5s ago' },
  { id: '3', input: 'Technical support request', category: 'Support', confidence: 97, time: '8s ago' },
  { id: '4', input: 'Partnership proposal email', category: 'Business Dev', confidence: 82, time: '12s ago' },
  { id: '5', input: 'Refund request for order #4521', category: 'Billing', confidence: 91, time: '15s ago' },
];

export default function AnalyticsDashboard() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Real-time
            <span className="text-emerald-600 dark:text-emerald-400"> Analytics</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Monitor every prediction, track model performance, and optimize in real time.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <s.icon className="h-5 w-5 text-emerald-500" />
                  <span className={`text-xs font-medium ${s.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{s.change}</span>
                </div>
                <div className="mt-3 text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 border-border/50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Predictions</h3>
            <div className="space-y-3">
              {recentPredictions.map((p) => (
                <div key={p.id} className="flex items-center gap-4 rounded-lg border border-border/30 p-3 transition-colors hover:bg-muted/50">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.input}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        {p.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{p.time}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{p.confidence}%</div>
                    <div className="text-xs text-muted-foreground">confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
