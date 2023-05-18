export interface WeatherHistory {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  hourly_units: HourlyUnits;
  hourly: Hourly;
}

export interface HourlyUnits {
  time: string;
  relativehumidity_2m: string;
  surface_pressure: string;
  rain: string;
  cloudcover: string;
  windspeed_10m: string;
}

export interface Hourly {
  time: string[];
  relativehumidity_2m: number | undefined[];
  surface_pressure: number | undefined[];
  rain: number | undefined[];
  cloudcover: number | undefined[];
  windspeed_10m: number | undefined[];
}
