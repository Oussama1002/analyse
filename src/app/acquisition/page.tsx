"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomBarChart } from "@/components/charts/bar-chart";
import { CustomPieChart } from "@/components/charts/pie-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatPercent } from "@/lib/utils";
import { fr, labelChannel } from "@/lib/i18n/fr";
import { Network, Scale, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AcquisitionPage() {
  const { acquisition } = mockData;

  const channelBarData = acquisition.channels.map((c) => ({
    name: labelChannel(c.name),
    [fr.common.clients]: c.count,
  }));

  const pieData = acquisition.channels
    .filter((c) => c.count > 0)
    .map((c) => ({ name: labelChannel(c.name), value: c.count }));

  const scalabilityColor =
    acquisition.scalabilityScore >= 50 ? "success" : acquisition.scalabilityScore >= 30 ? "warning" : "destructive";

  return (
    <DashboardLayout title={fr.acquisition.title} description={fr.acquisition.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <KPICard
            title={fr.acquisition.founderDependency}
            value={formatPercent(acquisition.founderDependency)}
            icon={Network}
            subtitle={fr.acquisition.founderDependencySub}
            trend={{ value: fr.acquisition.highRiskDiversify, positive: false }}
          />
          <KPICard
            title={fr.acquisition.scalabilityScore}
            value={`${acquisition.scalabilityScore}/100`}
            icon={Scale}
            subtitle={fr.acquisition.scalabilitySub}
          />
          <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-zinc-500">{fr.acquisition.riskLevel}</p>
                <Badge variant={scalabilityColor as "success" | "warning" | "destructive"}>
                  {acquisition.founderDependency > 60 ? fr.common.high : fr.common.medium}
                </Badge>
                <p className="text-xs text-zinc-500">{fr.acquisition.founderDominates}</p>
              </div>
              <div className="rounded-lg bg-amber-50 p-2.5 dark:bg-amber-950/50">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.acquisition.channels} description={fr.acquisition.channelsDesc}>
            <CustomBarChart
              data={channelBarData}
              bars={[{ dataKey: fr.common.clients, name: fr.common.clients, color: "#6366f1" }]}
              layout="horizontal"
              height={320}
            />
          </ChartCard>

          <ChartCard title={fr.acquisition.distribution} description={fr.acquisition.distributionDesc}>
            <CustomPieChart data={pieData} />
          </ChartCard>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-4 text-base font-semibold">{fr.acquisition.channelDetails}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-3 text-left font-medium text-zinc-500">{fr.common.channel}</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">{fr.common.clients}</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">{fr.common.share}</th>
                  <th className="pb-3 text-left font-medium text-zinc-500 pl-4">{fr.common.status}</th>
                </tr>
              </thead>
              <tbody>
                {acquisition.channels.map((channel) => (
                  <tr key={channel.name} className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-3 font-medium">{labelChannel(channel.name)}</td>
                    <td className="py-3 text-right">{channel.count}</td>
                    <td className="py-3 text-right">{channel.percentage}%</td>
                    <td className="py-3 pl-4">
                      <Badge variant={channel.count > 0 ? (channel.percentage > 30 ? "warning" : "success") : "secondary"}>
                        {channel.count > 0 ? fr.common.active : fr.common.inactive}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
