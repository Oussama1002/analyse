import type { AppData, BusinessInsights } from "@/lib/types";

export function generateBusinessInsights(data: AppData): BusinessInsights {
  const { clients, acquisition, leads, linkedin, financial, kpis } = data;

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const opportunities: string[] = [];
  const risks: string[] = [];

  if (clients.retentionRate >= 45) {
    strengths.push(
      `Bonne rétention client à ${clients.retentionRate}% — près de la moitié des clients reviennent pour des projets supplémentaires.`
    );
  } else {
    weaknesses.push(
      `Taux de rétention de ${clients.retentionRate}% inférieur au benchmark sectoriel (50%+). Renforcer l'engagement post-livraison.`
    );
  }

  if (acquisition.founderDependency > 50) {
    weaknesses.push(
      `Forte dépendance au réseau du fondateur (${acquisition.founderDependency}%) — limite la scalabilité et crée un risque de personne clé.`
    );
    opportunities.push(
      "Diversifier l'acquisition en intensifiant la prospection LinkedIn et en lançant un programme de recommandations structuré."
    );
    risks.push(
      `Risque de concentration : ${acquisition.founderDependency}% des clients proviennent du réseau du fondateur — vulnérable si le réseau sature.`
    );
  }

  if (acquisition.scalabilityScore < 50) {
    weaknesses.push(
      `Score de scalabilité de ${acquisition.scalabilityScore}/100 — les canaux d'acquisition ne sont pas encore systématisés.`
    );
  }

  if (leads.conversionRate >= 10) {
    strengths.push(
      `Conversion prospect→client de ${leads.conversionRate}% supérieure au benchmark B2B services (8–10%).`
    );
  } else {
    weaknesses.push(
      `Taux de conversion de ${leads.conversionRate}% à améliorer — optimiser les critères de qualification MQL.`
    );
  }

  if (linkedin.linkedInContribution >= 15) {
    strengths.push(
      `LinkedIn génère ${linkedin.linkedInContribution}% des prospects totaux (${linkedin.inboundLeadsFromLinkedIn} leads) — excellent ROI du personal branding.`
    );
    opportunities.push(
      `Augmenter la fréquence de publication LinkedIn (actuellement ${linkedin.postsPerMonth}/mois) pour capitaliser sur le taux d'engagement de ${linkedin.engagementRate}%.`
    );
  }

  const ltvCacRatio = financial.ltv / financial.cacAverage;
  if (ltvCacRatio >= 3) {
    strengths.push(
      `Ratio LTV:CAC sain de ${ltvCacRatio.toFixed(1)}:1 (LTV ${(financial.ltv / 1000).toFixed(0)}K MAD vs CAC ${(financial.cacAverage / 1000).toFixed(1)}K MAD).`
    );
  } else {
    risks.push(
      `Ratio LTV:CAC de ${ltvCacRatio.toFixed(1)}:1 inférieur à l'objectif 3:1 — revoir l'efficacité des dépenses d'acquisition.`
    );
  }

  const referralROI = financial.roiByChannel.find((c) => c.channel === "Referrals");
  if (referralROI && referralROI.roi > 1000) {
    strengths.push(
      `Le canal Recommandations offre un ROI exceptionnel (${referralROI.roi}%) — CAC le plus bas à 800 MAD par client.`
    );
    opportunities.push(
      "Formaliser le programme de recommandations avec incitations — canal au ROI le plus élevé mais sous-utilisé (seulement 10% des acquisitions)."
    );
  }

  const pmeShare = (clients.clientsByType["PME Morocco"] / clients.totalClients) * 100;
  if (pmeShare > 50) {
    strengths.push(
      `Forte orientation PME Maroc (${pmeShare.toFixed(0)}% des clients) alignée avec la stratégie ICP principale.`
    );
  }

  const mqlToSqlRate = (leads.sql / leads.mql) * 100;
  if (mqlToSqlRate < 70) {
    opportunities.push(
      `Conversion MQL→SQL à ${mqlToSqlRate.toFixed(0)}% — resserrer les critères de qualification pour améliorer la qualité du pipeline.`
    );
  }

  strengths.push(
    `Revenu estimé de ${(kpis.revenueEstimate / 1000).toFixed(0)}K MAD pour ${kpis.totalClients} clients avec un panier moyen de ${formatCurrency(financial.revenuePerClient)}.`
  );

  const unusedChannels = acquisition.channels.filter(
    (c) => c.percentage === 0 && (c.name === "Ads" || c.name === "SEO")
  );
  if (unusedChannels.length > 0) {
    opportunities.push(
      "Les canaux Publicités et SEO sont inexploités — envisager un test Google Ads à petit budget sur des mots-clés à forte intention."
    );
  }

  if (clients.clientsByType.International < 5) {
    opportunities.push(
      "Le segment International (3 clients) présente des valeurs de deal élevées — développer le marketing nearshore vers la France/Belgique."
    );
  }

  return {
    strengths,
    weaknesses,
    opportunities,
    risks,
    generatedAt: new Date().toISOString(),
  };
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("fr-MA", {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(value);
}
