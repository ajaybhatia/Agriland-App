export interface LocationAddress {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: Address;
  boundingbox: string[];
}

export interface Address {
  county: string;
  state_district: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
}
