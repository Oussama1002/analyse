"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomPieChart } from "@/components/charts/pie-chart";
import { CustomLineChart } from "@/components/charts/line-chart";
import { FunnelChart } from "@/components/charts/funnel-chart";
import { InsightsButton } from "@/components/insights/insights-button";
import { mockData } from "@/lib/data/mock-data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { fr, labelChannel, labelClientType } from "@/lib/i18n/fr";
import {
  Users,
  Target,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Wallet,
} from "lucide-react";

export default function DashboardPage() {
  const { kpis, clients, acquisition, leads, financial } = mockData;

  const segmentationData = Object.entries(clients.clientsByType).map(
    ([name, value]) => ({ name: labelClientType(name as keyof typeof clients.clientsByType), value })
  );

  const acquisitionData = acquisition.channels
    .filter((c) => c.count > 0)
    .map((c) => ({ name: labelChannel(c.name), value: c.count }));

  const funnelData = [
    { name: fr.dashboard.funnelLeads, value: leads.totalLeads },
    { name: "MQL", value: leads.mql },
    { name: "SQL", value: leads.sql },
    { name: fr.dashboard.funnelClients, value: leads.convertedLeads },
  ];

  const revenueVsCost = financial.revenueVsCost.map((d) => ({
    name: d.month,
    [fr.common.revenue]: d.revenue / 1000,
    [fr.common.cost]: d.cost / 1000,
  }));

  return (
    <DashboardLayout
      title={fr.dashboard.title}
      description={fr.dashboard.description}
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KPICard
            title={fr.dashboard.totalClients}
            value={String(kpis.totalClients)}
            icon={Users}
            trend={{ value: fr.dashboard.trendQuarter, positive: true }}
          />
          <KPICard
            title={fr.dashboard.totalLeads}
            value={String(kpis.totalLeads)}
            icon={Target}
            trend={{ value: fr.dashboard.trendJune, positive: true }}
          />
          <KPICard
            title={fr.dashboard.conversionRate}
            value={formatPercent(kpis.conversionRate)}
            icon={TrendingUp}
            subtitle={fr.dashboard.leadToClient}
          />
          <KPICard
            title={fr.dashboard.avgCac}
            value={formatCurrency(kpis.cacAverage)}
            icon={DollarSign}
          />
          <KPICard
            title={fr.dashboard.retentionRate}
            value={formatPercent(kpis.retentionRate)}
            icon={RefreshCw}
          />
          <KPICard
            title={fr.dashboard.revenueEstimate}
            value={formatCurrency(kpis.revenueEstimate)}
            icon={Wallet}
            subtitle={fr.dashboard.ytdCumulative}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.dashboard.salesFunnel} description={fr.dashboard.salesFunnelDesc}>
            <FunnelChart data={funnelData} />
          </ChartCard>

          <ChartCard title={fr.dashboard.acquisitionSources} description={fr.dashboard.acquisitionSourcesDesc}>
            <CustomPieChart data={acquisitionData} />
          </ChartCard>

          <ChartCard title={fr.dashboard.clientSegmentation} description={fr.dashboard.clientSegmentationDesc}>
            <CustomPieChart data={segmentationData} innerRadius={60} outerRadius={100} />
          </ChartCard>

          <ChartCard title={fr.dashboard.revenueVsCost} description={fr.dashboard.revenueVsCostDesc}>
            <CustomLineChart
              data={revenueVsCost}
              lines={[
                { dataKey: fr.common.revenue, name: fr.dashboard.revenueK, color: "#10b981" },
                { dataKey: fr.common.cost, name: fr.dashboard.costK, color: "#ef4444" },
              ]}
            />
          </ChartCard>
        </div>

        <ChartCard title={fr.dashboard.businessIntelligence} description={fr.dashboard.businessIntelligenceDesc}>
          <InsightsButton />
        </ChartCard>
      </div>
    </DashboardLayout>
  );
}
