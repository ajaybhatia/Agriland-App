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
  setData: (
    weatherReport: ForecastModel,
    farmName: string,
    locationAddress: LocationAddress,
    selectedFarm: FarmResponse
  ) => void;
}

const _useWeather = create<WeatherState>((set, get) => ({
  weatherReport: undefined,
  farmName: '',
  locationAddress: undefined,
  selectedFarm: undefined,
  setData: (
    weatherReport: ForecastModel,
    farmName: string,
    locationAddress: LocationAddress,
    selectedFarm: FarmResponse
  ) => {
    set({ weatherReport, farmName, locationAddress, selectedFarm });
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
