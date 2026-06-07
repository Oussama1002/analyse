"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { KPICard } from "@/components/shared/kpi-card";
import { ChartCard } from "@/components/shared/chart-card";
import { CustomLineChart } from "@/components/charts/line-chart";
import { CustomBarChart } from "@/components/charts/bar-chart";
import { mockData } from "@/lib/data/mock-data";
import { formatPercent } from "@/lib/utils";
import { fr, labelMonth } from "@/lib/i18n/fr";
import { Contact, Eye, Heart, FileText, UserPlus } from "lucide-react";

export default function LinkedInPage() {
  const { linkedin } = mockData;

  const growthData = linkedin.growth.map((d) => ({
    name: labelMonth(d.month),
    [fr.common.followers]: d.followers,
    [fr.common.impressions]: d.impressions / 1000,
  }));

  const engagementData = linkedin.engagementByMonth.map((d) => ({
    name: labelMonth(d.month),
    [fr.linkedin.engagementPct]: d.rate,
    [fr.common.posts]: d.posts,
  }));

  return (
    <DashboardLayout title={fr.linkedin.title} description={fr.linkedin.description}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <KPICard title={fr.common.followers} value={linkedin.followers.toLocaleString("fr-FR")} icon={Contact} trend={{ value: fr.linkedin.trendYtd, positive: true }} />
          <KPICard title={fr.common.impressions} value={`${(linkedin.impressions / 1000).toFixed(0)}K`} icon={Eye} />
          <KPICard title={fr.linkedin.engagementRate} value={formatPercent(linkedin.engagementRate)} icon={Heart} trend={{ value: fr.linkedin.trendVsJan, positive: true }} />
          <KPICard title={fr.linkedin.postsPerMonth} value={String(linkedin.postsPerMonth)} icon={FileText} />
          <KPICard title={fr.linkedin.linkedinLeads} value={String(linkedin.inboundLeadsFromLinkedIn)} icon={UserPlus} subtitle={`${formatPercent(linkedin.linkedInContribution)} ${fr.common.ofTotal}`} />
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 dark:border-indigo-900 dark:bg-indigo-950/30">
          <p className="text-sm font-medium text-indigo-800 dark:text-indigo-300">
            {fr.linkedin.insight(formatPercent(linkedin.linkedInContribution), linkedin.inboundLeadsFromLinkedIn, mockData.leads.totalLeads)}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard title={fr.linkedin.growthTitle} description={fr.linkedin.growthDesc}>
            <CustomLineChart
              data={growthData}
              lines={[
                { dataKey: fr.common.followers, name: fr.common.followers, color: "#0077b5" },
                { dataKey: fr.common.impressions, name: `${fr.common.impressions} (K)`, color: "#6366f1" },
              ]}
            />
          </ChartCard>
          <ChartCard title={fr.linkedin.engagementTitle} description={fr.linkedin.engagementDesc}>
            <CustomBarChart
              data={engagementData}
              bars={[
                { dataKey: fr.linkedin.engagementPct, name: fr.linkedin.engagementPct, color: "#0077b5" },
                { dataKey: fr.common.posts, name: fr.common.posts, color: "#8b5cf6" },
              ]}
            />
          </ChartCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
