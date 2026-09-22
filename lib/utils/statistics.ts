import {
  AreaInsights,
  MetricSummary,
  PriceDistribution,
  PriceDistributionBin,
} from "@/@types/insights";
import { RawHousingRecord } from "@/@types/property";

export function calculateMean(values: number[]): number {
  if (!values || values.length === 0) return 0;
  const sum = values.reduce((acc, curr) => acc + curr, 0);
  return Math.round(sum / values.length);
}

export function calculateMedian(values: number[]): number {
  if (!values || values.length === 0) return 0;

  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 !== 0) {
    return sorted[mid];
  }

  return Math.round((sorted[mid - 1] + sorted[mid]) / 2);
}

export function calculateMin(values: number[]): number {
  if (!values || values.length === 0) return 0;
  return Math.min(...values);
}

export function calculateMax(values: number[]): number {
  if (!values || values.length === 0) return 0;
  return Math.max(...values);
}

export function calculateMetricSummary(values: number[]): MetricSummary {
  const valid = values.filter(
    (v) => typeof v === "number" && !isNaN(v) && v > 0
  );

  if (valid.length === 0) {
    return {
      min: 0,
      max: 0,
      mean: 0,
      median: 0,
      count: 0,
    };
  }

  return {
    min: calculateMin(valid),
    max: calculateMax(valid),
    mean: calculateMean(valid),
    median: calculateMedian(valid),
    count: valid.length,
  };
}

export function calculatePriceDistributionBins(
  prices: number[],
  numBins: number = 5
): PriceDistributionBin[] {
  const valid = prices.filter(
    (p) => typeof p === "number" && !isNaN(p) && p > 0
  );
  if (valid.length === 0) return [];

  const min = calculateMin(valid);
  const max = calculateMax(valid);

  if (min === max) {
    return [
      {
        label: `₦${min.toLocaleString()}`,
        min,
        max,
        count: valid.length,
        percentage: 100,
      },
    ];
  }

  const range = max - min;
  const step = Math.ceil(range / numBins);
  const bins: PriceDistributionBin[] = [];

  for (let i = 0; i < numBins; i++) {
    const binMin = min + i * step;
    const binMax = i === numBins - 1 ? max : binMin + step;

    const count = valid.filter((p) =>
      i === numBins - 1 ? p >= binMin && p <= binMax : p >= binMin && p < binMax
    ).length;

    const percentage = Number(((count / valid.length) * 100).toFixed(1));

    const label =
      binMax >= 1_000_000_000
        ? `₦${(binMin / 1_000_000_000).toFixed(1)}B - ₦${(binMax / 1_000_000_000).toFixed(1)}B`
        : binMax >= 1_000_000
          ? `₦${(binMin / 1_000_000).toFixed(0)}M - ₦${(binMax / 1_000_000).toFixed(0)}M`
          : `₦${(binMin / 1_000).toFixed(0)}K - ₦${(binMax / 1_000).toFixed(0)}K`;

    bins.push({
      label,
      min: binMin,
      max: binMax,
      count,
      percentage,
    });
  }

  return bins;
}

export function calculateAreaInsights(
  records: RawHousingRecord[],
  areaName: string
): AreaInsights {
  const areaRecords = records.filter(
    (r) => r.area && r.area.toLowerCase() === areaName.toLowerCase()
  );

  const rentalRecords = areaRecords.filter(
    (r) => (r.listing_type || r.listingType)?.toLowerCase() === "rent"
  );
  const saleRecords = areaRecords.filter(
    (r) => (r.listing_type || r.listingType)?.toLowerCase() === "sale"
  );

  const rentalPrices = rentalRecords
    .map((r) => Number(r.price_ngn ?? r.price))
    .filter((p) => !isNaN(p) && p > 0);

  const salePrices = saleRecords
    .map((r) => Number(r.price_ngn ?? r.price))
    .filter((p) => !isNaN(p) && p > 0);

  const rentalSummary = calculateMetricSummary(rentalPrices);
  const saleSummary = calculateMetricSummary(salePrices);

  const priceDistribution: PriceDistribution = {
    rental: calculatePriceDistributionBins(rentalPrices, 4),
    sale: calculatePriceDistributionBins(salePrices, 4),
  };

  const propertyTypeBreakdown: Record<string, number> = {};
  const bedroomBreakdown: Record<string | number, number> = {};

  const rentalBedroomPrices: Record<number, number[]> = {};
  const saleBedroomPrices: Record<number, number[]> = {};

  for (const record of areaRecords) {
    // Property type counts
    const rawType = (record.property_type ||
      record.propertyType ||
      "Other") as string;
    propertyTypeBreakdown[rawType] = (propertyTypeBreakdown[rawType] || 0) + 1;

    // Bedroom counts
    const rawBedrooms = record.bedrooms;
    if (rawBedrooms !== null && rawBedrooms !== undefined) {
      const beds = Number(rawBedrooms);
      bedroomBreakdown[beds] = (bedroomBreakdown[beds] || 0) + 1;

      const price = Number(record.price_ngn ?? record.price);
      if (!isNaN(price) && price > 0) {
        const isRent =
          (record.listing_type || record.listingType)?.toLowerCase() === "rent";
        if (isRent) {
          if (!rentalBedroomPrices[beds]) rentalBedroomPrices[beds] = [];
          rentalBedroomPrices[beds].push(price);
        } else {
          if (!saleBedroomPrices[beds]) saleBedroomPrices[beds] = [];
          saleBedroomPrices[beds].push(price);
        }
      }
    }
  }

  const averagePricePerBedroom: {
    rental: Record<number, number>;
    sale: Record<number, number>;
  } = {
    rental: {},
    sale: {},
  };

  for (const [beds, prices] of Object.entries(rentalBedroomPrices)) {
    averagePricePerBedroom.rental[Number(beds)] = calculateMean(prices);
  }

  for (const [beds, prices] of Object.entries(saleBedroomPrices)) {
    averagePricePerBedroom.sale[Number(beds)] = calculateMean(prices);
  }

  return {
    area: areaName,
    totalListings: areaRecords.length,
    rentalSummary,
    saleSummary,
    priceDistribution,
    propertyTypeBreakdown,
    bedroomBreakdown,
    averagePricePerBedroom,
  };
}
