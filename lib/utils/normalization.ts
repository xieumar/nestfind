import { Property, PropertyType, RawHousingRecord } from "@/@types/property";
import { DATASET_PROVENANCE } from "@/data/provenance";

export function normalizePropertyType(
  rawType: string | undefined
): PropertyType {
  if (!rawType) return "other";

  const lower = rawType.toLowerCase().trim();

  if (lower.includes("flat") || lower.includes("apartment")) return "flat";
  if (lower.includes("terrace")) return "terrace";
  if (lower.includes("semi-detached") || lower.includes("semi detached"))
    return "semi-detached";
  if (lower.includes("detached")) return "detached";
  if (lower.includes("duplex")) return "duplex";
  if (lower.includes("mansion")) return "mansion";
  if (lower.includes("bungalow")) return "bungalow";
  if (
    lower.includes("commercial") ||
    lower.includes("office") ||
    lower.includes("shop")
  )
    return "commercial";
  if (lower.includes("land")) return "land";

  return "other";
}

export function normalizeHousingRecord(raw: RawHousingRecord): Property {
  const listingType =
    (raw.listing_type || raw.listingType)?.toLowerCase() === "rent"
      ? "rent"
      : "sale";

  const priceNum = Number(raw.price_ngn ?? raw.price ?? 0);
  const bedNum = Number(raw.bedrooms ?? 0);
  const bathNum = Number(raw.bathrooms ?? 0);
  const toiletNum = raw.toilets ? Number(raw.toilets) : undefined;

  const title = (raw.title || "").trim();
  const desc = (raw.description || "").trim();
  const combined = `${title} ${desc}`.toLowerCase();

  const isServiced = combined.includes("serviced") || undefined;
  const isNewlyBuilt =
    combined.includes("newly built") ||
    combined.includes("brand new") ||
    undefined;
  const isFurnished = combined.includes("furnished") || undefined;

  const id = String(
    raw.pid || raw.id || Math.random().toString(36).substring(2, 9)
  );

  return {
    id,
    title: raw.title || `${bedNum} Bedroom ${raw.property_type || "Property"}`,
    area: (raw.area || "Abuja").trim(),
    state: "Abuja",
    price: isNaN(priceNum) ? 0 : priceNum,
    currency: "NGN",
    listingType,
    propertyType: normalizePropertyType(raw.property_type || raw.propertyType),
    bedrooms: isNaN(bedNum) ? 0 : bedNum,
    bathrooms: isNaN(bathNum) ? 0 : bathNum,
    toilets: toiletNum && !isNaN(toiletNum) ? toiletNum : undefined,
    isServiced,
    isNewlyBuilt,
    isFurnished,
    description:
      typeof raw.description === "string" ? raw.description : undefined,
    sourceUrl:
      typeof raw.source_url === "string"
        ? raw.source_url
        : typeof raw.url === "string"
          ? raw.url
          : undefined,
    provenance: {
      source: DATASET_PROVENANCE.publisher,
      license: DATASET_PROVENANCE.license,
      collectionDate: DATASET_PROVENANCE.dateCollected,
    },
  };
}

export function normalizeHousingDataset(
  records: RawHousingRecord[]
): Property[] {
  return records.map(normalizeHousingRecord);
}
