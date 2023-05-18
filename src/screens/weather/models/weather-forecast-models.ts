export interface ForecastModel {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_weather: CurrentWeather;
  hourly_units: HourlyUnits;
  hourly: Hourly;
  daily_units: DailyUnits;
  daily: Daily;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface HourlyUnits {
  time: string;
  temperature_2m: string;
  rain: string;
  weathercode: string;
  windspeed_10m: string;
  uv_index: string;
  is_day: string;
  temperature_1000hPa: string;
  temperature_700hPa: string;
  relativehumidity_1000hPa: string;
  relativehumidity_700hPa: string;
  cloudcover_1000hPa: string;
  cloudcover_700hPa: string;
  windspeed_1000hPa: string;
  winddirection_1000hPa: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  rain: number[];
  weathercode: number[];
  windspeed_10m: number[];
  uv_index: number[];
  is_day: number[];
  temperature_1000hPa: number[];
  temperature_700hPa: number[];
  relativehumidity_1000hPa: number[];
  relativehumidity_700hPa: number[];
  cloudcover_1000hPa: number[];
  cloudcover_700hPa: number[];
  windspeed_1000hPa: number[];
  winddirection_1000hPa: number[];
}

export interface DailyUnits {
  time: string;
  weathercode: string;
  rain_sum: string;
  precipitation_probability_max: string;
  windspeed_10m_max: string;
}

export interface Daily {
  time: string[];
  weathercode: number[];
  rain_sum: number[];
  precipitation_probability_max: number[];
  windspeed_10m_max: number[];
}
