import { ABUJA_AREAS, AREA_ALIASES } from "@/lib/constants";

export function normalizeLocationString(str: string): string {
  if (!str) return "";

  return str
    .toLowerCase()
    .replace(/[,\-_./()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function stripNoiseWords(str: string): string {
  const noisePatterns = [
    /\b(abuja|nigeria|fct|federal capital territory)\b/gi,
    /\b(district|estate|axis|phase|zone|road|street|close)\b/gi,
    /\b(main|extension|resettlement|layout)\b/gi,
  ];

  let cleaned = str;
  for (const pattern of noisePatterns) {
    cleaned = cleaned.replace(pattern, " ");
  }

  return cleaned.replace(/\s+/g, " ").trim();
}

/**
 * Deterministically matches a user query or geocoding result string to a canonical dataset area.
 *
 * Evaluation Order:
 * 1. Direct case-insensitive match against known areas.
 * 2. Explicit alias lookup in AREA_ALIASES.
 * 3. Match after stripping geographic noise words (e.g. "Maitama District, Abuja" => "Maitama").
 * 4. Token/substring matching against known areas.
 *
 * @param query - Input string from geocoding result or search query
 * @param knownAreas - Optional list of areas to match against (defaults to ABUJA_AREAS)
 * @returns Canonical area name if matched, or null
 */
export function matchLocationToDatasetArea(
  query: string,
  knownAreas: readonly string[] = ABUJA_AREAS
): string | null {
  if (!query || typeof query !== "string") return null;

  const normalized = normalizeLocationString(query);
  if (!normalized) return null;

  // 1. Direct match (e.g. "maitama" => "Maitama", "wuse-2" => "Wuse-2")
  for (const area of knownAreas) {
    if (normalizeLocationString(area) === normalized) {
      return area;
    }
  }

  // 2. Direct alias check
  if (AREA_ALIASES[normalized]) {
    return AREA_ALIASES[normalized];
  }

  // 3. Cleaned check (stripping "district", "abuja", etc.)
  const cleaned = stripNoiseWords(normalized);
  if (cleaned) {
    // Check alias again for cleaned string
    if (AREA_ALIASES[cleaned]) {
      return AREA_ALIASES[cleaned];
    }

    for (const area of knownAreas) {
      const normalizedArea = normalizeLocationString(area);
      if (normalizedArea === cleaned) {
        return area;
      }
    }
  }

  // 4. Check if any known area is a distinct token/word inside the query
  const queryWords = normalized.split(/\s+/);
  for (const area of knownAreas) {
    const areaWords = normalizeLocationString(area).split(/\s+/);
    // If all words of the area appear in sequence or within the query
    const areaMatches = areaWords.every((word) => queryWords.includes(word));
    if (areaMatches) {
      return area;
    }
  }

  // 5. Substring inclusion check (e.g., "utako" in "utako abuja")
  for (const area of knownAreas) {
    const cleanArea = normalizeLocationString(area).replace(/\s+/g, "");
    const cleanQuery = normalized.replace(/\s+/g, "");
    if (cleanQuery.includes(cleanArea) || cleanArea.includes(cleanQuery)) {
      return area;
    }
  }

  return null;
}

/**
 * Checks whether an area is officially recognized within the dataset.
 */
export function isAreaInDataset(
  area: string,
  knownAreas: readonly string[] = ABUJA_AREAS
): boolean {
  if (!area) return false;
  return matchLocationToDatasetArea(area, knownAreas) !== null;
}

/**
 * Extracts all unique area names from a collection of raw housing records.
 */
export function getDistinctDatasetAreas(
  records: Array<{ area?: string }>
): string[] {
  const areaSet = new Set<string>();
  for (const record of records) {
    if (record.area && typeof record.area === "string") {
      const trimmed = record.area.trim();
      if (trimmed) areaSet.add(trimmed);
    }
  }
  return Array.from(areaSet).sort((a, b) => a.localeCompare(b));
}
