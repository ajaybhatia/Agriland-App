import type { Location } from 'react-native-location';
import { create } from 'zustand';

import type { FarmResponse } from '@/apis/model';
import type { LocationAddress } from '@/screens/maps-views/model/location-address-model';
import type { ForecastModel } from '@/screens/weather/models/weather-forecast-models';

import { createSelectors } from '../utils';

interface WeatherState {
  weatherReport: ForecastModel | undefined;
  farmName: string;
  locationAddress: LocationAddress | undefined;
  selectedFarm: FarmResponse | undefined;
  location: Location | undefined;
  setData: (
    weatherReport: ForecastModel,
    farmName: string,
    locationAddress: LocationAddress,
    selectedFarm: FarmResponse
  ) => void;
  clearData: () => void;
  setLocation: (location: Location) => void;
}

const _useWeather = create<WeatherState>((set, get) => ({
  weatherReport: undefined,
  farmName: '',
  locationAddress: undefined,
  selectedFarm: undefined,
  location: undefined,
  setData: (
    weatherReport: ForecastModel,
    farmName: string,
    locationAddress: LocationAddress,
    selectedFarm: FarmResponse
  ) => {
    set({ weatherReport, farmName, locationAddress, selectedFarm });
  },
  clearData: () => {
    set({
      weatherReport: undefined,
      farmName: '',
      locationAddress: undefined,
      selectedFarm: undefined,
      location: undefined,
    });
  },
  setLocation: (location: Location) => {
    set({
      location: location,
    });
  },
}));

export const useWeather = createSelectors(_useWeather);

//export const hydrateAuth = () => _useAuth.getState().hydrate();
export const setWeatherData = (
  weatherReport: ForecastModel,
  farmName: string,
  locationAddress: LocationAddress,
  selectedFarm: FarmResponse
) =>
  _useWeather
    .getState()
    .setData(weatherReport, farmName, locationAddress, selectedFarm);
export const clearWeatherData = () => _useWeather.getState().clearData();
export const setLocationWeatherData = (location: Location) =>
  _useWeather.getState().setLocation(location);
