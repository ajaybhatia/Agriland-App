/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { SubscriptionModel } from './subscriptionModel';

export interface SubscriptionPaginatedResponse {
  totalCount?: number;
  skip?: number | null;
  take?: number | null;
  subscriptionResponse?: SubscriptionModel[] | null;
}
