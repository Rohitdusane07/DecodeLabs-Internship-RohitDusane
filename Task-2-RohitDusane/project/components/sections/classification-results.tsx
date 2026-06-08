'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Clock, TrendingUp, BarChart3, PieChart, Loader2, Download, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPie,
  Pie,
  Cell,
} from 'recharts';

interface ClassificationResult {
  id: string;
  model: string;
  total_rows: number;
  processed_rows: number;
  results: Array<{
    rowIndex: number;
    text: string;
    predicted: string;
    confidence: number;
    scores: Record<string, number>;
    actual?: string;
    latency_ms: number;
  }>;
  accuracy: number | null;
  precision: number | null;
  recall: number | null;
  f1_score: number | null;
  confusion_matrix: Record<string, Record<string, number>> | null;
  category_distribution: Record<string, number>;
  avg_latency_ms: number;
  status: string;
  completed_at: string | null;
}

interface ClassificationResultsProps {
  resultId: string | null;
  dataset: {
    name: string;
    text_column: string;
    label_column: string | null;
  } | null;
  onReset: () => void;
}

const COLORS = ['#10b981', '#ef4444', '#6b7280', '#f59e0b', '#3b82f6'];

export default function ClassificationResults({ resultId, dataset, onReset }: ClassificationResultsProps) {
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  useEffect(() => {
    if (!resultId) {
      setLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const response = await fetch(`${supabaseUrl}/rest/v1/classification_results?id=eq.${resultId}&select=*`, {
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
          },
        });

        if (!response.ok) throw new Error('Failed to fetch results');

        const data = await response.json();
        if (data && data[0]) {
          setResult(data[0]);
          if (data[0].status !== 'complete') {
            setTimeout(() => fetchResult(), 2000);
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load results');
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, [resultId, supabaseUrl, supabaseKey]);

  if (!resultId) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>Upload and classify a CSV to see results here</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <XCircle className="h-12 w-12 mx-auto mb-4" />
        <p>{error}</p>
        <Button variant="outline" className="mt-4" onClick={onReset}>Try Again</Button>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-4 animate-pulse" />
        <p>Processing...</p>
      </div>
    );
  }

  if (result.status === 'processing') {
    const progress = Math.round((result.processed_rows / result.total_rows) * 100);
    return (
      <div className="text-center py-12">
        <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-emerald-500" />
        <p className="text-lg font-medium">Classifying {dataset?.name || 'dataset'}</p>
        <p className="text-muted-foreground mt-2">{result.processed_rows} / {result.total_rows} rows</p>
        <div className="max-w-xs mx-auto mt-4">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    );
  }

  if (result.status !== 'complete') {
    return (
      <div className="text-center py-12">
        <XCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
        <p className="text-red-500">Classification failed</p>
        <Button variant="outline" className="mt-4" onClick={onReset}>Try Again</Button>
      </div>
    );
  }

  const distributionData = Object.entries(result.category_distribution || {})
    .filter(([, count]) => count > 0)
    .map(([category, count], i) => ({
      name: category,
      value: count,
      fill: COLORS[i % COLORS.length],
    }));

  const paginatedResults = result.results?.slice(currentPage * pageSize, (currentPage + 1) * pageSize) || [];
  const totalPages = Math.ceil((result.results?.length || 0) / pageSize);

  const exportCSV = () => {
    if (!result.results?.length) return;
    const headers = ['text', 'predicted_category', 'confidence'];
    if (dataset?.label_column) headers.push('actual_category', 'correct');

    const rows = result.results.map(r => {
      const row = [
        `"${r.text.replace(/"/g, '""')}"`,
        r.predicted,
        r.confidence,
      ];
      if (dataset?.label_column) {
        row.push(r.actual || '', r.actual === r.predicted ? 'Yes' : 'No');
      }
      return row.join(',');
    });

    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `classification_results_${resultId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <Card className="border-emerald-200 dark:border-emerald-900">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              Classification Complete
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={exportCSV}>
                <Download className="h-4 w-4 mr-2" /> Export CSV
              </Button>
              <Button variant="outline" size="sm" onClick={onReset}>
                <RotateCcw className="h-4 w-4 mr-2" /> Classify New
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{result.total_rows.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Rows Classified</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{result.avg_latency_ms}ms</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{result.model}</div>
              <div className="text-xs text-muted-foreground">Model</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{distributionData.length}</div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
          </div>

          {/* Accuracy Metrics - only shown if ground truth available */}
          {result.accuracy !== null && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-medium">Performance Metrics</span>
                <Badge variant="secondary" className="text-xs">Ground Truth Available</Badge>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-xl font-bold text-emerald-600">{result.accuracy}%</div>
                  <div className="text-xs text-muted-foreground">Accuracy</div>
                </div>
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-xl font-bold text-emerald-600">{result.precision}%</div>
                  <div className="text-xs text-muted-foreground">Precision</div>
                </div>
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-xl font-bold text-emerald-600">{result.recall}%</div>
                  <div className="text-xs text-muted-foreground">Recall</div>
                </div>
                <div className="text-center rounded-lg bg-muted p-3">
                  <div className="text-xl font-bold text-emerald-600">{result.f1_score}%</div>
                  <div className="text-xs text-muted-foreground">F1 Score</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={distributionData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Percentage Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Classification Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paginatedResults.map((r, i) => (
              <div key={i} className={`rounded-lg border p-3 ${r.actual && r.actual !== r.predicted ? 'border-red-200 bg-red-50/30 dark:border-red-900/50 dark:bg-red-950/10' : 'border-border/50'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{r.text}</p>
                    {dataset?.label_column && r.actual && (
                      <p className="text-xs text-muted-foreground mt-1">Actual: {r.actual}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        {r.predicted}
                      </Badge>
                      {r.actual && r.actual !== r.predicted && (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{r.confidence}% conf</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => setCurrentPage(p => p - 1)}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage + 1} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages - 1}
                onClick={() => setCurrentPage(p => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
