/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */
import type { CalendarModel } from './calendarModel';

export interface CalendarPaginatedResponse {
  totalCount?: number;
  skip?: number | null;
  take?: number | null;
  calendarResponse?: CalendarModel[] | null;
}
