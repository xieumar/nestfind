import { describe, it, expect } from "vitest";
import abujaHousingData from "@/data/abuja-housing-data.json";
import {
  rawHousingRecordSchema,
  propertySchema,
  validateRawHousingDataset,
} from "@/lib/schemas/property.schema";
import {
  normalizeHousingRecord,
  normalizeHousingDataset,
  normalizePropertyType,
} from "@/lib/utils/normalization";
import { DATASET_PROVENANCE } from "@/data/provenance";

describe("Dataset Schema Validation", () => {
  it("successfully validates all 481 ingested Abuja housing records", () => {
    expect(abujaHousingData).toHaveLength(481);
    const validated = validateRawHousingDataset(abujaHousingData);
    expect(validated).toHaveLength(481);
  });

  it("validates individual raw record fields correctly", () => {
    const sampleRecord = abujaHousingData[0];
    const result = rawHousingRecordSchema.safeParse(sampleRecord);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.price_ngn).toBeGreaterThan(0);
      expect(result.data.area).toBeTruthy();
      expect(result.data.pid).toBeTruthy();
    }
  });

  it("fails validation when required fields are missing or invalid", () => {
    const invalidRecord = {
      title: "Broken Property",
      price_ngn: -100, // Invalid: negative
      listing_type: "sale",
      area: "Maitama",
      property_type: "Duplex",
      // missing pid and source_url
    };

    const result = rawHousingRecordSchema.safeParse(invalidRecord);
    expect(result.success).toBe(false);
  });
});

describe("Record Normalization", () => {
  it("maps raw housing records to strongly-typed Property models", () => {
    const sample = abujaHousingData[0];
    const property = normalizeHousingRecord(sample);

    expect(property.id).toBe(sample.pid);
    expect(property.title).toBe(sample.title);
    expect(property.area).toBe(sample.area);
    expect(property.state).toBe("Abuja");
    expect(property.currency).toBe("NGN");
    expect(property.price).toBe(sample.price_ngn);
    expect(property.listingType).toBe(sample.listing_type);
    expect(property.bedrooms).toBe(sample.bedrooms);
    expect(property.bathrooms).toBe(sample.bathrooms);
    expect(property.provenance?.source).toBe(DATASET_PROVENANCE.publisher);
    expect(property.provenance?.license).toBe(DATASET_PROVENANCE.license);

    // Verify propertySchema parses normalized record
    const schemaValidation = propertySchema.safeParse(property);
    expect(schemaValidation.success).toBe(true);
  });

  it("correctly normalizes property types into domain categories", () => {
    expect(normalizePropertyType("Flat/Apartment")).toBe("flat");
    expect(normalizePropertyType("Terraced Duplex")).toBe("terrace");
    expect(normalizePropertyType("Semi-Detached Duplex")).toBe("semi-detached");
    expect(normalizePropertyType("Detached Duplex")).toBe("detached");
    expect(normalizePropertyType("Mansion")).toBe("mansion");
    expect(normalizePropertyType("Bungalow")).toBe("bungalow");
    expect(normalizePropertyType("Office Space")).toBe("commercial");
    expect(normalizePropertyType("Bare Land")).toBe("land");
    expect(normalizePropertyType(undefined)).toBe("other");
  });

  it("normalizes an entire dataset batch", () => {
    const properties = normalizeHousingDataset(abujaHousingData.slice(0, 10));
    expect(properties).toHaveLength(10);
    properties.forEach((prop) => {
      expect(prop.id).toBeTruthy();
      expect(prop.price).toBeGreaterThanOrEqual(0);
      expect(prop.state).toBe("Abuja");
    });
  });
});
