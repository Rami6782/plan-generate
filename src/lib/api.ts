/**
 * API service layer — calls REST endpoints when API_BASE_URL is set,
 * otherwise falls back to local mock data.
 *
 * To switch to your real API, set the base URL:
 *   import { setApiBaseUrl } from "@/lib/api";
 *   setApiBaseUrl("https://your-server.com/api");
 *
 * Expected endpoints:
 *   GET /countries        → Country[]
 *   GET /clients          → Client[]
 *   GET /modules          → Module[]
 *   GET /activitytypes    → ActivityType[]
 *   GET /phases           → Phase[]          (or derive from activitytypes)
 */

import {
  countries as mockCountries,
  modules as mockModules,
  phases as mockPhases,
  segments as mockSegments,
  defaultCommercial,
  defaultResources,
  type Country,
  type Module,
  type Phase,
  type CommercialParams,
  type ResourceMix,
} from "@/lib/mock-data";

// ---------- Types matching SQL Server schema ----------

export interface ApiCountry {
  CountryID: number;
  CountryName: string;
}

export interface ApiClient {
  ClientID: number;
  ClientName: string;
  CountryID: number;
}

export interface ApiModule {
  ModuleID: number;
  ModuleName: string;
  Segment: string | null;
}

export interface ApiActivityType {
  ActivityTypeID: number;
  OutlineLevel: number;
  Description: string | null;
}

// ---------- Configuration ----------

let API_BASE_URL = ""; // empty = use mock data

export const setApiBaseUrl = (url: string) => {
  API_BASE_URL = url.replace(/\/+$/, "");
};

export const getApiBaseUrl = () => API_BASE_URL;

const isApiConfigured = () => API_BASE_URL.length > 0;

// ---------- Generic fetcher ----------

async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`API ${endpoint} failed: ${res.status}`);
  return res.json();
}

// ---------- Public fetch functions ----------

export async function fetchCountries(): Promise<Country[]> {
  if (!isApiConfigured()) return mockCountries;

  const data = await apiFetch<ApiCountry[]>("/countries");
  return data.map((c) => ({
    id: String(c.CountryID),
    name: c.CountryName,
    region: "", // region not in SQL schema — extend API if needed
  }));
}

export async function fetchClients(): Promise<ApiClient[]> {
  if (!isApiConfigured()) return [];
  return apiFetch<ApiClient[]>("/clients");
}

export async function fetchModules(): Promise<Module[]> {
  if (!isApiConfigured()) return mockModules;

  const data = await apiFetch<ApiModule[]>("/modules");
  return data.map((m) => ({
    id: String(m.ModuleID),
    name: m.ModuleName,
    segment: m.Segment || "",
  }));
}

export async function fetchSegments(): Promise<string[]> {
  if (!isApiConfigured()) return mockSegments;

  // Derive segments from modules
  const mods = await fetchModules();
  const unique = [...new Set(mods.map((m) => m.segment).filter(Boolean))];
  return unique;
}

export async function fetchActivityTypes(): Promise<ApiActivityType[]> {
  if (!isApiConfigured()) return [];
  return apiFetch<ApiActivityType[]>("/activitytypes");
}

export async function fetchPhases(): Promise<Phase[]> {
  if (!isApiConfigured()) return mockPhases;

  // If your API exposes phases as a separate endpoint, call it here.
  // For now we derive from activity types or fall back to mock.
  try {
    const types = await apiFetch<ApiActivityType[]>("/phases");
    return types.map((t, i) => ({
      id: String(t.ActivityTypeID),
      name: t.Description || `Phase ${t.OutlineLevel}`,
      order: i + 1,
    }));
  } catch {
    return mockPhases;
  }
}

export async function fetchDefaultCommercial(): Promise<CommercialParams> {
  if (!isApiConfigured()) return defaultCommercial;

  try {
    return await apiFetch<CommercialParams>("/commercial/defaults");
  } catch {
    return defaultCommercial;
  }
}

export async function fetchDefaultResources(): Promise<ResourceMix[]> {
  if (!isApiConfigured()) return defaultResources;

  try {
    return await apiFetch<ResourceMix[]>("/resources/defaults");
  } catch {
    return defaultResources;
  }
}
