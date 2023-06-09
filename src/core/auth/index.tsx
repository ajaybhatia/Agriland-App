import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { TokenType } from './utils';
import { getToken, removeToken, setToken } from './utils';
import { getUserInfo } from './utils';
import { removeUserInfo } from './utils';
import { setUserInfo } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  emailId: string;
  mobileNumber: string;
  displayName: string;
  signIn: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
  setUserInfo: (
    emailId: string,
    mobileNumber: string,
    displayName: string
  ) => void;
}

const _useAuth = create<AuthState>((set, get) => ({
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
  setUserInfo: (emailId: string, mobileNumber: string, displayName: string) => {
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
        get().setUserInfo(
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
export const setUserNameAuth = (
  emailId: string,
  mobileNumber: string,
  displayName: string
) => _useAuth.getState().setUserInfo(emailId, mobileNumber, displayName);
