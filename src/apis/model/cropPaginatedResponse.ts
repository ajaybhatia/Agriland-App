/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { CropResponse } from './cropResponse';

export interface CropPaginatedResponse {
  totalCount?: number;
  skip?: number | null;
  take?: number | null;
  cropResponses?: CropResponse[] | null;
}
