/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { FarmResponse } from './farmResponse';

export interface FarmsPaginatedResponse {
  totalCount?: number;
  skip?: number;
  take?: number;
  farms?: FarmResponse[] | null;
}
