export interface OpenMeteoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  feature_code?: string;
  country_code?: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  admin4_id?: number;
  timezone?: string;
  population?: number;
  country_id?: number;
  country?: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
  postcodes?: string[];
}

export interface OpenMeteoResponse {
  results?: OpenMeteoResult[];
  generationtime_ms?: number;
}

export interface LocationResult {
  id: string | number;
  name: string;
  displayName: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string; // e.g. Federal Capital Territory
  admin2?: string; // e.g. Municipal Area Council
  matchedArea?: string; // Deterministically matched local area from Abuja housing dataset
}

export type AutocompleteStatus =
  "idle" | "typing" | "searching" | "results" | "empty" | "error" | "selected";

export interface AutocompleteState {
  query: string;
  status: AutocompleteStatus;
  results: LocationResult[];
  selectedIndex: number;
  selectedLocation: LocationResult | null;
  errorMessage?: string | null;
}
