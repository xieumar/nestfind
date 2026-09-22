import { describe, it, expect } from "vitest";
import {
  matchLocationToDatasetArea,
  stripNoiseWords,
  isAreaInDataset,
  getDistinctDatasetAreas,
} from "@/lib/utils/matching";

describe("Deterministic Location Matching", () => {
  describe("Exact and Case-Insensitive Matching", () => {
    it("matches exact area names", () => {
      expect(matchLocationToDatasetArea("Maitama")).toBe("Maitama");
      expect(matchLocationToDatasetArea("Asokoro")).toBe("Asokoro");
      expect(matchLocationToDatasetArea("Utako")).toBe("Utako");
      expect(matchLocationToDatasetArea("Guzape")).toBe("Guzape");
    });

    it("matches regardless of case", () => {
      expect(matchLocationToDatasetArea("maitama")).toBe("Maitama");
      expect(matchLocationToDatasetArea("ASOKORO")).toBe("Asokoro");
      expect(matchLocationToDatasetArea("uTaKo")).toBe("Utako");
      expect(matchLocationToDatasetArea("wuse-2")).toBe("Wuse-2");
    });
  });

  describe("Alias and Synonym Matching", () => {
    it("resolves Roman numeral and space variations of Wuse-2", () => {
      expect(matchLocationToDatasetArea("wuse 2")).toBe("Wuse-2");
      expect(matchLocationToDatasetArea("Wuse II")).toBe("Wuse-2");
      expect(matchLocationToDatasetArea("wuse zone 2")).toBe("Wuse-2");
      expect(matchLocationToDatasetArea("wuse2")).toBe("Wuse-2");
    });

    it("resolves variations of Life-Camp", () => {
      expect(matchLocationToDatasetArea("life camp")).toBe("Life-Camp");
      expect(matchLocationToDatasetArea("LifeCamp")).toBe("Life-Camp");
      expect(matchLocationToDatasetArea("life-camp")).toBe("Life-Camp");
    });

    it("resolves common estate and district qualifiers", () => {
      expect(matchLocationToDatasetArea("gwarinpa estate")).toBe("Gwarinpa");
      expect(matchLocationToDatasetArea("gwarimpa")).toBe("Gwarinpa");
      expect(matchLocationToDatasetArea("asokoro district")).toBe("Asokoro");
      expect(matchLocationToDatasetArea("maitama district")).toBe("Maitama");
      expect(matchLocationToDatasetArea("utako district")).toBe("Utako");
    });
  });

  describe("Noise Word Stripping", () => {
    it("strips city, country, and administrative noise words", () => {
      expect(matchLocationToDatasetArea("Maitama, Abuja")).toBe("Maitama");
      expect(matchLocationToDatasetArea("Maitama, Abuja, Nigeria")).toBe(
        "Maitama"
      );
      expect(
        matchLocationToDatasetArea("Asokoro, Federal Capital Territory")
      ).toBe("Asokoro");
      expect(matchLocationToDatasetArea("Utako District, Abuja FCT")).toBe(
        "Utako"
      );
      expect(matchLocationToDatasetArea("Guzape Axis, Abuja")).toBe("Guzape");
    });

    it("strips noise words correctly with helper function", () => {
      expect(stripNoiseWords("Maitama District Abuja Nigeria")).toBe("Maitama");
      expect(stripNoiseWords("Gwarinpa Estate Phase 1")).toBe("Gwarinpa 1");
    });
  });

  describe("Substring and Token Containment", () => {
    it("identifies area embedded within descriptive strings", () => {
      expect(matchLocationToDatasetArea("Apo Resettlement Zone")).toBe("Apo");
      expect(matchLocationToDatasetArea("Katampe Extension")).toBe("Katampe");
      expect(matchLocationToDatasetArea("Close to Berger Yard Life Camp")).toBe(
        "Life-Camp"
      );
    });
  });

  describe("Unmatched and Edge Cases", () => {
    it("returns null for non-Abuja or unrecognized locations", () => {
      expect(matchLocationToDatasetArea("Lagos")).toBeNull();
      expect(matchLocationToDatasetArea("London, United Kingdom")).toBeNull();
      expect(matchLocationToDatasetArea("Unknown Nonexistent Area")).toBeNull();
      expect(matchLocationToDatasetArea("")).toBeNull();
    });

    it("correctly identifies presence with isAreaInDataset", () => {
      expect(isAreaInDataset("Maitama")).toBe(true);
      expect(isAreaInDataset("Wuse 2")).toBe(true);
      expect(isAreaInDataset("Ikeja")).toBe(false);
    });
  });

  describe("Dataset Area Extraction", () => {
    it("extracts and sorts unique areas from record array", () => {
      const records = [
        { area: "Maitama" },
        { area: "Asokoro" },
        { area: "Maitama" },
        { area: "Utako" },
        { area: "" },
      ];
      const distinct = getDistinctDatasetAreas(records);
      expect(distinct).toEqual(["Asokoro", "Maitama", "Utako"]);
    });
  });
});
