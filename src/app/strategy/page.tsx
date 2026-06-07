"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { initialStrategyDocs } from "@/lib/data/strategy-docs";
import type { StrategyDocument, StrategyDocType } from "@/lib/types";
import { fr } from "@/lib/i18n/fr";
import { FileText, Edit, History, Tag, Save, X } from "lucide-react";

const STORAGE_KEY = "softnovation-strategy-docs";

const typeLabels: Record<StrategyDocType, string> = {
  ICP: "ICP",
  "Pricing strategy": "Stratégie tarifaire",
  "Offer structure": "Structure d'offre",
  "Market positioning": "Positionnement marché",
  "Sales strategy": "Stratégie commerciale",
};

export default function StrategyPage() {
  const [docs, setDocs] = useState<StrategyDocument[]>(initialStrategyDocs);
  const [selectedDoc, setSelectedDoc] = useState<StrategyDocument | null>(null);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setDocs(JSON.parse(stored)); } catch { /* defaults */ }
    }
  }, []);

  const saveDocs = (updated: StrategyDocument[]) => {
    setDocs(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const openDoc = (doc: StrategyDocument) => {
    setSelectedDoc(doc);
    setEditContent(doc.content);
    setEditTags(doc.tags.join(", "));
    setEditing(false);
    setShowHistory(false);
  };

  const handleSave = () => {
    if (!selectedDoc) return;
    const newVersion = {
      id: `v-${Date.now()}`,
      content: fr.strategy.updatedContent(editContent.slice(0, 80)),
      createdAt: new Date().toISOString().split("T")[0],
      author: "Admin",
    };
    const updated = docs.map((doc) => {
      if (doc.id !== selectedDoc.id) return doc;
      return {
        ...doc,
        content: editContent,
        tags: editTags.split(",").map((t) => t.trim()).filter(Boolean),
        updatedAt: new Date().toISOString().split("T")[0],
        versions: [...doc.versions, newVersion],
      };
    });
    saveDocs(updated);
    setSelectedDoc(updated.find((d) => d.id === selectedDoc.id)!);
    setEditing(false);
  };

  const typeColors: Record<string, "default" | "secondary" | "success" | "warning"> = {
    ICP: "default",
    "Pricing strategy": "success",
    "Offer structure": "secondary",
    "Market positioning": "warning",
    "Sales strategy": "default",
  };

  return (
    <DashboardLayout title={fr.strategy.title} description={fr.strategy.description}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-1">
          <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wide">{fr.common.documents}</h3>
          {docs.map((doc) => (
            <button
              key={doc.id}
              onClick={() => openDoc(doc)}
              className={`w-full rounded-xl border p-4 text-left transition-colors hover:border-indigo-300 dark:hover:border-indigo-700 ${
                selectedDoc?.id === doc.id ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950/30" : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
              }`}
            >
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 shrink-0 text-indigo-600 mt-0.5" />
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{doc.title}</p>
                  <Badge variant={typeColors[doc.type] ?? "secondary"} className="mt-1 text-[10px]">{typeLabels[doc.type]}</Badge>
                  <p className="mt-1 text-xs text-zinc-500">{fr.common.updated} {doc.updatedAt} · {doc.versions.length} {fr.common.versions}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selectedDoc ? (
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>{selectedDoc.title}</CardTitle>
                    <CardDescription className="mt-1">{fr.common.by} {selectedDoc.author} · {fr.common.lastUpdated} {selectedDoc.updatedAt}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowHistory(!showHistory)}>
                      <History className="h-4 w-4 mr-1" />{fr.common.history}
                    </Button>
                    {!editing ? (
                      <Button size="sm" onClick={() => setEditing(true)}><Edit className="h-4 w-4 mr-1" />{fr.common.edit}</Button>
                    ) : (
                      <>
                        <Button size="sm" onClick={handleSave}><Save className="h-4 w-4 mr-1" />{fr.common.save}</Button>
                        <Button variant="ghost" size="sm" onClick={() => { setEditing(false); setEditContent(selectedDoc.content); }}><X className="h-4 w-4" /></Button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedDoc.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs"><Tag className="h-3 w-3 mr-1" />{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                {showHistory ? (
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold">{fr.common.versionHistory}</h4>
                    {[...selectedDoc.versions].reverse().map((version) => (
                      <div key={version.id} className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
                        <div className="flex justify-between text-xs text-zinc-500 mb-1"><span>{version.author}</span><span>{version.createdAt}</span></div>
                        <p className="text-sm">{version.content}</p>
                      </div>
                    ))}
                  </div>
                ) : editing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">{fr.common.tagsLabel}</label>
                      <Input value={editTags} onChange={(e) => setEditTags(e.target.value)} placeholder={fr.common.tagsPlaceholder} />
                    </div>
                    <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} className="min-h-[400px] font-mono text-sm" />
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{selectedDoc.content}</pre>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
              <p className="text-zinc-500">{fr.common.selectDocument}</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
