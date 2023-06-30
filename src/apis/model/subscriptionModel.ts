/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { LanguageName } from './languageName';
import type { SubscriptionFeatureListModel } from './subscriptionFeatureListModel';

export interface SubscriptionModel {
  id?: string;
  planNames?: LanguageName;
  pricePerMonth?: string | null;
  pricePerYear?: string | null;
  createdOn?: string;
  updatedBy?: string | null;
  createdBy?: string | null;
  updatedOn?: string | null;
  isActive?: boolean;
  isDeleted?: boolean | null;
  subscriptionFeatureListModels?: SubscriptionFeatureListModel[] | null;
}
