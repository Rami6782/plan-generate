// Mock reference data simulating DB tables

export interface Country {
  id: string;
  name: string;
  region: string;
}

export interface Module {
  id: string;
  name: string;
  segment: string;
}

export interface Phase {
  id: string;
  name: string;
  order: number;
}

export interface CommercialParams {
  offsiteCostRate: number;
  onsiteCostRate: number;
  flightCost: number;
  perDiem: number;
  hotelCost: number;
  manDayCost: number;
  coefficient: number;
}

export interface ResourceMix {
  phaseId: string;
  offsite: number;
  onsite: number;
}

export interface ProjectConfig {
  projectName: string;
  country: string;
  region: string;
  startDate: Date | undefined;
  segment: string;
  modules: string[];
  resources: ResourceMix[];
  commercial: CommercialParams;
}

export const countries: Country[] = [
  { id: "ae", name: "UAE", region: "Middle East" },
  { id: "sa", name: "Saudi Arabia", region: "Middle East" },
  { id: "eg", name: "Egypt", region: "Africa" },
  { id: "ng", name: "Nigeria", region: "Africa" },
  { id: "ke", name: "Kenya", region: "Africa" },
  { id: "gb", name: "United Kingdom", region: "Europe" },
  { id: "fr", name: "France", region: "Europe" },
  { id: "de", name: "Germany", region: "Europe" },
  { id: "sg", name: "Singapore", region: "Asia Pacific" },
  { id: "in", name: "India", region: "Asia Pacific" },
  { id: "us", name: "United States", region: "Americas" },
  { id: "br", name: "Brazil", region: "Americas" },
];

export const segments = ["Retail", "SME", "Corporate"];

export const modules: Module[] = [
  { id: "ls", name: "Loan Servicing", segment: "Retail" },
  { id: "lo", name: "Loan Origination", segment: "Retail" },
  { id: "lm", name: "Limit Management", segment: "Corporate" },
  { id: "ews", name: "Early Warning System", segment: "Corporate" },
  { id: "col", name: "Collections", segment: "Retail" },
  { id: "cm", name: "Credit Monitoring", segment: "SME" },
  { id: "ra", name: "Risk Assessment", segment: "Corporate" },
  { id: "dp", name: "Data Platform", segment: "Retail" },
  { id: "rp", name: "Reporting", segment: "SME" },
];

export const phases: Phase[] = [
  { id: "scoping", name: "Scoping", order: 1 },
  { id: "build", name: "Build", order: 2 },
  { id: "sit", name: "SIT", order: 3 },
  { id: "uat", name: "UAT", order: 4 },
  { id: "golive", name: "Go Live", order: 5 },
  { id: "support", name: "Hypercare", order: 6 },
];

export const defaultCommercial: CommercialParams = {
  offsiteCostRate: 450,
  onsiteCostRate: 650,
  flightCost: 1200,
  perDiem: 75,
  hotelCost: 180,
  manDayCost: 550,
  coefficient: 1.35,
};

export const defaultResources: ResourceMix[] = phases.map((p) => ({
  phaseId: p.id,
  offsite: p.id === "build" ? 6 : p.id === "sit" ? 4 : 2,
  onsite: p.id === "uat" || p.id === "golive" ? 4 : 2,
}));
