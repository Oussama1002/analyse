"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Loader2 } from "lucide-react";
import { generateBusinessInsights } from "@/lib/insights/engine";
import { mockData } from "@/lib/data/mock-data";
import type { BusinessInsights } from "@/lib/types";
import { fr } from "@/lib/i18n/fr";

export function InsightsButton() {
  const [insights, setInsights] = useState<BusinessInsights | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setInsights(generateBusinessInsights(mockData));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Button onClick={handleGenerate} disabled={loading} size="lg" className="gap-2">
        {loading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Sparkles className="h-5 w-5" />
        )}
        {fr.insights.generate}
      </Button>

      {insights && (
        <div className="grid gap-4 md:grid-cols-2">
          <InsightCard title={fr.insights.strengths} items={insights.strengths} variant="success" />
          <InsightCard title={fr.insights.weaknesses} items={insights.weaknesses} variant="warning" />
          <InsightCard title={fr.insights.opportunities} items={insights.opportunities} variant="default" />
          <InsightCard title={fr.insights.risks} items={insights.risks} variant="destructive" />
        </div>
      )}
    </div>
  );
}

function InsightCard({
  title,
  items,
  variant,
}: {
  title: string;
  items: string[];
  variant: "default" | "success" | "warning" | "destructive";
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge variant={variant}>{items.length}</Badge>
        </div>
        <CardDescription>{fr.insights.aiGenerated}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
              {item}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
