/**
 * Dataset Provenance and License Constants
 * Attribution and licensing for Groundwork Data Abuja Housing dataset.
 */

export const DATASET_PROVENANCE = {
  name: "Groundwork Data Abuja Housing Dataset",
  shortName: "Abuja Housing Data",
  version: "1.0.0",
  publisher: "Groundwork Data",
  dateCollected: "April 2026",
  license: "Creative Commons Attribution 4.0 International (CC BY 4.0)",
  licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
  totalRecords: 481,
  city: "Abuja",
  country: "Nigeria",
  attribution:
    "Data provided by Groundwork Data under the Creative Commons Attribution 4.0 International (CC BY 4.0) license. Source data collected April 2026.",
  citation:
    "Groundwork Data. (2026). Abuja Housing Dataset (April 2026) [Data file]. Licensed under CC BY 4.0.",
} as const;

export type DatasetProvenance = typeof DATASET_PROVENANCE;
