import { create } from 'zustand';

import type { CalendarModel, FarmResponse } from '@/apis/model';

import { createSelectors } from '../utils';

interface RegisterFarmState {
  selectedCalendarActivity: CalendarModel | undefined;
  selectedFarm: FarmResponse | undefined;
  setData: (selectedFarm: FarmResponse) => void;
  setCalendarActivityData: (selectedCalendarActivity: CalendarModel) => void;
  clearData: () => void;
}

const _useRegisterFarm = create<RegisterFarmState>((set, get) => ({
  selectedFarm: undefined,
  selectedCalendarActivity: undefined,
  setData: (selectedFarm: FarmResponse) => {
    set({ selectedFarm });
  },
  setCalendarActivityData: (selectedCalendarActivity: CalendarModel) => {
    set({ selectedCalendarActivity });
  },
  clearData: () => {
    set({
      selectedFarm: undefined,
      selectedCalendarActivity: undefined,
    });
  },
}));

export const useRegisterFarm = createSelectors(_useRegisterFarm);

//export const hydrateAuth = () => _useAuth.getState().hydrate();
export const setRegisterFarmData = (selectedFarm: FarmResponse) =>
  _useRegisterFarm.getState().setData(selectedFarm);
export const setRegisterCalendarActivityData = (
  selectedCalendarActivity: CalendarModel
) =>
  _useRegisterFarm.getState().setCalendarActivityData(selectedCalendarActivity);
export const clearRegisterData = () => _useRegisterFarm.getState().clearData();
