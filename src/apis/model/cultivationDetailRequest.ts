/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { CoOrdinates } from './coOrdinates';

export interface CultivationDetailRequest {
  id?: string | null;
  cropId?: string | null;
  farmId?: string | null;
  area?: number | null;
  coordinates?: CoOrdinates[] | null;
  harvestDate?: string | null;
  sowingDate?: string | null;
  quantity?: number | null;
  typeOfIrrigation?: number | null;
}
