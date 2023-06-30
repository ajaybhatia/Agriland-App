import { create } from 'zustand';

import type { FarmerDetails } from '@/apis/model';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';
import { getUserInfo } from './utils';
import { removeUserInfo } from './utils';
import { setUserInfo } from './utils';

interface AuthState {
  userInfos: FarmerDetails | undefined;
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  emailId: string;
  mobileNumber: string;
  displayName: string;
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
  setUserInfo: (userInfo: FarmerDetails) => void;
  setUserInfos: (
    emailId: string,
    mobileNumber: string,
    displayName: string
  ) => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  userInfos: undefined,
  status: 'idle',
  token: null,
  emailId: '',
  mobileNumber: '',
  displayName: '',
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    removeUserInfo();
    set({
      status: 'signOut',
      token: null,
      emailId: '',
      mobileNumber: '',
      displayName: '',
    });
  },
  setUserInfo: (userInfos: FarmerDetails) => {
    setUserInfo({
      displayName: userInfos?.displayName ?? '',
      emailId: userInfos?.emailId ?? '',
      mobileNumber: userInfos?.mobileNumber ?? '',
    });
    set({
      displayName: userInfos?.displayName ?? '',
      emailId: userInfos?.emailId ?? '',
      mobileNumber: userInfos?.mobileNumber ?? '',
      userInfos: userInfos,
    });
  },
  setUserInfos: (
    emailId: string,
    mobileNumber: string,
    displayName: string
  ) => {
    setUserInfo({
      displayName: displayName,
      emailId: emailId,
      mobileNumber: mobileNumber,
    });
    set({
      displayName: displayName,
      emailId: emailId,
      mobileNumber: mobileNumber,
    });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const userInfo = getUserInfo();
      if (userInfo && userInfo?.displayName && userInfo?.displayName !== '') {
        get().setUserInfos(
          userInfo.emailId,
          userInfo.mobileNumber,
          userInfo.displayName
        );
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();
export const setUserNameAuth = (userInfos: FarmerDetails) =>
  _useAuth.getState().setUserInfo(userInfos);
export const setUpdateUser = (
  emailId: string,
  mobileNumber: string,
  displayName: string
) => _useAuth.getState().setUserInfos(emailId, mobileNumber, displayName);
