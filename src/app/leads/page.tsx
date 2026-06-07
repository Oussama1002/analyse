"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { CustomLineChart } from "@/components/charts/line-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatPercent } from "@/lib/utils";
import { fr, labelMonth } from "@/lib/i18n/fr";
import { Target, ArrowDownLeft, ArrowUpRight, Filter } from "lucide-react";

export default function LeadsPage() {
  const { leads } = mockData;

  const funnelData = [
    { name: fr.leads.totalLeadsLabel, value: leads.totalLeads },
    { name: "MQL", value: leads.mql },
    { name: "SQL", value: leads.sql },
    { name: fr.leads.converted, value: leads.convertedLeads },
  ];

  const evolutionData = leads.evolution.map((d) => ({
    name: labelMonth(d.month),
    Prospects: d.leads,
    MQL: d.mql,
    SQL: d.sql,
  }));

  const mqlRate = ((leads.mql / leads.totalLeads) * 100).toFixed(1);
  const sqlRate = ((leads.sql / leads.mql) * 100).toFixed(1);

  return (
    <DashboardLayout title={fr.leads.title} description={fr.leads.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KPICard title={fr.leads.totalLeads} value={String(leads.totalLeads)} icon={Target} />
          <KPICard
            title={fr.leads.inbound}
            value={String(leads.inboundLeads)}
            icon={ArrowDownLeft}
            subtitle={`${((leads.inboundLeads / leads.totalLeads) * 100).toFixed(0)}% ${fr.common.ofTotal}`}
          />
          <KPICard
            title={fr.leads.outbound}
            value={String(leads.outboundLeads)}
            icon={ArrowUpRight}
            subtitle={`${((leads.outboundLeads / leads.totalLeads) * 100).toFixed(0)}% ${fr.common.ofTotal}`}
          />
          <KPICard title="MQL" value={String(leads.mql)} icon={Filter} subtitle={`${mqlRate}% ${fr.leads.ofLeads}`} />
          <KPICard
            title={fr.leads.conversionRate}
            value={formatPercent(leads.conversionRate)}
            subtitle={fr.dashboard.leadToClient}
            trend={{ value: fr.leads.aboveBenchmark, positive: true }}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.leads.conversionFunnel} description={fr.leads.conversionFunnelDesc}>
            <FunnelChart data={funnelData} />
          </ChartCard>

          <ChartCard title={fr.leads.evolution} description={fr.leads.evolutionDesc}>
            <CustomLineChart
              data={evolutionData}
              lines={[
                { dataKey: "Prospects", name: fr.dashboard.funnelLeads, color: "#6366f1" },
                { dataKey: "MQL", name: "MQL", color: "#8b5cf6" },
                { dataKey: "SQL", name: "SQL", color: "#06b6d4" },
              ]}
            />
          </ChartCard>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {[
            { label: fr.leads.leadToMql, rate: mqlRate },
            { label: fr.leads.mqlToSql, rate: sqlRate },
            { label: fr.leads.sqlToClient, rate: ((leads.convertedLeads / leads.sql) * 100).toFixed(1) },
            { label: fr.leads.overallConversion, rate: String(leads.conversionRate) },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-950">
              <p className="text-sm text-zinc-500">{item.label}</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{item.rate}%</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
