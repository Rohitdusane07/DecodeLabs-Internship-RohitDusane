'use client';

import { useState, useCallback } from 'react';
import { Upload, FileText, Image, Mic, File, X, CheckCircle2, Play, Loader2, AlertCircle, Columns } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { parseCSV, detectTextColumn, detectLabelColumn, validateColumns, type ParsedCSV } from '@/lib/csv-parser';
import ClassificationResults from './classification-results';

interface UploadedFile {
  name: string;
  size: number;
  parsed: ParsedCSV | null;
  textColumn: string | null;
  labelColumn: string | null;
  status: 'uploading' | 'parsing' | 'ready' | 'processing' | 'error';
  error?: string;
  datasetId?: string;
  resultId?: string;
}

const models = [
  { id: 'distilbert', name: 'DistilBERT', desc: 'Fast & accurate' },
  { id: 'bert-base', name: 'BERT Base', desc: 'Balanced' },
  { id: 'roberta', name: 'RoBERTa', desc: 'High accuracy' },
];

export default function UploadCenter() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [selectedModel, setSelectedModel] = useState('distilbert');
  const [dragActive, setDragActive] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const handleFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList) return;
    const newFiles: UploadedFile[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (!file.name.toLowerCase().endsWith('.csv')) continue;

      newFiles.push({
        name: file.name,
        size: file.size,
        parsed: null,
        textColumn: null,
        labelColumn: null,
        status: 'parsing',
      });
    }

    setFiles(prev => [...prev, ...newFiles]);

    for (let i = 0; i < newFiles.length; i++) {
      const file = fileList[i];
      if (!file.name.toLowerCase().endsWith('.csv')) continue;

      try {
        const text = await file.text();
        const parsed = parseCSV(text);

        if (parsed.errors.length > 0) {
          setFiles(prev => prev.map((f, idx) =>
            idx === prev.length - newFiles.length + i
              ? { ...f, status: 'error', error: parsed.errors[0] }
              : f
          ));
          continue;
        }

        if (parsed.rowCount === 0) {
          setFiles(prev => prev.map((f, idx) =>
            idx === prev.length - newFiles.length + i
              ? { ...f, status: 'error', error: 'No data rows found' }
              : f
          ));
          continue;
        }

        const textColumn = detectTextColumn(parsed.columns);
        const labelColumn = detectLabelColumn(parsed.columns);
        const validation = textColumn ? validateColumns(parsed.data, textColumn) : { valid: 0, empty: 0 };

        if (!textColumn || validation.valid === 0) {
          setFiles(prev => prev.map((f, idx) =>
            idx === prev.length - newFiles.length + i
              ? { ...f, status: 'error', error: 'No valid text column found' }
              : f
          ));
          continue;
        }

        setFiles(prev => prev.map((f, idx) =>
          idx === prev.length - newFiles.length + i
            ? {
                ...f,
                parsed,
                textColumn,
                labelColumn,
                status: 'ready',
              }
            : f
        ));
      } catch (err) {
        setFiles(prev => prev.map((f, idx) =>
          idx === prev.length - newFiles.length + i
            ? { ...f, status: 'error', error: 'Failed to parse file' }
            : f
        ));
      }
    }
  }, []);

  const removeFile = (idx: number) => {
    setFiles(prev => prev.filter((_, i) => i !== idx));
    if (files.length === 1) {
      setShowResults(false);
    }
  };

  const startClassification = async (fileIdx: number) => {
    const file = files[fileIdx];
    if (!file || !file.parsed || !file.textColumn) return;

    setFiles(prev => prev.map((f, i) =>
      i === fileIdx ? { ...f, status: 'processing' } : f
    ));

    try {
      // Save dataset to Supabase
      const datasetRes = await fetch(`${supabaseUrl}/rest/v1/datasets`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify({
          name: file.name,
          user_id: 'demo-user',
          rows_count: file.parsed.rowCount,
          columns: file.parsed.columns,
          data: file.parsed.data,
          text_column: file.textColumn,
          label_column: file.labelColumn,
          status: 'ready',
        }),
      });

      if (!datasetRes.ok) throw new Error('Failed to save dataset');
      const [savedDataset] = await datasetRes.json();
      const datasetId = savedDataset.id;

      setFiles(prev => prev.map((f, i) =>
        i === fileIdx ? { ...f, datasetId } : f
      ));

      // Start classification
      const classifyRes = await fetch(`${supabaseUrl}/functions/v1/classify-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          datasetId,
          model: selectedModel,
        }),
      });

      if (!classifyRes.ok) throw new Error('Failed to start classification');
      const classifyData = await classifyRes.json();

      setFiles(prev => prev.map((f, i) =>
        i === fileIdx ? { ...f, resultId: classifyData.resultId, status: 'processing' } : f
      ));

      setShowResults(true);
    } catch (err) {
      setFiles(prev => prev.map((f, i) =>
        i === fileIdx ? { ...f, status: 'error', error: 'Failed to start classification' } : f
      ));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const readyFiles = files.filter(f => f.status === 'ready');
  const processingFiles = files.filter(f => f.status === 'processing');
  const currentFile = processingFiles[0] || readyFiles[0];

  if (showResults && currentFile?.resultId) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <ClassificationResults
              resultId={currentFile.resultId}
              dataset={{
                name: currentFile.name,
                text_column: currentFile.textColumn || '',
                label_column: currentFile.labelColumn,
              }}
              onReset={() => {
                setFiles([]);
                setShowResults(false);
              }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Upload your
            <span className="text-emerald-600 dark:text-emerald-400"> training data</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Upload a CSV file with text data. We'll classify each row and show real results.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5 text-emerald-500" />
                CSV Classification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors ${
                  dragActive
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                    : 'border-border/50 hover:border-emerald-500/50'
                }`}
              >
                <FileText className="mb-4 h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium">Drag & drop CSV files here</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  First column with text will be auto-detected, or include a &quot;text&quot; column
                </p>
                <label className="mt-4 cursor-pointer">
                  <span className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors">
                    <Upload className="h-4 w-4" /> Browse Files
                  </span>
                  <input
                    type="file"
                    accept=".csv"
                    multiple
                    className="hidden"
                    onChange={handleFileInput}
                  />
                </label>
              </div>

              {/* Model Selection */}
              <div className="space-y-2">
                <Label>Classification Model</Label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {models.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} - {m.desc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="space-y-3 pt-2">
                  {files.map((f, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border p-4 ${
                        f.status === 'error'
                          ? 'border-red-200 bg-red-50/30 dark:border-red-900/50 dark:bg-red-950/10'
                          : f.status === 'processing'
                          ? 'border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-950/10'
                          : 'border-border/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <FileText className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium truncate">{f.name}</span>
                              <span className="text-xs text-muted-foreground">({formatSize(f.size)})</span>
                            </div>

                            {f.status === 'parsing' && (
                              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                <Loader2 className="h-3 w-3 animate-spin" /> Parsing...
                              </p>
                            )}

                            {f.status === 'error' && (
                              <p className="text-xs text-red-600 truncate">{f.error}</p>
                            )}

                            {f.parsed && f.status === 'ready' && (
                              <div className="mt-2 space-y-2">
                                <p className="text-xs text-muted-foreground">
                                  {f.parsed.rowCount.toLocaleString()} rows, {f.parsed.columns.length} columns
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <div className="flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-950/50 px-2 py-1 rounded">
                                    <Columns className="h-3 w-3 text-emerald-500" />
                                    Text: <span className="font-medium">{f.textColumn}</span>
                                  </div>
                                  {f.labelColumn && (
                                    <div className="flex items-center gap-1 text-xs bg-blue-50 dark:bg-blue-950/50 px-2 py-1 rounded">
                                      <Columns className="h-3 w-3 text-blue-500" />
                                      Label: <span className="font-medium">{f.labelColumn}</span>
                                      <span className="text-muted-foreground">(accuracy will be calculated)</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {f.status === 'processing' && (
                              <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
                                <Loader2 className="h-3 w-3 animate-spin" /> Processing...
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="shrink-0">
                          {f.status === 'ready' && (
                            <Button
                              size="sm"
                              onClick={() => startClassification(i)}
                              className="bg-emerald-600 hover:bg-emerald-700 gap-1"
                            >
                              <Play className="h-3 w-3" /> Classify
                            </Button>
                          )}
                          {(f.status === 'parsing' || f.status === 'processing') && (
                            <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
                          )}
                          {f.status === 'error' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(i)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Help */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  <strong>CSV Format:</strong> Include a column named &quot;text&quot;, &quot;content&quot;, or &quot;review&quot;.
                  Optionally add a &quot;label&quot; or &quot;category&quot; column for accuracy metrics.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
