'use client';

import { useState } from 'react';
import { Bot, Send, Loader2, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const starterQuestions = [
  'What model should I use for text classification?',
  'How do I improve my classifier accuracy?',
  'Can I export my trained model?',
];

const responses: Record<string, string> = {
  'What model should I use for text classification?':
    'For text classification, I recommend starting with DistilBERT for a balance of speed and accuracy. If you need higher accuracy and can tolerate slightly higher latency, RoBERTa is an excellent choice. For simple tasks like sentiment analysis, even a fine-tuned GPT-2 Small can work well.',
  'How do I improve my classifier accuracy?':
    'Here are key strategies: 1) Increase your training data quality and quantity, 2) Use data augmentation techniques, 3) Try a larger base model, 4) Tune hyperparameters like learning rate and epochs, 5) Use cross-validation to detect overfitting, 6) Add regularization (dropout, weight decay).',
  'Can I export my trained model?':
    'Yes! ClassifyAI supports exporting trained models in multiple formats: ONNX for cross-platform deployment, PyTorch for research, and TensorFlow SavedModel for production. You can also deploy directly via our API with zero configuration.',
};

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1200));
    const response = responses[text] || 'Great question! I can help you with model selection, data preparation, training strategies, and deployment. Could you provide more details about your specific use case?';
    setMessages((prev) => [...prev, { role: 'assistant', content: response }]);
    setLoading(false);
  };

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI
            <span className="text-emerald-600 dark:text-emerald-400"> Assistant</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Ask questions about classification, models, and best practices.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bot className="h-5 w-5 text-emerald-500" /> ClassifyAI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="min-h-[300px] max-h-[400px] overflow-y-auto space-y-4 mb-4">
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Bot className="mb-3 h-12 w-12 text-emerald-500/50" />
                    <p className="text-sm text-muted-foreground mb-4">Ask me anything about AI classification</p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {starterQuestions.map((q) => (
                        <Button key={q} variant="outline" size="sm" className="text-xs" onClick={() => send(q)}>
                          {q}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-lg px-4 py-2.5 text-sm ${m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-muted'}`}>
                      {m.content}
                    </div>
                    {m.role === 'user' && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg bg-muted px-4 py-2.5">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
                <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask a question..." disabled={loading} className="flex-1" />
                <Button type="submit" disabled={loading || !input.trim()} className="bg-emerald-600 hover:bg-emerald-700">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
