/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { FarmonautFarm } from './farmonautFarm';

export interface FarmonautCropModelPaginated {
  totalCount?: number;
  skip?: number;
  take?: number;
  farmonautFarms?: FarmonautFarm[] | null;
}