export type ClientType = "PME Morocco" | "Startups" | "International";

export interface ClientsData {
  totalClients: number;
  activeClients: number;
  closedClients: number;
  recurringClients: number;
  oneShotClients: number;
  retentionRate: number;
  clientsByType: Record<ClientType, number>;
}

export type AcquisitionChannel =
  | "Network of founder"
  | "LinkedIn outbound"
  | "Ads"
  | "Referrals"
  | "SEO"
  | "Partnerships";

export interface AcquisitionData {
  channels: { name: AcquisitionChannel; count: number; percentage: number }[];
  founderDependency: number;
  scalabilityScore: number;
}

export interface LeadsData {
  totalLeads: number;
  inboundLeads: number;
  outboundLeads: number;
  mql: number;
  sql: number;
  convertedLeads: number;
  conversionRate: number;
  evolution: { month: string; leads: number; mql: number; sql: number }[];
}

export type PipelineStage =
  | "New"
  | "Contacted"
  | "Qualified (MQL)"
  | "SQL"
  | "Proposal sent"
  | "Won"
  | "Lost";

export interface ActivityLogEntry {
  id: string;
  date: string;
  action: string;
  user: string;
}

export interface CRMLead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  value: number;
  source: AcquisitionChannel;
  stage: PipelineStage;
  createdAt: string;
  activities: ActivityLogEntry[];
}

export interface LinkedInData {
  followers: number;
  impressions: number;
  engagementRate: number;
  postsPerMonth: number;
  inboundLeadsFromLinkedIn: number;
  linkedInContribution: number;
  growth: { month: string; followers: number; impressions: number }[];
  engagementByMonth: { month: string; rate: number; posts: number }[];
}

export type SocialPlatform = "Facebook" | "Instagram" | "LinkedIn page";

export interface SocialPlatformData {
  platform: SocialPlatform;
  followers: number;
  reach: number;
  engagement: number;
  leadsGenerated: number;
  growth: { month: string; followers: number }[];
}

export interface SocialMediaData {
  platforms: SocialPlatformData[];
}

export type StrategyDocType =
  | "ICP"
  | "Pricing strategy"
  | "Offer structure"
  | "Market positioning"
  | "Sales strategy";

export interface StrategyDocVersion {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface StrategyDocument {
  id: string;
  title: string;
  type: StrategyDocType;
  content: string;
  tags: string[];
  updatedAt: string;
  author: string;
  versions: StrategyDocVersion[];
}

export interface FinancialData {
  cacAverage: number;
  ltv: number;
  costPerLead: number;
  revenuePerClient: number;
  totalRevenue: number;
  totalAcquisitionCost: number;
  cacByChannel: { channel: AcquisitionChannel; cac: number; leads: number }[];
  roiByChannel: { channel: AcquisitionChannel; roi: number; revenue: number; cost: number }[];
  revenueVsCost: { month: string; revenue: number; cost: number }[];
}

export interface DashboardKPIs {
  totalClients: number;
  totalLeads: number;
  conversionRate: number;
  cacAverage: number;
  retentionRate: number;
  revenueEstimate: number;
}

export interface BusinessInsights {
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  risks: string[];
  generatedAt: string;
}

export interface AppData {
  clients: ClientsData;
  acquisition: AcquisitionData;
  leads: LeadsData;
  linkedin: LinkedInData;
  social: SocialMediaData;
  financial: FinancialData;
  kpis: DashboardKPIs;
}
