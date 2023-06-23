import auth from '@react-native-firebase/auth';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  // baseURL: 'http://192.168.227.164:81', // Aswaaq VPN server
  baseURL: 'http://95.111.231.114:85', // Our Server
});

export const customInstance = async <T>(
  config: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const currentUser = auth().currentUser;
  const idToken = await currentUser?.getIdToken();
  console.log(currentUser?.uid, ' \n\n', idToken);
  if (currentUser) {
    config.headers = { Authorization: `Bearer ${idToken}` };
  }

  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data
  );

  //@ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled by user');
  };

  return promise;
};

export default customInstance;

export type ErrorType<Error> = AxiosError<Error>;
