'use client';

import { Shield, Server, Users, Key, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const capabilities = [
  { icon: Shield, title: 'SOC 2 Type II', desc: 'Certified compliance with annual audits and continuous monitoring.' },
  { icon: Key, title: 'SSO / SAML', desc: 'Integrate with Okta, Azure AD, and other identity providers.' },
  { icon: Server, title: 'On-Premise', desc: 'Deploy in your own VPC with full data sovereignty.' },
  { icon: Users, title: 'Role-Based Access', desc: 'Granular permissions for teams, projects, and models.' },
  { icon: FileText, title: 'Audit Logging', desc: 'Complete audit trail for every prediction and configuration change.' },
];

export default function EnterpriseDashboard() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Enterprise-grade
            <span className="text-emerald-600 dark:text-emerald-400"> security</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Built for organizations that demand the highest standards of security and compliance.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <Card key={c.title} className="border-border/50 transition-all duration-300 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5">
              <CardContent className="p-6">
                <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
