import { describe, it, expect } from "vitest";
import {
  calculateMean,
  calculateMedian,
  calculateMin,
  calculateMax,
  calculateMetricSummary,
  calculatePriceDistributionBins,
  calculateAreaInsights,
} from "@/lib/utils/statistics";
import { RawHousingRecord } from "@/@types/property";

describe("Statistical Calculations", () => {
  describe("Basic Math Utilities", () => {
    const numbers = [10, 20, 30, 40, 50];

    it("calculates mean correctly", () => {
      expect(calculateMean(numbers)).toBe(30);
      expect(calculateMean([])).toBe(0);
      expect(calculateMean([100])).toBe(100);
    });

    it("calculates median for odd counts", () => {
      expect(calculateMedian([5, 1, 9])).toBe(5); // sorted: 1, 5, 9
      expect(calculateMedian([10, 20, 30])).toBe(20);
    });

    it("calculates median for even counts", () => {
      expect(calculateMedian([10, 20, 30, 40])).toBe(25); // (20 + 30) / 2
      expect(calculateMedian([100, 200])).toBe(150);
      expect(calculateMedian([])).toBe(0);
    });

    it("calculates min and max correctly", () => {
      expect(calculateMin([40, 10, 90, 25])).toBe(10);
      expect(calculateMax([40, 10, 90, 25])).toBe(90);
      expect(calculateMin([])).toBe(0);
      expect(calculateMax([])).toBe(0);
    });
  });

  describe("Metric Summary", () => {
    it("returns complete summary for valid dataset prices", () => {
      const prices = [100, 200, 300, 400, 500];
      const summary = calculateMetricSummary(prices);

      expect(summary.count).toBe(5);
      expect(summary.min).toBe(100);
      expect(summary.max).toBe(500);
      expect(summary.mean).toBe(300);
      expect(summary.median).toBe(300);
    });

    it("safely handles empty or invalid arrays", () => {
      const summary = calculateMetricSummary([]);
      expect(summary).toEqual({
        min: 0,
        max: 0,
        mean: 0,
        median: 0,
        count: 0,
      });
    });

    it("filters out non-positive or NaN values", () => {
      const mixed = [100, 0, -50, NaN, 200];
      const summary = calculateMetricSummary(mixed);
      expect(summary.count).toBe(2);
      expect(summary.min).toBe(100);
      expect(summary.max).toBe(200);
    });
  });

  describe("Price Distribution Bins", () => {
    it("generates bucketed distribution bins with percentages", () => {
      const prices = [
        10_000_000, 15_000_000, 25_000_000, 35_000_000, 50_000_000,
      ];
      const bins = calculatePriceDistributionBins(prices, 4);

      expect(bins.length).toBeGreaterThan(0);
      const totalPercentage = bins.reduce(
        (acc, bin) => acc + bin.percentage,
        0
      );
      expect(Math.round(totalPercentage)).toBeCloseTo(100, 0);

      const totalCount = bins.reduce((acc, bin) => acc + bin.count, 0);
      expect(totalCount).toBe(prices.length);
    });

    it("returns empty array for empty inputs", () => {
      expect(calculatePriceDistributionBins([])).toEqual([]);
    });

    it("handles single-value arrays", () => {
      const bins = calculatePriceDistributionBins([50_000_000]);
      expect(bins).toHaveLength(1);
      expect(bins[0].count).toBe(1);
      expect(bins[0].percentage).toBe(100);
    });
  });

  describe("Area Insights Aggregator", () => {
    const mockRecords: RawHousingRecord[] = [
      {
        id: "1",
        title: "3 Bedroom Flat",
        area: "Maitama",
        price: 50_000_000,
        price_ngn: 50_000_000,
        listing_type: "rent",
        property_type: "Flat/Apartment",
        bedrooms: 3,
        bathrooms: 3,
      },
      {
        id: "2",
        title: "4 Bedroom Penthouse",
        area: "Maitama",
        price: 70_000_000,
        price_ngn: 70_000_000,
        listing_type: "rent",
        property_type: "Flat/Apartment",
        bedrooms: 4,
        bathrooms: 4,
      },
      {
        id: "3",
        title: "5 Bedroom Mansion",
        area: "Maitama",
        price: 900_000_000,
        price_ngn: 900_000_000,
        listing_type: "sale",
        property_type: "Mansion",
        bedrooms: 5,
        bathrooms: 6,
      },
      {
        id: "4",
        title: "Other Area Property",
        area: "Asokoro",
        price: 100_000_000,
        price_ngn: 100_000_000,
        listing_type: "sale",
        property_type: "Duplex",
        bedrooms: 4,
        bathrooms: 4,
      },
    ];

    it("filters and computes area metrics correctly", () => {
      const insights = calculateAreaInsights(mockRecords, "Maitama");

      expect(insights.area).toBe("Maitama");
      expect(insights.totalListings).toBe(3);

      expect(insights.rentalSummary.count).toBe(2);
      expect(insights.rentalSummary.mean).toBe(60_000_000);
      expect(insights.rentalSummary.min).toBe(50_000_000);
      expect(insights.rentalSummary.max).toBe(70_000_000);

      expect(insights.saleSummary.count).toBe(1);
      expect(insights.saleSummary.mean).toBe(900_000_000);

      expect(insights.propertyTypeBreakdown["Flat/Apartment"]).toBe(2);
      expect(insights.propertyTypeBreakdown["Mansion"]).toBe(1);

      expect(insights.bedroomBreakdown[3]).toBe(1);
      expect(insights.bedroomBreakdown[4]).toBe(1);
      expect(insights.bedroomBreakdown[5]).toBe(1);

      expect(insights.averagePricePerBedroom?.rental?.[3]).toBe(50_000_000);
      expect(insights.averagePricePerBedroom?.rental?.[4]).toBe(70_000_000);
      expect(insights.averagePricePerBedroom?.sale?.[5]).toBe(900_000_000);
    });
  });
});
