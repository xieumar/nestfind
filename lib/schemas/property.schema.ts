import { z } from "zod";

export const listingTypeSchema = z.enum(["rent", "sale"]);

export const propertyTypeSchema = z.enum([
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
]);

export const rawHousingRecordSchema = z.object({
  title: z.string(),
  price_ngn: z.number().nonnegative(),
  listing_type: z.string(),
  area: z.string(),
  neighbourhood: z.string().optional().default(""),
  address: z.string().optional().default(""),
  bedrooms: z.number().nullable().optional(),
  bathrooms: z.number().nullable().optional(),
  toilets: z.number().nullable().optional(),
  property_type: z.string(),
  description: z.string().optional().default(""),
  pid: z.string(),
  date_added: z.string().optional(),
  last_updated: z.string().optional(),
  source_url: z.string().url().or(z.string()),
});

export const rawHousingDatasetSchema = z.array(rawHousingRecordSchema);

export const propertyProvenanceSchema = z.object({
  source: z.string(),
  license: z.string(),
  collectionDate: z.string().optional(),
  author: z.string().optional(),
});

export const propertySchema = z.object({
  id: z.string(),
  title: z.string(),
  area: z.string(),
  state: z.string().default("Abuja"),
  price: z.number().nonnegative(),
  currency: z.literal("NGN").default("NGN"),
  listingType: listingTypeSchema,
  propertyType: propertyTypeSchema,
  bedrooms: z.number().nonnegative(),
  bathrooms: z.number().nonnegative(),
  toilets: z.number().nonnegative().optional(),
  parkingSpaces: z.number().nonnegative().optional(),
  isServiced: z.boolean().optional(),
  isNewlyBuilt: z.boolean().optional(),
  isFurnished: z.boolean().optional(),
  description: z.string().optional(),
  sourceUrl: z.string().optional(),
  provenance: propertyProvenanceSchema.optional(),
});

export const propertyFiltersSchema = z.object({
  area: z.string().optional(),
  listingType: z.union([listingTypeSchema, z.literal("all")]).optional(),
  propertyType: z.union([propertyTypeSchema, z.literal("all")]).optional(),
  minPrice: z.number().nonnegative().optional(),
  maxPrice: z.number().nonnegative().optional(),
  bedrooms: z.union([z.number().nonnegative(), z.literal("all")]).optional(),
  bathrooms: z.union([z.number().nonnegative(), z.literal("all")]).optional(),
  isServiced: z.boolean().optional(),
  isFurnished: z.boolean().optional(),
  isNewlyBuilt: z.boolean().optional(),
  sortBy: z
    .enum([
      "price_asc",
      "price_desc",
      "bedrooms_asc",
      "bedrooms_desc",
      "newest",
    ])
    .optional(),
});

export type RawHousingRecordValidated = z.infer<typeof rawHousingRecordSchema>;
export type PropertyValidated = z.infer<typeof propertySchema>;
export type PropertyFiltersValidated = z.infer<typeof propertyFiltersSchema>;

/**
 * Validates an array of raw housing records against the raw housing dataset schema.
 */
export function validateRawHousingDataset(
  data: unknown
): RawHousingRecordValidated[] {
  return rawHousingDatasetSchema.parse(data);
}
