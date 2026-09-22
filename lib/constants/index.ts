/**
 * Domain and Application Constants
 */

export const ABUJA_AREAS = [
  "Maitama",
  "Asokoro",
  "Wuse-2",
  "Guzape",
  "Utako",
  "Apo",
  "Life-Camp",
  "Karsana",
  "Lokogoma",
  "Dawaki",
  "Gwarinpa",
  "Jabi",
  "Katampe",
  "Mabushi",
  "Kaura",
  "Kado",
  "Lugbe",
] as const;

export type AbujaArea = (typeof ABUJA_AREAS)[number] | string;

/**
 * Common alternative spellings, abbreviations, and synonyms
 * mapped to canonical dataset area names.
 */
export const AREA_ALIASES: Record<string, string> = {
  "wuse 2": "Wuse-2",
  "wuse ii": "Wuse-2",
  "wuse-2": "Wuse-2",
  "wuse zone 2": "Wuse-2",
  wuse2: "Wuse-2",
  "life camp": "Life-Camp",
  "life-camp": "Life-Camp",
  lifecamp: "Life-Camp",
  "maitama district": "Maitama",
  "maitama main": "Maitama",
  "asokoro district": "Asokoro",
  "asokoro main": "Asokoro",
  "guzape district": "Guzape",
  "utako district": "Utako",
  "gwarinpa estate": "Gwarinpa",
  gwarimpa: "Gwarinpa",
  "apo resettlement": "Apo",
  "apo legislative": "Apo",
  "lokogoma district": "Lokogoma",
  "dawaki rockview": "Dawaki",
  "karsana west": "Karsana",
  "jabi lake": "Jabi",
  "katampe extension": "Katampe",
  "katampe main": "Katampe",
};

export const PROPERTY_TYPES = [
  "flat",
  "apartment",
  "duplex",
  "terrace",
  "detached",
  "semi-detached",
  "bungalow",
  "mansion",
  "commercial",
  "land",
  "other",
] as const;

export const LISTING_TYPES = ["rent", "sale"] as const;

export const DEFAULT_PAGE_SIZE = 12;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest Listings" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "bedrooms_asc", label: "Bedrooms: Least to Most" },
  { value: "bedrooms_desc", label: "Bedrooms: Most to Least" },
] as const;
