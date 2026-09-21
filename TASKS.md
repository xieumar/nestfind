# NestFind — Task Tracker

This document tracks all implementation steps for NestFind, categorized by Pull Requests (PRs) and individual commits.

---

## PR 1: Foundation & Data

> **Goal:** Establish domain types in `@types/`, ingest and validate the real Groundwork Data Abuja dataset with Zod, implement deterministic matching and statistical calculation utilities, and set up barrel exports.

- [ ] **Commit 1.1: Domain Type Declarations (`@types/`)**
  - [ ] Create `@types/location.d.ts` (LocationResult, OpenMeteoResult, AutocompleteState)
  - [ ] Create `@types/property.d.ts` (Property, ListingType, PropertyType, PropertyFilters, RawHousingRecord)
  - [ ] Create `@types/insights.d.ts` (AreaInsights, PriceDistribution, MetricSummary)
  - [ ] Create `@types/index.d.ts` (Barrel export for domain types)

- [ ] **Commit 1.2: Dataset Ingestion & Zod Validation**
  - [ ] Add `data/abuja-housing-data.json` containing 481 real records from Groundwork Data (April 2026, CC BY 4.0)
  - [ ] Create `lib/schemas/property.schema.ts` (Zod schema for dataset validation)
  - [ ] Create `data/provenance.ts` (Dataset metadata, attribution, and license constants)
  - [ ] Create `data/index.ts` barrel export

- [ ] **Commit 1.3: Normalization & Core Utilities**
  - [ ] Create `lib/utils/formatting.ts` (Naira currency formatting, bedroom/bathroom labels)
  - [ ] Create `lib/utils/matching.ts` (Deterministic location matching against dataset areas)
  - [ ] Create `lib/utils/statistics.ts` (Calculations for mean, median, min, max, and distributions)
  - [ ] Create `lib/utils/index.ts` and `lib/constants/index.ts` barrel exports

- [ ] **Commit 1.4: Unit Tests for Data Foundation**
  - [ ] Setup Vitest test environment
  - [ ] Add unit tests for dataset schema validation & normalization
  - [ ] Add unit tests for deterministic location matching
  - [ ] Add unit tests for statistical calculations (mean, median, min/max, distribution)

---

## PR 2: Location Search

> **Goal:** Build the accessible, debounced location autocomplete with robust stale-request protection (`AbortController` + sequence guard) and Open-Meteo Geocoding API integration.

- [ ] **Commit 2.1: API Service & TanStack Query Custom Hooks**
  - [ ] Install and configure `@tanstack/react-query`
  - [ ] Implement `services/location.service.ts` (Fetch Open-Meteo with `AbortController` and normalization to `LocationResult`)
  - [ ] Implement `services/index.ts` barrel export
  - [ ] Implement `hooks/use-debounce.ts` (~300ms debounce)
  - [ ] Implement `hooks/use-location-search.ts` (TanStack Query integration, sequence token guard for out-of-order responses)
  - [ ] Implement `hooks/index.ts` barrel export

- [ ] **Commit 2.2: Accessible Autocomplete Combobox UI**
  - [ ] Create `components/search/location-search.tsx` (WAI-ARIA combobox with explicit states: `idle`, `typing`, `searching`, `results`, `empty`, `error`, `selected`)
  - [ ] Create `components/search/location-results-list.tsx` (Dropdown listbox with loading, empty, and error/retry states)
  - [ ] Create `components/search/location-result-item.tsx` (Option item with keyboard highlight and touch sizing)
  - [ ] Create `components/search/index.ts` barrel export

- [ ] **Commit 2.3: Autocomplete & Stale Protection Unit/Integration Tests**
  - [ ] Add unit tests for `useDebounce` and `useLocationSearch` (debouncing, min length >= 2, whitespace skipping, stale-request protection, AbortController abortion)
  - [ ] Add interaction & accessibility tests for `LocationSearch` (keyboard navigation: Up/Down/Enter/Escape/Tab, ARIA attributes)

---

## PR 3: Property Experience

