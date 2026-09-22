/**
 * Formats a numerical amount into Nigerian Naira (NGN).
 *
 * @param amount - Numerical amount in Naira
 * @param options - Formatting options: `compact` (e.g. ₦1.5M), `showSymbol` (default true)
 * @returns Formatted Naira string
 *
 * @example
 * formatNaira(750000000) => "₦750,000,000"
 * formatNaira(750000000, { compact: true }) => "₦750M"
 * formatNaira(2500000, { compact: true }) => "₦2.5M"
 */
export function formatNaira(
  amount: number | null | undefined,
  options?: { compact?: boolean; showSymbol?: boolean }
): string {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "₦0";
  }

  const showSymbol = options?.showSymbol ?? true;
  const symbol = showSymbol ? "₦" : "";

  if (options?.compact) {
    if (Math.abs(amount) >= 1_000_000_000) {
      const billions = (amount / 1_000_000_000).toFixed(1).replace(/\.0$/, "");
      return `${symbol}${billions}B`;
    }
    if (Math.abs(amount) >= 1_000_000) {
      const millions = (amount / 1_000_000).toFixed(1).replace(/\.0$/, "");
      return `${symbol}${millions}M`;
    }
    if (Math.abs(amount) >= 1_000) {
      const thousands = (amount / 1_000).toFixed(1).replace(/\.0$/, "");
      return `${symbol}${thousands}K`;
    }
    return `${symbol}${amount.toLocaleString("en-NG")}`;
  }

  return `${symbol}${amount.toLocaleString("en-NG")}`;
}

/**
 * Formats bedroom count with appropriate singular/plural wording.
 *
 * @param count - Number of bedrooms
 * @param options - Short label option (e.g. "3 Beds" vs "3 Bedrooms")
 */
export function formatBedrooms(
  count: number | null | undefined,
  options?: { short?: boolean }
): string {
  if (count === null || count === undefined) {
    return "Bedrooms not specified";
  }

  const isShort = options?.short ?? false;

  if (count === 0) {
    return isShort ? "Studio" : "Studio / Self-contained";
  }

  if (count === 1) {
    return isShort ? "1 Bed" : "1 Bedroom";
  }

  return isShort ? `${count} Beds` : `${count} Bedrooms`;
}

/**
 * Formats bathroom count with appropriate singular/plural wording.
 */
export function formatBathrooms(
  count: number | null | undefined,
  options?: { short?: boolean }
): string {
  if (count === null || count === undefined) {
    return "Bathrooms not specified";
  }

  const isShort = options?.short ?? false;

  if (count === 1) {
    return isShort ? "1 Bath" : "1 Bathroom";
  }

  return isShort ? `${count} Baths` : `${count} Bathrooms`;
}

/**
 * Formats toilet count.
 */
export function formatToilets(count: number | null | undefined): string {
  if (count === null || count === undefined) {
    return "";
  }

  if (count === 1) {
    return "1 Toilet";
  }

  return `${count} Toilets`;
}

/**
 * Formats an area name for display (e.g. replaces hyphens with spaces).
 */
export function formatAreaName(area: string): string {
  if (!area) return "";
  return area.replace(/-/g, " ");
}

/**
 * Formats listing type for display.
 */
export function formatListingType(listingType: string): string {
  if (!listingType) return "";
  const normalized = listingType.toLowerCase();
  if (normalized === "rent") return "For Rent";
  if (normalized === "sale") return "For Sale";
  return listingType;
}

/**
 * Formats property type for display.
 */
export function formatPropertyType(propertyType: string): string {
  if (!propertyType) return "";
  const normalized = propertyType.toLowerCase().replace(/_/g, " ");

  const map: Record<string, string> = {
    flat: "Flat / Apartment",
    apartment: "Flat / Apartment",
    "flat/apartment": "Flat / Apartment",
    duplex: "Duplex",
    "detached duplex": "Detached Duplex",
    "semi-detached duplex": "Semi-Detached Duplex",
    "terraced duplex": "Terraced Duplex",
    terrace: "Terraced Duplex",
    detached: "Fully Detached",
    "semi-detached": "Semi-Detached",
    bungalow: "Bungalow",
    mansion: "Mansion",
    commercial: "Commercial Property",
    land: "Land",
    house: "Residential House",
  };

  return (
    map[normalized] || normalized.charAt(0).toUpperCase() + normalized.slice(1)
  );
}
