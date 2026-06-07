import type { StrategyDocument } from "@/lib/types";

export const initialStrategyDocs: StrategyDocument[] = [
  {
    id: "doc-1",
    title: "Profil Client Idéal (ICP)",
    type: "ICP",
    tags: ["marché", "ciblage", "maroc"],
    author: "Fondateur",
    updatedAt: "2026-05-15",
    content: `# Profil Client Idéal — Softnovation

## ICP Principal : PME Maroc (Transformation digitale)
- **Taille :** 10–100 employés
- **Chiffre d'affaires :** 2M–20M MAD/an
- **Secteur :** Services, retail, logistique, finance
- **Pain points :** Systèmes legacy, processus manuels, pas d'équipe IT interne
- **Budget :** 30K–80K MAD par projet
- **Décideur :** CEO, COO ou Responsable IT

## ICP Secondaire : Startups (Produit tech)
- **Stade :** Seed à Series A
- **Besoin :** Développement MVP, support co-fondateur technique
- **Budget :** 20K–50K MAD

## ICP Tertiaire : International (Nearshore)
- **Localisation :** France, Belgique, Suisse
- **Besoin :** Développement nearshore, optimisation des coûts
- **Budget :** 50K–150K MAD par mission`,
    versions: [
      { id: "v1", content: "Brouillon ICP initial — focus PME uniquement", createdAt: "2026-01-10", author: "Fondateur" },
      { id: "v2", content: "Ajout des segments Startups et International", createdAt: "2026-05-15", author: "Fondateur" },
    ],
  },
  {
    id: "doc-2",
    title: "Stratégie tarifaire 2026",
    type: "Pricing strategy",
    tags: ["tarification", "revenus", "packages"],
    author: "Fondateur",
    updatedAt: "2026-04-20",
    content: `# Stratégie tarifaire — Softnovation 2026

## Niveaux de service
1. **Audit & Diagnostic** — 8K–15K MAD (forfait)
2. **MVP / Projet** — 25K–80K MAD (forfait ou T&M)
3. **Retainer / Support** — 5K–15K MAD/mois
4. **Équipe dédiée** — 45K–90K MAD/mois

## Principes tarifaires
- Tarification basée sur la valeur pour les projets stratégiques
- Compétitif vs agences locales (+15–20% premium qualité)
- Acompte 30%, 40% mi-projet, 30% à la livraison
- Remise retainer : 10% pour engagement 6 mois`,
    versions: [
      { id: "v1", content: "Paliers tarifaires initiaux", createdAt: "2026-02-01", author: "Fondateur" },
    ],
  },
  {
    id: "doc-3",
    title: "Structure d'offre",
    type: "Offer structure",
    tags: ["offres", "packaging"],
    author: "Responsable commercial",
    updatedAt: "2026-05-01",
    content: `# Structure d'offre

## Offres principales
1. **Audit Digital Express** (2 semaines) — Évaluation rapide + feuille de route
2. **Build & Launch** (2–4 mois) — Cycle complet de développement
3. **Scale & Support** (continu) — Maintenance + évolution fonctionnelle

## Options complémentaires
- Package UX/UI Design
- Setup DevOps & Cloud
- Formation & documentation
- Support SLA premium`,
    versions: [
      { id: "v1", content: "Offres principales définies", createdAt: "2026-03-15", author: "Responsable commercial" },
    ],
  },
  {
    id: "doc-4",
    title: "Positionnement marché — Services IT Maroc",
    type: "Market positioning",
    tags: ["positionnement", "concurrence", "maroc"],
    author: "Fondateur",
    updatedAt: "2026-06-01",
    content: `# Positionnement marché

## Énoncé de position
« Softnovation — Partenaire IT premium pour les PME marocaines en quête d'une transformation digitale fiable, sans la lourdeur d'une grande agence. »

## Différenciateurs
- Expertise technique portée par le fondateur
- Livraison agile avec communication transparente
- Équipe trilingue FR/AR/EN
- Focus sur les résultats business, pas seulement le code

## Paysage concurrentiel
- Grandes agences : chères, lentes
- Freelances : bon marché, peu fiables
- Softnovation : sweet spot — qualité + agilité + confiance`,
    versions: [
      { id: "v1", content: "Brouillon positionnement initial", createdAt: "2026-01-20", author: "Fondateur" },
    ],
  },
  {
    id: "doc-5",
    title: "Stratégie commerciale & Playbook",
    type: "Sales strategy",
    tags: ["commercial", "pipeline", "processus"],
    author: "Responsable commercial",
    updatedAt: "2026-05-28",
    content: `# Stratégie commerciale 2026

## Motion commerciale
1. **Entrant :** Contenu LinkedIn → site web → appel découverte
2. **Sortant :** Réseau fondateur → introductions → DM LinkedIn
3. **Partenariats :** Incubateurs, cabinets comptables, clubs business

## Objectifs pipeline
- 30+ nouveaux prospects/mois d'ici Q3
- 15% conversion MQL→SQL
- 12,5% conversion globale prospect→client

## Actions clés
- Réduire la dépendance fondateur de 67% à 40% d'ici fin d'année
- Lancer programme de recommandations (commission 10%)
- Revue pipeline hebdomadaire chaque lundi`,
    versions: [
      { id: "v1", content: "Playbook commercial v1", createdAt: "2026-04-01", author: "Responsable commercial" },
    ],
  },
];
