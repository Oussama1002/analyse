"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomLineChart } from "@/components/charts/line-chart";
import { CustomPieChart } from "@/components/charts/pie-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatPercent } from "@/lib/utils";
import { fr, labelMonth } from "@/lib/i18n/fr";
import { CHART_COLORS } from "@/lib/constants/charts";

const platformLabels: Record<string, string> = {
  Facebook: "Facebook",
  Instagram: "Instagram",
  "LinkedIn page": "Page LinkedIn",
};

export default function SocialMediaPage() {
  const { social } = mockData;

  const combinedGrowth = social.platforms[0].growth.map((_, i) => {
    const entry: { name: string; [key: string]: string | number } = {
      name: labelMonth(social.platforms[0].growth[i].month),
    };
    social.platforms.forEach((p) => {
      entry[platformLabels[p.platform] ?? p.platform] = p.growth[i].followers;
    });
    return entry;
  });

  const leadsDistribution = social.platforms.map((p) => ({
    name: platformLabels[p.platform] ?? p.platform,
    value: p.leadsGenerated,
  }));

  const totalLeads = social.platforms.reduce((s, p) => s + p.leadsGenerated, 0);

  return (
    <DashboardLayout title={fr.social.title} description={fr.social.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {social.platforms.map((platform, i) => (
            <div key={platform.platform} className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950" style={{ borderTopColor: CHART_COLORS[i], borderTopWidth: 3 }}>
              <h3 className="font-semibold">{platformLabels[platform.platform] ?? platform.platform}</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-zinc-500">{fr.common.followers}</p><p className="text-xl font-bold">{platform.followers.toLocaleString("fr-FR")}</p></div>
                <div><p className="text-zinc-500">{fr.common.reach}</p><p className="text-xl font-bold">{platform.reach.toLocaleString("fr-FR")}</p></div>
                <div><p className="text-zinc-500">{fr.common.engagement}</p><p className="text-xl font-bold">{formatPercent(platform.engagement)}</p></div>
                <div><p className="text-zinc-500">{fr.common.leads}</p><p className="text-xl font-bold text-indigo-600">{platform.leadsGenerated}</p></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.social.growthComparison} description={fr.social.growthComparisonDesc}>
            <CustomLineChart
              data={combinedGrowth}
              lines={social.platforms.map((p, i) => ({
                dataKey: platformLabels[p.platform] ?? p.platform,
                name: platformLabels[p.platform] ?? p.platform,
                color: CHART_COLORS[i],
              }))}
            />
          </ChartCard>
          <ChartCard title={fr.social.leadsByPlatform} description={fr.social.totalSocialLeads(totalLeads)}>
            <CustomPieChart data={leadsDistribution} />
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
