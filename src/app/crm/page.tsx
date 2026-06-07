"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDroppable } from "@dnd-kit/core";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ChartCard } from "@/components/shared/chart-card";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { initialCRMLeads, PIPELINE_STAGES } from "@/lib/data/crm-leads";
import type { CRMLead, PipelineStage } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { fr, labelChannel, labelStage } from "@/lib/i18n/fr";
import { GripVertical, Building2, Mail, Phone, Clock } from "lucide-react";

const STORAGE_KEY = "softnovation-crm-leads";

function SortableLeadCard({ lead, onClick }: { lead: CRMLead; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: lead.id, data: { lead } });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "rounded-lg border border-zinc-200 bg-white p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow dark:border-zinc-700 dark:bg-zinc-900",
        isDragging && "opacity-50 shadow-lg"
      )}
      onClick={onClick}
    >
      <div className="flex items-start gap-2">
        <button className="mt-0.5 cursor-grab text-zinc-400 hover:text-zinc-600 active:cursor-grabbing" {...attributes} {...listeners} onClick={(e) => e.stopPropagation()}>
          <GripVertical className="h-4 w-4" />
        </button>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{lead.name}</p>
          <p className="text-xs text-zinc-500 truncate">{lead.company}</p>
          <div className="mt-2 flex items-center justify-between">
            <Badge variant="secondary" className="text-[10px]">{labelChannel(lead.source)}</Badge>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">{formatCurrency(lead.value)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ stage, leads, onLeadClick }: { stage: PipelineStage; leads: CRMLead[]; onLeadClick: (lead: CRMLead) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  const stageColors: Record<string, string> = {
    New: "border-t-blue-500",
    Contacted: "border-t-cyan-500",
    "Qualified (MQL)": "border-t-violet-500",
    SQL: "border-t-indigo-500",
    "Proposal sent": "border-t-amber-500",
    Won: "border-t-emerald-500",
    Lost: "border-t-red-500",
  };

  return (
    <div ref={setNodeRef} className={cn("flex w-72 shrink-0 flex-col rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 border-t-4", stageColors[stage], isOver && "ring-2 ring-indigo-500 ring-offset-2")}>
      <div className="flex items-center justify-between p-3 border-b border-zinc-200 dark:border-zinc-800">
        <h3 className="text-sm font-semibold">{labelStage(stage)}</h3>
        <Badge variant="secondary">{leads.length}</Badge>
      </div>
      <SortableContext items={leads.map((l) => l.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-2 overflow-y-auto p-3 min-h-[200px] max-h-[calc(100vh-280px)]">
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} onClick={() => onLeadClick(lead)} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

function LeadDetailModal({ lead, open, onClose }: { lead: CRMLead | null; open: boolean; onClose: () => void }) {
  if (!lead) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-lg" onClose={onClose}>
        <DialogHeader>
          <DialogTitle>{lead.name}</DialogTitle>
          <DialogDescription>{lead.company}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge>{labelStage(lead.stage)}</Badge>
            <Badge variant="secondary">{labelChannel(lead.source)}</Badge>
            <Badge variant="success">{formatCurrency(lead.value)}</Badge>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><Building2 className="h-4 w-4" />{lead.company}</div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><Mail className="h-4 w-4" />{lead.email}</div>
            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"><Phone className="h-4 w-4" />{lead.phone}</div>
          </div>
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold"><Clock className="h-4 w-4" />{fr.common.activityLog}</h4>
            <div className="space-y-3">
              {lead.activities.map((activity) => (
                <div key={activity.id} className="border-l-2 border-indigo-200 pl-3 dark:border-indigo-800">
                  <p className="text-sm">{activity.action}</p>
                  <p className="text-xs text-zinc-500">{activity.date} · {activity.user}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function CRMPage() {
  const [leads, setLeads] = useState<CRMLead[]>(initialCRMLeads);
  const [activeLead, setActiveLead] = useState<CRMLead | null>(null);
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try { setLeads(JSON.parse(stored)); } catch { /* defaults */ }
    }
  }, []);

  const saveLeads = useCallback((updated: CRMLead[]) => {
    setLeads(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveLead(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = active.id as string;
    let newStage = over.id as PipelineStage;

    if (!PIPELINE_STAGES.includes(newStage)) {
      const overLead = leads.find((l) => l.id === over.id);
      if (overLead) newStage = overLead.stage;
      else return;
    }

    const updated = leads.map((lead) => {
      if (lead.id !== leadId) return lead;
      if (lead.stage === newStage) return lead;
      return {
        ...lead,
        stage: newStage,
        activities: [...lead.activities, {
          id: `a-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          action: fr.crm.movedFromTo(labelStage(lead.stage), labelStage(newStage)),
          user: "Admin",
        }],
      };
    });

    saveLeads(updated);
  };

  const pipelineFunnel = PIPELINE_STAGES.map((stage) => ({
    name: labelStage(stage),
    value: leads.filter((l) => l.stage === stage).length,
  })).filter((s) => s.value > 0);

  return (
    <DashboardLayout title={fr.crm.title} description={fr.crm.description}>
      <div className="space-y-6">
        <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={(e) => { const l = leads.find((x) => x.id === e.active.id); if (l) setActiveLead(l); }} onDragEnd={handleDragEnd}>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {PIPELINE_STAGES.map((stage) => (
              <KanbanColumn key={stage} stage={stage} leads={leads.filter((l) => l.stage === stage)} onLeadClick={(lead) => { setSelectedLead(lead); setModalOpen(true); }} />
            ))}
          </div>
          <DragOverlay>
            {activeLead && (
              <div className="rounded-lg border border-indigo-300 bg-white p-3 shadow-xl dark:bg-zinc-900 w-72">
                <p className="font-medium text-sm">{activeLead.name}</p>
                <p className="text-xs text-zinc-500">{activeLead.company}</p>
              </div>
            )}
          </DragOverlay>
        </DndContext>
        <ChartCard title={fr.crm.pipelineFunnel} description={fr.crm.pipelineFunnelDesc}>
          <FunnelChart data={pipelineFunnel} height={280} />
        </ChartCard>
      </div>
      <LeadDetailModal lead={selectedLead} open={modalOpen} onClose={() => setModalOpen(false)} />
    </DashboardLayout>
  );
}
