import { create } from 'zustand';

import type { FarmResponse } from '@/apis/model';
import type { LocationAddress } from '@/screens/maps-views/model/location-address-model';
import type { ForecastModel } from '@/screens/weather/models/weather-forecast-models';

import { createSelectors } from '../utils';

interface SatelliteFarmState {
  selectedFarm: FarmResponse | undefined;
  setData: (selectedFarm: FarmResponse) => void;
  clearData: () => void;
}

const _useSatelliteFarm = create<SatelliteFarmState>((set, get) => ({
  selectedFarm: undefined,
  setData: (selectedFarm: FarmResponse) => {
    set({ selectedFarm });
  },
  clearData: () => {
    set({
      selectedFarm: undefined,
    });
  },
}));

export const useSatelliteFarm = createSelectors(_useSatelliteFarm);

//export const hydrateAuth = () => _useAuth.getState().hydrate();
export const setSatelliteFarmData = (
  weatherReport: ForecastModel,
  farmName: string,
  locationAddress: LocationAddress,
  selectedFarm: FarmResponse
) => _useSatelliteFarm.getState().setData(selectedFarm);
export const clearWeatherData = () => _useSatelliteFarm.getState().clearData();
