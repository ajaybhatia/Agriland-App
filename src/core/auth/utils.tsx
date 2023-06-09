import { getItem, removeItem, setItem } from '@/core/utils';

const TOKEN = 'token';
const USER_INFO = 'userinfo';

export type TokenType = {
  access: string;
  refresh: string;
};
export type UserInfo = {
  emailId: string;
  mobileNumber: string;
  displayName: string;
};

export const getToken = () => getItem<TokenType>(TOKEN);
export const getUserInfo = () => getItem<UserInfo>(USER_INFO);
export const removeToken = () => removeItem(TOKEN);
export const removeUserInfo = () => removeItem(USER_INFO);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);
export const setUserInfo = (value: UserInfo) =>
  setItem<UserInfo>(USER_INFO, value);
