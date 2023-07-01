import { create } from 'zustand';

import type { CultivationDetailResponse } from '@/apis/model';

import { createSelectors } from '../utils';

interface SelectedCropsState {
  farmid: string;
  farmname: string;
  crops: CultivationDetailResponse;
}
export interface SelectedCropsListState {
  farmid: string;
  farmname: string;
  crops: CultivationDetailResponse[];
}
interface SatelliteFarmState {
  satelliteSelectedCrops: SelectedCropsListState[];
  setSelectedCrop: (crop: SelectedCropsState) => void;
  setDeleteCrop: (crop: SelectedCropsState) => void;
  clearData: () => void;
}

const _useSatelliteFarm = create<SatelliteFarmState>((set, get) => ({
  satelliteSelectedCrops: [],
  setDeleteCrop: (crop: SelectedCropsState) => {
    // all farms
    var farms = get().satelliteSelectedCrops;
    let farmIndex = farms.findIndex((x) => x?.farmid === crop?.farmid);
    // check is Farm already in state if farmIndex is 0 or more than zero that is farm exist
    if (farmIndex >= 0) {
      // check if crop is already in farm list
      if (
        farms[farmIndex].crops.filter(
          (x) =>
            x?.cropDetails?.id &&
            crop?.crops.cropDetails?.id &&
            x?.cropDetails?.id === crop?.crops.cropDetails?.id
        ).length > 0
      ) {
        // remove from crop list
        farms[farmIndex].crops = farms[farmIndex].crops.filter(
          (x) =>
            x?.cropDetails?.id &&
            crop?.crops.cropDetails?.id &&
            x?.cropDetails?.id !== crop?.crops.cropDetails?.id
        );
        if (farms[farmIndex].crops.length <= 0) {
          // remove empty crops farm
          set({
            satelliteSelectedCrops: farms.filter(
              (x) => x?.farmid !== crop?.farmid
            ),
          });
        } else {
          // update farm
          set({
            satelliteSelectedCrops: farms,
          });
        }
      }
    }
  },
  setSelectedCrop: (crop: SelectedCropsState) => {
    // all farms
    var farms = get().satelliteSelectedCrops;
    let farmIndex = farms.findIndex((x) => x?.farmid === crop?.farmid);
    // check is Farm already in state if farmIndex is 0 or more than zero that is farm exist
    if (farmIndex >= 0) {
      // check if crop is already in farm list
      if (
        farms[farmIndex].crops.filter(
          (x) =>
            x?.cropDetails?.id &&
            crop?.crops.cropDetails?.id &&
            x?.cropDetails?.id === crop?.crops.cropDetails?.id
        ).length > 0
      ) {
        // remove from crop list
        farms[farmIndex].crops = farms[farmIndex].crops.filter(
          (x) =>
            x?.cropDetails?.id &&
            crop?.crops.cropDetails?.id &&
            x?.cropDetails?.id !== crop?.crops.cropDetails?.id
        );
        if (farms[farmIndex].crops.length <= 0) {
          // remoove empty crops farm
          set({
            satelliteSelectedCrops: farms.filter(
              (x) => x?.farmid !== crop?.farmid
            ),
          });
        } else {
          // update farm
          set({
            satelliteSelectedCrops: farms,
          });
        }
      } else {
        // crops is not already added but farm id already in list
        // just add crop within farm id
        let cropsFromFarm = farms[farmIndex].crops;
        farms[farmIndex].crops = [...cropsFromFarm, crop.crops];

        set({
          satelliteSelectedCrops: farms,
        });
      }
    } else {
      // add  farm id and their crop
      set({
        satelliteSelectedCrops: [
          ...farms,
          {
            farmid: crop.farmid,
            farmname: crop.farmname,
            crops: [crop.crops],
          },
        ],
      });
    }
  },
  clearData: () => {
    set({
      satelliteSelectedCrops: [],
    });
  },
}));

export const useSatelliteFarm = createSelectors(_useSatelliteFarm);

//export const hydrateAuth = () => _useAuth.getState().hydrate();

export const setSatelliteCropData = (crop: SelectedCropsState) =>
  _useSatelliteFarm.getState().setSelectedCrop(crop);
export const setSatelliteCropDelete = (crop: SelectedCropsState) =>
  _useSatelliteFarm.getState().setDeleteCrop(crop);
export const clearFarmData = () => _useSatelliteFarm.getState().clearData();
