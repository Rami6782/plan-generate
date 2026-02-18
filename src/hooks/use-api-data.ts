import { useQuery } from "@tanstack/react-query";
import {
  fetchCountries,
  fetchModules,
  fetchSegments,
  fetchPhases,
  fetchClients,
  fetchDefaultCommercial,
  fetchDefaultResources,
} from "@/lib/api";

export const useCountries = () =>
  useQuery({ queryKey: ["countries"], queryFn: fetchCountries, staleTime: Infinity });

export const useModules = () =>
  useQuery({ queryKey: ["modules"], queryFn: fetchModules, staleTime: Infinity });

export const useSegments = () =>
  useQuery({ queryKey: ["segments"], queryFn: fetchSegments, staleTime: Infinity });

export const usePhases = () =>
  useQuery({ queryKey: ["phases"], queryFn: fetchPhases, staleTime: Infinity });

export const useClients = () =>
  useQuery({ queryKey: ["clients"], queryFn: fetchClients, staleTime: Infinity });

export const useDefaultCommercial = () =>
  useQuery({ queryKey: ["defaultCommercial"], queryFn: fetchDefaultCommercial, staleTime: Infinity });

export const useDefaultResources = () =>
  useQuery({ queryKey: ["defaultResources"], queryFn: fetchDefaultResources, staleTime: Infinity });