> **Goal:** Implement the in-memory property retrieval service, filtering engine, area insights calculator, and property UI components.

- [ ] **Commit 3.1: Property Service & Insights Hooks**
  - [ ] Implement `services/property.service.ts` (In-memory queries matching location and multi-criteria filters)
  - [ ] Implement `hooks/use-properties.ts` (Filtered property query hook)
  - [ ] Implement `hooks/use-area-insights.ts` (Area statistical metrics hook)

- [ ] **Commit 3.2: Property & Insights Presentation Components**
  - [ ] Create `components/properties/property-card.tsx` (Faithful dataset attribute display without fake photos)
  - [ ] Create `components/properties/property-grid.tsx` (Responsive property grid with empty states)
  - [ ] Create `components/properties/property-filters.tsx` (Listing type, property type, bedrooms, price range)
  - [ ] Create `components/properties/property-provenance.tsx` (Groundwork Data attribution notice)
  - [ ] Create `components/properties/index.ts` barrel export
  - [ ] Create `components/insights/area-insights.tsx` (Summary metrics, median/mean, rental vs sale distribution)
  - [ ] Create `components/insights/metric-card.tsx` (Data metric card)
  - [ ] Create `components/insights/index.ts` barrel export

- [ ] **Commit 3.3: Property & Insights Unit Tests**
  - [ ] Add unit tests for property filtering logic (type, rent/sale, bedrooms, price range combinations)
  - [ ] Add unit tests for dynamic area insights calculation on filtered subsets

---

## PR 4: Application UI

> **Goal:** Assemble the complete web application with Next.js App Router, connecting thin route wrappers to page components in `components/pages/` using the user-provided creative direction.

- [ ] **Commit 4.1: Shared Layout & Navigation**
  - [ ] Create `components/common/header/header.tsx`
  - [ ] Create `components/common/footer/footer.tsx` (CC BY 4.0 attribution)
  - [ ] Create `components/common/badge/badge.tsx`
  - [ ] Create `components/common/index.ts` and `components/index.ts` barrel exports
  - [ ] Update `app/layout.tsx` (Configure QueryClientProvider and metadata)

- [ ] **Commit 4.2: Home / Landing Page**
  - [ ] Create `components/pages/home/home-page.tsx` (Hero, focused autocomplete, editorial aesthetics)
  - [ ] Create `components/pages/home/index.ts` barrel export
  - [ ] Implement `app/page.tsx` thin route

- [ ] **Commit 4.3: Search Results Page**
  - [ ] Create `components/pages/search/search-page.tsx` (URL search params synchronization, location header, filters, insights, property grid)
  - [ ] Create `components/pages/search/index.ts` barrel export
  - [ ] Implement `app/search/page.tsx` thin route

- [ ] **Commit 4.4: Property Details View**
  - [ ] Create `components/pages/property-details/property-details-page.tsx` (Detailed attribute breakdown and data provenance section)
  - [ ] Create `components/pages/property-details/index.ts` barrel export
  - [ ] Implement `app/properties/[id]/page.tsx` thin route

---

## PR 5: Verification & Submission

> **Goal:** Finalize end-to-end testing, GitHub Actions CI workflow, and screening submission documentation.

- [ ] **Commit 5.1: End-to-End Tests with Playwright**
  - [ ] Configure Playwright
  - [ ] Implement E2E test for complete user journey (Landing -> Search -> Autocomplete Selection -> Results -> Filter -> Property Details)

- [ ] **Commit 5.2: GitHub Actions CI Workflow**
  - [ ] Create `.github/workflows/ci.yml` (Lint, typecheck, Vitest, and Next.js build verification on push/PR)

- [ ] **Commit 5.3: Production Documentation & Screening Submission Write-up**
  - [ ] Create comprehensive `README.md` (Overview, Architecture, Open-Meteo API, Groundwork Data attribution, Stale response protection, Tradeoffs, Production scaling)
  - [ ] Write 150–300 word technical screening write-up on engineering tradeoffs, scalability, and testing strategy.
