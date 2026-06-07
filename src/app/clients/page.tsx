"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomPieChart } from "@/components/charts/pie-chart";
import { CustomBarChart } from "@/components/charts/bar-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatPercent } from "@/lib/utils";
import { fr, labelClientType } from "@/lib/i18n/fr";
import { Users, UserCheck, RefreshCw } from "lucide-react";

export default function ClientsPage() {
  const { clients } = mockData;

  const segmentationData = Object.entries(clients.clientsByType).map(
    ([name, value]) => ({ name: labelClientType(name as keyof typeof clients.clientsByType), value })
  );

  const activeVsClosed = [
    { name: fr.clients.status, [fr.clients.active]: clients.activeClients, [fr.clients.closedLabel]: clients.closedClients },
  ];

  const recurringData = [
    { name: fr.clients.recurring, value: clients.recurringClients },
    { name: fr.clients.oneShot, value: clients.oneShotClients },
  ];

  return (
    <DashboardLayout title={fr.clients.title} description={fr.clients.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard title={fr.clients.totalClients} value={String(clients.totalClients)} icon={Users} />
          <KPICard
            title={fr.clients.activeClients}
            value={String(clients.activeClients)}
            icon={UserCheck}
            subtitle={`${clients.closedClients} ${fr.clients.closed}`}
          />
          <KPICard
            title={fr.clients.retentionRate}
            value={formatPercent(clients.retentionRate)}
            icon={RefreshCw}
            trend={{ value: fr.clients.targetRetention, positive: false }}
          />
          <KPICard
            title={fr.clients.recurringClients}
            value={String(clients.recurringClients)}
            subtitle={`${clients.oneShotClients} ${fr.clients.oneShotProjects}`}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.clients.segmentation} description={fr.clients.segmentationDesc}>
            <CustomPieChart data={segmentationData} />
          </ChartCard>

          <ChartCard title={fr.clients.activeVsClosed} description={fr.clients.activeVsClosedDesc}>
            <CustomBarChart
              data={activeVsClosed}
              bars={[
                { dataKey: fr.clients.active, name: fr.clients.active, color: "#10b981" },
                { dataKey: fr.clients.closedLabel, name: fr.clients.closedLabel, color: "#ef4444" },
              ]}
            />
          </ChartCard>

          <ChartCard title={fr.clients.recurringVsOneShot} description={fr.clients.recurringVsOneShotDesc} className="lg:col-span-2">
            <div className="mx-auto max-w-md">
              <CustomPieChart data={recurringData} innerRadius={70} outerRadius={110} />
            </div>
          </ChartCard>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-4 text-base font-semibold">{fr.clients.breakdownByType}</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {Object.entries(clients.clientsByType).map(([type, count]) => (
              <div key={type} className="rounded-lg border border-zinc-100 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">{labelClientType(type as keyof typeof clients.clientsByType)}</p>
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs text-zinc-400">
                  {((count / clients.totalClients) * 100).toFixed(0)}% {fr.common.ofPortfolio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
