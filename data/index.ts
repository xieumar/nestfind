import abujaHousingRawData from "./abuja-housing-data.json";
import {
  RawHousingRecordValidated,
  validateRawHousingDataset,
} from "@/lib/schemas/property.schema";

export * from "./provenance";

export const abujaHousingData =
  abujaHousingRawData as RawHousingRecordValidated[];

/**
 * Returns validated housing records from the ingested Groundwork Data dataset.
 */
export function getValidatedHousingData(): RawHousingRecordValidated[] {
  return validateRawHousingDataset(abujaHousingRawData);
}

export default abujaHousingData;
