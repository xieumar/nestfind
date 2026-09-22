export interface MetricSummary {
  min: number;
  max: number;
  mean: number;
  median: number;
  count: number;
}

export interface PriceDistributionBin {
  label: string;
  min: number;
  max: number;
  count: number;
  percentage: number;
}

export interface PriceDistribution {
  rental: PriceDistributionBin[];
  sale: PriceDistributionBin[];
}

export interface AreaInsights {
  area: string;
  totalListings: number;
  rentalSummary: MetricSummary;
  saleSummary: MetricSummary;
  priceDistribution: PriceDistribution;
  propertyTypeBreakdown: Record<string, number>;
  bedroomBreakdown: Record<string | number, number>;
  averagePricePerBedroom?: {
    rental?: Record<number, number>;
    sale?: Record<number, number>;
  };
}
