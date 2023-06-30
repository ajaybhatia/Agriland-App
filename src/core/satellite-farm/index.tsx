import { create } from 'zustand';

import type { CultivationDetailResponse, FarmResponse } from '@/apis/model';

import { createSelectors } from '../utils';

interface SatelliteFarmState {
  selectedFarm: FarmResponse | undefined;
  satelliteSelectedCrops: CultivationDetailResponse[];
  setData: (selectedFarm: FarmResponse) => void;
  setSelectedCrop: (crop: CultivationDetailResponse) => void;
  setDeleteCrop: (crop: CultivationDetailResponse) => void;
  clearData: () => void;
}

const _useSatelliteFarm = create<SatelliteFarmState>((set, get) => ({
  selectedFarm: undefined,
  satelliteSelectedCrops: [],
  setData: (selectedFarm: FarmResponse) => {
    set({ selectedFarm });
  },
  setDeleteCrop: (crop: CultivationDetailResponse) => {
    set({
      satelliteSelectedCrops: get().satelliteSelectedCrops.filter(
        (x) => x?.cropDetails?.id !== crop?.cropDetails?.id
      ),
    });
  },
  setSelectedCrop: (crop: CultivationDetailResponse) => {
    if (
      get().satelliteSelectedCrops.filter(
        (x) => x?.cropDetails?.id === crop?.cropDetails?.id
      ).length <= 0
    ) {
      set({ satelliteSelectedCrops: [...get().satelliteSelectedCrops, crop] });
    } else {
      set({
        satelliteSelectedCrops: get().satelliteSelectedCrops.filter(
          (x) => x?.cropDetails?.id !== crop?.cropDetails?.id
        ),
      });
    }
  },
  clearData: () => {
    set({
      selectedFarm: undefined,
      satelliteSelectedCrops: [],
    });
  },
}));

export const useSatelliteFarm = createSelectors(_useSatelliteFarm);

//export const hydrateAuth = () => _useAuth.getState().hydrate();
export const setSatelliteFarmData = (selectedFarm: FarmResponse) =>
  _useSatelliteFarm.getState().setData(selectedFarm);
export const setSatelliteCropData = (crop: CultivationDetailResponse) =>
  _useSatelliteFarm.getState().setSelectedCrop(crop);
export const setSatelliteCropDelete = (crop: CultivationDetailResponse) =>
  _useSatelliteFarm.getState().setDeleteCrop(crop);
export const clearFarmData = () => _useSatelliteFarm.getState().clearData();
