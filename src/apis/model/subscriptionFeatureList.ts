/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { LanguageName } from './languageName';

export interface SubscriptionFeatureList {
  id?: string;
  featureId?: string;
  featureNames?: LanguageName;
  serviceTypeId?: string | null;
  featureValue?: string | null;
  createdOn?: string;
  updatedBy?: string | null;
  createdBy?: string | null;
  updatedOn?: string | null;
  isActive?: boolean;
  isDeleted?: boolean | null;
}
