/**
 * Generated by orval v6.14.3 🍺
 * Do not edit manually.
 * Farmer App API
 * OpenAPI spec version: v1
 */

export interface AddressRequest {
  id?: string | null;
  fullName: string;
  mobileNumber: string;
  streetAddress: string;
  country: string;
  governorate?: string | null;
  town: string;
  postalCode?: string | null;
  countryCode: string;
  callingCode: string;
  makeAsDefault?: boolean | null;
  userId?: string | null;
}
