"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomBarChart } from "@/components/charts/bar-chart";
import { CustomLineChart } from "@/components/charts/line-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatCurrency } from "@/lib/utils";
import { fr, labelChannel, labelMonth } from "@/lib/i18n/fr";
import { DollarSign, TrendingUp, Target, Wallet, PiggyBank } from "lucide-react";

export default function FinancePage() {
  const { financial } = mockData;

  const cacData = financial.cacByChannel.filter((c) => c.cac > 0).map((c) => ({
    name: labelChannel(c.channel),
    CAC: c.cac,
  }));

  const roiData = financial.roiByChannel.filter((c) => c.roi > 0).map((c) => ({
    name: labelChannel(c.channel),
    ROI: c.roi,
  }));

  const revenueVsCost = financial.revenueVsCost.map((d) => ({
    name: labelMonth(d.month),
    [fr.common.revenue]: d.revenue / 1000,
    [fr.common.cost]: d.cost / 1000,
    [fr.common.profit]: (d.revenue - d.cost) / 1000,
  }));

  const ltvCacRatio = (financial.ltv / financial.cacAverage).toFixed(1);
  const profitMargin = (((financial.totalRevenue - financial.totalAcquisitionCost) / financial.totalRevenue) * 100).toFixed(1);

  return (
    <DashboardLayout title={fr.finance.title} description={fr.finance.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KPICard title={fr.finance.avgCac} value={formatCurrency(financial.cacAverage)} icon={DollarSign} />
          <KPICard title={fr.finance.ltv} value={formatCurrency(financial.ltv)} icon={TrendingUp} subtitle={`LTV:CAC = ${ltvCacRatio}:1`} />
          <KPICard title={fr.finance.costPerLead} value={formatCurrency(financial.costPerLead)} icon={Target} />
          <KPICard title={fr.finance.revenuePerClient} value={formatCurrency(financial.revenuePerClient)} icon={Wallet} />
          <KPICard title={fr.finance.profitMargin} value={`${profitMargin}%`} icon={PiggyBank} subtitle={fr.finance.afterAcquisition} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.finance.cacByChannel} description={fr.finance.cacByChannelDesc}>
            <CustomBarChart data={cacData} bars={[{ dataKey: "CAC", name: "CAC (MAD)", color: "#ef4444" }]} layout="horizontal" height={280} />
          </ChartCard>
          <ChartCard title={fr.finance.roiByChannel} description={fr.finance.roiByChannelDesc}>
            <CustomBarChart data={roiData} bars={[{ dataKey: "ROI", name: `${fr.finance.roi} %`, color: "#10b981" }]} layout="horizontal" height={280} />
          </ChartCard>
          <ChartCard title={fr.finance.profitability} description={fr.finance.profitabilityDesc} className="lg:col-span-2">
            <CustomLineChart
              data={revenueVsCost}
              lines={[
                { dataKey: fr.common.revenue, name: fr.dashboard.revenueK, color: "#10b981" },
                { dataKey: fr.common.cost, name: fr.dashboard.costK, color: "#ef4444" },
                { dataKey: fr.common.profit, name: `${fr.common.profit} (K MAD)`, color: "#6366f1" },
              ]}
              height={350}
            />
          </ChartCard>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-4 text-base font-semibold">{fr.finance.channelSummary}</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800">
                  <th className="pb-3 text-left font-medium text-zinc-500">{fr.common.channel}</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">CAC</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">{fr.common.revenue}</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">{fr.common.cost}</th>
                  <th className="pb-3 text-right font-medium text-zinc-500">{fr.finance.roi}</th>
                </tr>
              </thead>
              <tbody>
                {financial.roiByChannel.filter((c) => c.roi > 0).map((channel) => (
                  <tr key={channel.channel} className="border-b border-zinc-100 dark:border-zinc-800/50">
                    <td className="py-3 font-medium">{labelChannel(channel.channel)}</td>
                    <td className="py-3 text-right">{formatCurrency(financial.cacByChannel.find((c) => c.channel === channel.channel)?.cac ?? 0)}</td>
                    <td className="py-3 text-right">{formatCurrency(channel.revenue)}</td>
                    <td className="py-3 text-right">{formatCurrency(channel.cost)}</td>
                    <td className="py-3 text-right font-semibold text-emerald-600">{channel.roi}%</td>
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
