export type ListingType = "rent" | "sale";

export type PropertyType =
  | "flat"
  | "apartment"
  | "duplex"
  | "terrace"
  | "detached"
  | "semi-detached"
  | "bungalow"
  | "mansion"
  | "commercial"
  | "land"
  | "other";

export interface RawHousingRecord {
  id: string | number;
  title?: string;
  area?: string;
  location?: string;
  address?: string;
  price: number | string;
  currency?: string;
  listing_type?: string;
  listingType?: string;
  property_type?: string;
  propertyType?: string;
  bedrooms?: number | string | null;
  bathrooms?: number | string | null;
  toilets?: number | string | null;
  parking_spaces?: number | string | null;
  parkingSpaces?: number | string | null;
  serviced?: boolean | number | string | null;
  newly_built?: boolean | number | string | null;
  newlyBuilt?: boolean | number | string | null;
  furnished?: boolean | number | string | null;
  description?: string;
  url?: string;
  source_url?: string;
  sourceUrl?: string;
  source?: string;
  [key: string]: unknown;
}

export interface PropertyProvenance {
  source: string;
  license: string;
  collectionDate?: string;
  author?: string;
}

export interface Property {
  id: string;
  title: string;
  area: string;
  state: string;
  price: number;
  currency: "NGN";
  listingType: ListingType;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  toilets?: number;
  parkingSpaces?: number;
  isServiced?: boolean;
  isNewlyBuilt?: boolean;
  isFurnished?: boolean;
  description?: string;
  sourceUrl?: string;
  provenance?: PropertyProvenance;
}

export interface PropertyFilters {
  area?: string;
  listingType?: ListingType | "all";
  propertyType?: PropertyType | "all";
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number | "all";
  bathrooms?: number | "all";
  isServiced?: boolean;
  isFurnished?: boolean;
  isNewlyBuilt?: boolean;
  sortBy?:
    "price_asc" | "price_desc" | "bedrooms_asc" | "bedrooms_desc" | "newest";
}
